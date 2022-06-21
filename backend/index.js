const express = require('express');
const query = require('./config');
const session = require('express-session');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();
const server = require('http').createServer(app);
const { Server } = require('socket.io');

app.use(cors());
const io = new Server(server,{
    cors: {
        origin: "*",
        method: ["GET", "POST"]
    }
});

const port = 4000;

app.use(express.json());
app.use(
    session({
        secret: 'appchat',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
    }),
);

io.on('connection', (socket) => {
    socket.on('joinRoomChat', (roomChat) => {
        console.log('joined Room', roomChat);
        socket.join(roomChat.roomId);
        // Handle when user click messenger to show message content
        // Update saw
        if(!roomChat.saw){
            let commandQuery = `
                SELECT Saw 
                FROM messageinfo
                WHERE MessageInfoId = '${roomChat.messageInfoId}'
            `;
            query(commandQuery, (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    commandQuery = `
                        UPDATE messageinfo
                        SET Saw = '${result[0].Saw} ${roomChat.user}'
                        WHERE MessageInfoId = '${roomChat.messageInfoId}'
                    `;

                    query(commandQuery, (err, result) => {
                        if (err) {
                            console.log(err);
                        }
                        else{
                            socket.to(roomChat.roomId).emit('seenMessage',{
                                seen: true
                            })
                        }
                    });
                }
            });
        }
    });

    socket.on('sendMess', async (data) => {
        await new Promise((resolve, reject) => {
            let commandQuery = `
                INSERT INTO messageinfo(UserId, RoomChatId, MessageContent, CreateAt, Saw) 
                VALUES ('${data.userId}', '${data.roomChatId}', '${data.messageContent}', '${data.createAt}', '${data.userId}')
            `;
            query(commandQuery, (err, results) => {
                if (err) {
                    console.log(err);
                } else {
                    resolve(true)
                } 
            });
        }).then( () => {
            commandQuery = `
            UPDATE roomchat 
                SET SoftByTime = '${data.createAt}'
                WHERE RoomChatId = '${data.roomChatId}'
                `;
                
            query(commandQuery, (err, results) => {
                if (err) {
                    console.log(err);
                } else {
                    socket.to(data.roomChatId).emit('reviceMess', true);
                    return true;
                } 
            });

        }).then((updateSuccess) => {
            if (updateSuccess) {   
                socket.emit('reloadMessenger', true);
            }

        })
        .catch(err =>{
            console.log(err);
        })



    });

    socket.on('disconnect', (a) => {
        console.log('socket:::', socket._events.disconnect);
    });
});

app.get('/', (req, res) => {
    res.json('1');
});

app.get('/api/home', (req, res) => {
    jwt.verify(req.query.token, 'appchat', async (err, tokenValue) => {
        if (err) {
            res.json({
                login: false,
            });
        } else {
            const userId = tokenValue.userId;
            let commanQuery = `
                SELECT * FROM roomchat inner join topic on roomchat.TopicId = topic.TopicId
                                    inner join message on roomchat.RoomChatId = message.RoomChatId
                WHERE message.UserId = '${userId}'
                ORDER BY SoftByTime DESC
            `;
            let data = await new Promise((resolve, reject) => {
                query(commanQuery, async (err, data) => {
                    let a = [];
                    if (err) {
                        console.log(err);
                    } else {
                        resolve(data);
                    }
                });
            });

            let resultApi = [];
            for (let i = 0; i < data.length; i++) {
                const element = data[i];
                const queryMessInfo = `
                    SELECT MessageInfoId, MessageContent, CreateAt, Saw 
                    FROM messageinfo
                    WHERE RoomChatId = '${element.RoomChatId}' 
                    ORDER BY CreateAt DESC
                    LIMIT 1
                `;
                let a = await new Promise((resolve, reject) => {
                    query(queryMessInfo, (err1, result1) => {
                        if (err1) {
                        } else {
                            let b;
                            let saw = false;

                            if(result1[0].Saw){
                                saw = result1[0].Saw.split(' ').some((s) => s == userId);
                            }

                            if (result1.length > 0) {
                                b = {
                                    roomChatId: element.RoomChatId,
                                    roomChatName: element.RoomChatName,
                                    imageBackground: element.ImageBackground,
                                    emoji: element.Emoji,
                                    nickname: element.NickName,
                                    member: element.Member,
                                    notification: element.Notification,
                                    onChatRoom: element.OnChatRoom,
                                    messageInfo: {
                                        messageInfoId: result1[0].MessageInfoId,
                                        messageContent: result1[0].MessageContent,
                                        createAt: result1[0].CreateAt,
                                        saw: saw,
                                    },
                                };
                            } else {
                                b = {
                                    roomChatId: element.RoomChatId,
                                    roomChatName: element.RoomChatName,
                                    imageBackground: element.ImageBackground,
                                    emoji: element.Emoji,
                                    nickname: element.NickName,
                                    member: element.Member,
                                    notification: element.Notification,
                                    onChatRoom: element.OnChatRoom,
                                    messageInfo: {
                                        messageInfoId: null,
                                        messageContent: 'Bắt đầu cuộc trò chuyện',
                                        createAt: null,
                                        saw: null,
                                    },
                                };
                            }

                            if(req.query.roomChatId && req.query.roomChatId == element.RoomChatId){
                                res.json(b)
                                res.end();
                                return;
                            }

                            resolve(b);
                        }
                    });
                });
                resultApi.push(a);
            }
            res.json(resultApi);
        }
    });
});

app.get('/api/messages', function (req, res) {
    jwt.verify(req.query.token, 'appchat', async (err, token) => {
        if (err) {
            res.json({
                message: false,
            });
        } else {
            let commandQuery = `
                SELECT *
                FROM roomchat inner join message on roomchat.RoomChatId = message.RoomChatId
                WHERE UserId = '${token.userId}' AND roomchat.RoomChatId = '${req.query.roomChatId}'
            `;
            let roomChat = await new Promise((resolve, reject) => {
                query(commandQuery, (err, dataRomChat) => {
                    if (err) {
                        res.json('loi 1');
                        res.end();
                    } else {
                        resolve(dataRomChat);
                    }
                });
            });

            let commandQuery2 = `
                SELECT MessageInfoId, MessageContent, CreateAt, Hidden, DeleteMess, Forward, Reply, Saw,
                       message.UserId, user.Avatar, user.FullName, message.NickName
                FROM message inner join user on message.UserId = user.UserId
                             inner join messageinfo on (messageinfo.RoomChatId = message.RoomChatId
                                                        AND messageinfo.UserId = message.UserId) 
                WHERE message.RoomChatId = '${req.query.roomChatId}'
                ORDER BY CreateAt ASC
            `;

            let messageContent = await new Promise((resolve, reject) => {
                query(commandQuery2, (err, dataRomChat) => {
                    if (err) {
                        res.json('loi 2');
                        res.end();
                    } else {
                        resolve(dataRomChat);
                    }
                });
            });

            let personReply = async (reply) => {
                const [messId, userSendId] = reply.split(' ');
                let commandQuery3 = `
                    SELECT MessageInfoId, user.UserId, user.FullName, message.NickName, MessageContent
                    FROM messageinfo inner join message on (messageinfo.UserId = message.UserId 
                                                            AND messageinfo.RoomChatId = message.RoomChatId)
                                     inner join user on message.UserId = user.UserId
                    WHERE MessageInfoId = '${messId}' AND message.UserId = '${userSendId}'
                `;

                return new Promise((resolve, reject) => {
                    query(commandQuery3, (err, replyInfo) => {
                        if (err) {
                            res.json('loi 3');
                            res.end();
                        } else {
                            resolve(replyInfo);
                        }
                    });
                });
            };

            let personSaw = async (saw) => {
                const user = saw.split(' ');
                let a = '';
                for (let i = 0; i < user.length; i++) {
                    const u = user[i];
                    a += 'UserId = ' + u;
                    if (i !== user.length - 1) {
                        a += ' OR ';
                    }
                }
                console.log({
                    a: a
                });
                let commandQuery4 = `
                    SELECT UserId, Avatar
                    FROM user
                    WHERE ${a}
                `;
                return new Promise((resolve, reject) => {
                    query(commandQuery4, (err, userSaw) => {
                        if (err) {
                            res.json('loi 4');
                            res.end();
                        } else {
                            resolve(userSaw);
                        }
                    });
                });
            };

            let messageContentResult = [];
            for (let i = 0; i < messageContent.length; i++) {

                const mess = messageContent[i];
                messageContentResult[i] = await new Promise(async (resolve, reject) => {
                    let replyMess = {};
                    let sawMess = [];
                    if (mess.Reply) {
                        let replyMess1 = await personReply(mess.Reply);
                        replyMess = {
                            messageInfoId: replyMess1[0].MessageInfoId,
                            userSendId: replyMess1[0].UserId,
                            nickNameSend: replyMess1[0].NickName,
                            fullNameSend: replyMess1[0].FullName,
                            messageContent: replyMess1[0].MessageContent,
                        };
                    }

                    if (mess.Saw) {
                        sawMess = await personSaw(mess.Saw);
                    }

                    resolve({
                        messageInfoId: mess.MessageInfoId,
                        userSend: {
                            userId: mess.UserId,
                            fullName: mess.FullName,
                            nickName: mess.NickName,
                            avatar: mess.Avatar,
                        },
                        messageContent: mess.MessageContent,
                        createAt: mess.CreateAt,
                        hidden: false,
                        forward: mess.Forward, // MessId of message forward
                        delete: false,
                        reply: replyMess,
                        saw: sawMess,
                    });
                }); 
            }

            const result = {
                roomChatId: roomChat[0].RoomChatId,
                roomChatName: roomChat[0].RoomChatName, 
                imageBackground: roomChat[0].ImageBackground,
                emoji: roomChat[0].Emoji,
                topicId: roomChat[0].TopicId,
                topicName: roomChat[0].TopicName,
                notification: roomChat[0].Notification,
                nickName: roomChat[0].NickName,
                fullName: roomChat[0].FullName,
                onChatRoom: true,
                member: roomChat[0].Member,
                message: messageContentResult,
            };
            res.json(result);
        }
    });
});

app.post('/api/checklogin', (req, res) => {
    jwt.verify(req.body.token, 'appchat', (err, data) => {
        if (err) {
            res.json({
                login: false,
            });
        } else {
            let commanQuery = `SELECT NickName, UserId FROM user WHERE NickName = '${data.username}'`;
            query(commanQuery, (err, result) => {
                if (err)
                    res.json({
                        err: 'Lỗi csdl',
                    });
                else if (result.length === 1) {
                    res.json({
                        login: true,
                    });
                } else {
                    res.json({
                        login: false,
                    });
                }
            });
        }
    });
});

app.post('/api/login', (req, res) => {
    if (req.body.username && req.body.password) {
        let commandQuery = `SELECT UserId, NickName, Password FROM user WHERE NickName = '${req.body.username}' AND Password = '${req.body.password}'`;
        query(commandQuery, (err, results) => {
            if (err) {
                console.log(err);
            }
            if (results.length > 0) {
                req.session.nickname = req.body.username;
                res.json({
                    token: jwt.sign(
                        {
                            userId: results[0].UserId,
                        },
                        'appchat',
                    ),
                    userId: results[0].UserId,
                });
            } else
                res.json({
                    fail: true,
                });
        });
    } else {
        res.json({
            err: 'Lỗi',
        });
    }
});

app.get('/api/checkusername', (req, res) => {
    if (req.query.username) {
        let commandQuery = `
            SELECT NickName 
            FROM user
            WHERE NickName = '${req.query.username}'
        `;

        query(commandQuery, (err, result) => {
            if (err) {
                res.json(false);
            } else {
                res.json(result.length > 0 ? true : false);
            }
        });
    }
});

app.post('/api/register', (req, res) => {
    if (req.body.username && req.body.fullname && req.body.password && req.body.gender) {
        let commandQuery = `
            INSERT INTO user (Password, FullName, NickName, Gender) 
            VALUES ('${req.body.password}','${req.body.fullname}','${req.body.username}','${req.body.gender}')
        `;

        query(commandQuery, (err, result) => {
            if (err) {
                res.json(false);
            } else {
                res.json(true);
            }
        });
    }
});

server.listen(port, (req, res) => {
    console.log(`listenning on port ${port}`);
});

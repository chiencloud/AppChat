const express = require('express');
const cors = require('cors');
const app = express();
const server = require('http').createServer(app);
const { Server } = require('socket.io');

const routerMessage = require('./router/message');
const routerHome = require('./router/home');
const routerLogin = require('./router/login');
const routerRegister = require('./router/register');


const query = require('./config');

const port = 4000;
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        method: ['GET', 'POST', 'PUT', 'DELETE'],
    },
});

app.use(cors());
app.use(express.json());

app.use('/api/home', routerHome);
app.use('/api/messages', routerMessage);
app.use('/api/login', routerLogin);
app.use('/api/register', routerRegister);
app.use('/api/search', routerRegister);

server.listen(port, (req, res) => {
    console.log(`listenning on port ${port}`);
});


let user = [];
io.on('connection', (socket) => {
    socket.on('login', (data) => {
        console.log('login', data);
        if (data.userId) {
            user.push({
                userId: data.userId,
                socketId: socket.id,
            });
        }
    });

    socket.on('checkSeenMess', (roomChat) => {
        // Handle when user click messenger to show message content
        // Update saw
        if (roomChat.roomId && roomChat.user) {
            console.log('join', user);
            let commandQuery = `
            SELECT Saw, MessageInfoId
            FROM messageinfo
            WHERE RoomChatId = '${roomChat.roomId}'
            ORDER BY CreateAt DESC
            LIMIT 1
        `;
            console.log(roomChat.roomId);
            new Promise((resolve, reject) => {
                query(commandQuery, (err, result) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    if (result.length > 0 && !result[0].Saw.split(' ').some((s) => s == roomChat.user)) {
                        resolve(result);
                    }
                });
            })
                .then((result) => {
                    commandQuery = `
                UPDATE messageinfo
                SET Saw = '${result[0].Saw} ${roomChat.user}'
                WHERE MessageInfoId = '${result[0].MessageInfoId}'
            `;

                    query(commandQuery, (err, result) => {
                        if (err) {
                            console.log(err);
                        } else return;
                    });
                })
                .then(() => {
                    commandQuery = `
                SELECT UserId 
                FROM message
                WHERE RoomChatId = '${roomChat.roomId}'
            `;

                    query(commandQuery, (err, result) => {
                        if (err) {
                            console.log(err);
                        } else {
                            for (let i = 0; i < result.length; i++) {
                                const userId = result[i];
                                for (let j = 0; j < user.length; j++) {
                                    const u = user[j];
                                    console.log(u);
                                    console.log(userId);
                                    if (userId.UserId == u.userId) {
                                        socket.to(u.socketId).emit('seenMessage', {
                                            seen: true,
                                        });
                                    }
                                }
                            }
                            socket.emit('seenMessageMessenger',{
                                socketId: socket.id
                            })
                        }
                    });
                });
        }
    });

    socket.on('sendMess', async (data) => {
        await new Promise((resolve, reject) => {
            const reply = data.reply ? `'${data.reply}'` : null
            console.log(reply);
            let commandQuery = `
            INSERT INTO messageinfo(UserId, RoomChatId, MessageContent, CreateAt, Saw, Reply) 
            VALUES ('${data.userId}', '${data.roomChatId}', '${data.messageContent}', '${data.createAt}', '${data.userId}', ${reply})
            `;
            query(commandQuery, (err, results) => {
                if (err) {
                    console.log(err);
                } else {
                    resolve(true);
                }
            });
        })
            .then(() => {
                commandQuery = `
                    UPDATE roomchat 
                    SET SoftByTime = '${data.createAt}'
                    WHERE RoomChatId = '${data.roomChatId}'
                `;

                query(commandQuery, (err, results) => {
                    if (err) {
                        console.log(err);
                    } else {
                        return;
                    }
                });
            })
            .then(() => {
                commandQuery = `
                SELECT UserId 
                FROM message
                WHERE RoomChatId = '${data.roomChatId}'
            `;

                query(commandQuery, (err, result) => {
                    if (err) {
                        console.log(err);
                    } else {
                        for (let i = 0; i < result.length; i++) {
                            const userId = result[i];
                            for (let j = 0; j < user.length; j++) {
                                const u = user[j];
                                if (userId.UserId == u.userId) {
                                    socket.to(u.socketId).emit('reviceMess', true);
                                }
                            }
                        }
                        socket.emit('reviceMessUserSend', {
                            socketId: socket.id
                        })
                    }
                });
            })
            .catch((err) => {
                console.log(err);
            });
    });

    socket.on('disconnect', (a) => {
        console.log('socket:::', socket._events.disconnect);
        user = user.filter((u) => u.socketId !== socket.id);
    });
});

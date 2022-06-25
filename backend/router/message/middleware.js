const jwt = require('jsonwebtoken');
const query = require('../../config');


function getMessage(req, res, next) {
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
}




module.exports = {
    getMessage: getMessage
}
const jwt = require('jsonwebtoken');
const query = require('../../config');


function getHome(req, res, next) {
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
}




module.exports = {
    getHome: getHome
}
const jwt = require('jsonwebtoken');
const query = require('../config');

function socketIO(socket) {
    console.log(socket.id);
    socket.on('checkSeenMess', (roomChat) => {
        // console.log('joined Room', roomChat);
        // socket.join(roomChat.roomId);
        // Handle when user click messenger to show message content
        // Update saw
        if (!roomChat.saw) {
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
                        } else {
                            socket.to(roomChat.roomId).emit('seenMessage', {
                                seen: true,
                            });
                        }
                    });
                }
            });
        }
        console.log('room:::', socket.rooms);
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
                        socket.to(data.roomChatId).emit('reviceMess', true);
                        console.log('send mess success');
                        return true;
                    }
                });
            })
            .then((updateSuccess) => {
                if (updateSuccess) {
                    socket.emit('reloadMessenger', true);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    });

    socket.on('disconnect', (a) => {
        console.log('socket:::', socket._events.disconnect);
    });
}

module.exports = socketIO;

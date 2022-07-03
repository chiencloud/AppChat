const jwt = require('jsonwebtoken');
const query = require('../../config');

function getSearchUser(req, res, next) {
    if (req.query.searchValue) {
        let limit = 20;
        if (req.query.type === 'short') {
            limit = 5;
        }
        let commandQuery = `
            SELECT * 
            FROM user INNER JOIN friend on user.UserId = friend.FriendId
            WHERE NickName LIKE '%${req.query.searchValue}%' OR FullName LIKE '%${req.query.searchValue}%'
            LIMIT ${limit}
        `;

        query(commandQuery, (err, result) => {
            if (err) {
                console.log(err);
            }
            else if (result.length >= 5) {
                let resultSearch = result.map((user, index) =>{
                    return {
                        img: user.Avatar,
                        userName: user.FullName,
                        nickName: user.NickName,
                        type: user.Type == 1 ? 'Bạn bè' : 'Đã kết nối'
                    }
                })
                res.json(resultSearch);
            } else {
                commandQuery = `
                    SELECT * 
                    FROM user
                    WHERE (NickName LIKE '%${req.query.searchValue}%' OR FullName LIKE '%${req.query.searchValue}%') 
                    LIMIT ${limit}
                `;

                query(commandQuery, (err, result1) => {
                    if(err){
                        console.log(err);
                    }
                    else if(result1.length == 0) {
                        res.json([])
                    }
                    else {
                        let resultSearch = result.map((user, index) =>{
                            return {
                                img: user.Avatar,
                                userName: user.FullName,
                                nickName: user.NickName,
                                type: user.Type == 1 ? 'Bạn bè' : 'Đã kết nối'
                            }
                        })
                        let resultSearch1 = result1.map((user, index) =>{
                            return {
                                img: user.Avatar,
                                userName: user.FullName,
                                nickName: user.NickName,
                                type: 'Người lạ'
                            }
                        })
                        res.json([
                            ...resultSearch,
                            ...resultSearch1
                        ].splice(0,5))
                    }
                })
            }
        });
    }
}

module.exports = {
    getSearchUser: getSearchUser,
};

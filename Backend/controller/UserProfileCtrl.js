const Common = require('../common');
const connection = require('../MySqlConnect');
const bcrypt = require('bcrypt');

var UserProfileCtrl = {
    getUserProfileByID: getUserProfileByID,
    updateUserProfile: updateUserProfile,
    userChangePassword: userChangePassword,

}

function getUserProfileByID(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spGetUserProfileByID('${data.UserID}')`;
        connection.query(Query, (Err, Res) => {
            if (Err) {
                reject({
                    "success": false,
                    "message": Common.ExceptionMsg,
                    "messageType": "error",
                    "error": Err,
                });
            } else {
                resolve({
                    "success": true,
                    "data": Res[0],
                    "message": "Get user profile successfully",
                    "messageType": "success"
                });
            }
        });
    })
}


function updateUserProfile(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spUpdateUserProfile('${JSON.stringify(data)}')`;
        connection.query(Query, (Err, Res) => {
            if (Err) {
                reject({
                    "success": false,
                    "message": Err,
                    "messageType": "error",
                    "error": Err,
                });
            } else {
                resolve({
                    "success": true,
                    "data": [],
                    "message": Res[0][0].Message,
                    "messageType": Res[0][0].MessageType
                });
            }
        });
    })
}


function userChangePassword(data) {

    return new Promise((resolve, reject) => {
        if (!Common.isEmpty(data.NewPassword)) {
            var chekUserQuery = `SELECT su.Password FROM SecurityUser su WHERE su.SecurityUserID = '${data.UserID}'`;

            connection.query(chekUserQuery, (checkUserErr, checkUserRows) => {
                if (checkUserErr) {
                    reject({
                        "success": false,
                        "error": checkUserErr,
                        "message": Common.ExceptionMsg
                    })
                }
                else {
                    // console.log(checkUserRows.length)
                    if (checkUserRows.length > 0) {

                        bcrypt.compare(data.CurrentPassword, checkUserRows[0].Password, function (err, isMatch) {

                            if (err) {
                                reject(err);
                            }
                            else if (isMatch) {
                                bcrypt.genSalt(10, function (err, salt) {
                                    if (err) {
                                        return next(err);
                                    }
                                    bcrypt.hash(data.NewPassword, salt, function (err, hash) {
                                        if (err) {
                                            return next(err);
                                        }

                                        data.NewPassword = hash;

                                        let Query = `CALL spUpdatePassword('${data.UserID}', '${data.NewPassword}')`;
                                        connection.query(Query, (updateErr, updateQuery) => {
                                            console.log("Update", updateQuery)

                                            if (updateErr) {
                                                reject({

                                                    "success": false,
                                                    "message": Common.ExceptionMsg,
                                                    "messagetype": "error",
                                                    "err": updateErr,
                                                });
                                            } else {

                                                resolve({
                                                    "success": true,
                                                    "message": "Password updated successfully",
                                                    "messagetype": "success",
                                                });
                                            }
                                        });
                                    });
                                });
                            }
                            else {
                                resolve({
                                    "success": false,
                                    "message": "Your current password is incorrect",
                                    "messagetype": "error"
                                })
                            }
                        })
                    }
                    else {
                        resolve({
                            "success": false,
                            "message": "User not found",
                            "messagetype": "error"
                        })
                    }
                }
            })

        }
    })
}


module.exports = UserProfileCtrl;
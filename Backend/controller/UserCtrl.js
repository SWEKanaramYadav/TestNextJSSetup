const Common = require('../common');
const connection = require('../MySqlConnect');
const bcrypt = require('bcrypt');


var UserCtrl = {
    getUser: getUser,
    getUserById: getUserById,
    updateUserStatus: updateUserStatus,
    deleteUser: deleteUser,
    activeInActiveUser: activeInActiveUser,
    getUserRoleById:getUserRoleById
}

function getUser(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spGetUserList('${data.SecurityUserID}', '${data.OrganizationID}')`;
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
                    "data": Res[0],
                    "message": "Get User Menu List successfully",
                    "messageType": "success"
                });
            }
        });

    })
}

function getUserById(data) {
    return new Promise((resolve, reject) => {
        if (!Common.isEmpty(data.PersonID)) {

            let Query = `CALL spGetUserById('${data.PersonID}')`;
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
                        "data": Res[0],
                        "message": "Get user details successfully",
                        "messageType": "success"
                    });
                }
            });

        }
        else {
            reject({
                "success": false,
                "message": "Parameter missing!",
                "messageType": "error",
            });
        }
    })
};

function deleteUser(data) {
    return new Promise((resolve, reject) => {


        var query = `CALL spDeleteUser('${data.userCreatorID}', '${data.userID}')`;
        connection.query(query, (Err, Res) => {

            if (Err) {
                reject({
                    "success": false,
                    "data": '',
                    "message": Err,
                    "messagetype": 'error'
                })
            }
            else {
                resolve({
                    "success": Res[0][0].MessageType == "error" ? false : true,
                    "data": '',
                    "message": Res[0][0].Message,
                    "messagetype": Res[0][0].MessageType
                });
            }
        })
    })
}

function updateUserStatus(data) {
    return new Promise((resolve, reject) => {
        var securityGroupQuery = `CALL spUpdateUserStatus('${JSON.stringify(data)}')`;
        connection.query(securityGroupQuery, (securityGroupErr, securityGroupRows) => {
            if (securityGroupErr) {
                reject({
                    "success": false,
                    "error": securityGroupErr,
                    "message": Common.ExceptionMsg
                })
            }
            else {
                if (securityGroupRows.length > 0) {
                    resolve({
                        "success": securityGroupRows[0][0].MessageType == "error" ? false : true,
                        "data": securityGroupRows[0][0],
                        "message": securityGroupRows[0][0].message,
                        "messagetype": securityGroupRows[0][0].messagetype
                    });
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
    })
};


function activeInActiveUser(data) {
    return new Promise((resolve, reject) => {


        var securityGroupQuery = `CALL spActiveInActiveUser('${data.Type}', '${data.UserID}', '${data.UserCreatorID}')`;
        connection.query(securityGroupQuery, (securityGroupErr, securityGroupRows) => {

            if (securityGroupErr) {
                reject({
                    "success": false,
                    "error": securityGroupErr,
                    "message": Common.ExceptionMsg
                })
            }
            else {
                if (securityGroupRows.length > 0) {

                    resolve({
                        "success": securityGroupRows[0][0].MessageType == "error" ? false : true,
                        "data": '',
                        "message": securityGroupRows[0][0].Message,
                        "messagetype": securityGroupRows[0][0].MessageType
                    });



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


    })
}

function getUserRoleById(data) {
    return new Promise((resolve, reject) => {
        if (!Common.isEmpty(data.UserName)) {
            let Query = `CALL spGetUserRoleById('${data.UserName}');`;
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
                        "data": Res[0],
                        "message": "Get user role successfully",
                        "messageType": "success"
                    });
                }
            });

        }
        else {
            reject({
                "success": false,
                "message": "Parameter missing!",
                "messageType": "error",
            });
        }
    })
};

module.exports = UserCtrl;
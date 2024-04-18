const Common = require('../common');
const connection = require('../MySqlConnect');
const bcrypt = require('bcrypt');

var UserRoleCtrl = {
    GetUserRoleById: GetUserRoleById,
    AddUpdateUserRole: AddUpdateUserRole,
    GetUserRole: GetUserRole,
    DeleteUserRole: DeleteUserRole,

}

function GetUserRoleById(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spGetUserRoleById('${data.MasterId}')`;
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

function GetUserRole(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spGetUserRole('${data.UserID}', '${data.OrganizationID}')`;
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
                    "message": "Get Master List successfully",
                    "messageType": "success"
                });
            }
        });
    })
}

function AddUpdateUserRole(data) {

    return new Promise((resolve, reject) => {
        let Query = `CALL spAddUpdateUserRole('${JSON.stringify(data)}')`;
        connection.query(Query, function (err, Res) {

            if (err) {
                reject({
                    "success": false,
                    "data": [],
                    "message": err,
                    "messageType": "error"
                });
            }
            else {
                resolve({
                    "success": Res[0][0].MessageType == 'success' ? true : false,
                    "data": [],
                    "message": Res[0][0].Message,
                    "messageType": Res[0][0].MessageType
                })

            }
        })
    })

}

function DeleteUserRole(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spDeleteUserRole('${data.MasterId}', '${data.UserID}')`;
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

module.exports = UserRoleCtrl;
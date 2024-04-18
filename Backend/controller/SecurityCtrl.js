const Common = require('../common');
const connection = require('../MySqlConnect');
const bcrypt = require('bcrypt');

var SecurityCtrl = {
    getSecurity: getSecurity,
    AddUpdateSecurity: AddUpdateSecurity,
    getSecurityById: getSecurityById,
    DeleteSecurity: DeleteSecurity,
    updateIsEnableStatus: updateIsEnableStatus
}

function getSecurity(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spGetSecurity('${data.SecurityUserID}', '${data.OrganizationID}')`;
        connection.query(Query, (Err, Res) => {
            if (Err) {
                reject({
                    "success": false,
                    "message": Err,
                    "messageType": "error",
                    "error": Err,
                });
            } else {
                if (Res[0]?.length) {
                    let response = Res[0];
                    let responseOne = Res[1]?.length ? Res[1] : [];
                    let tempData = []
                    for(let i = 0; i < response.length; i++) {
                        for(let j = 0; j < responseOne.length; j++) {
                            if (response[i]?.SecurityID === responseOne[j].SecurityID) {
                                tempData.push(responseOne[j])
                            }
                        }
                        response[i].CareOffPerson = tempData;
                        tempData = []
                    }
                    resolve({
                        "success": true,
                        "data": response,
                        "message": "Get security successfully",
                        "messageType": "success"
                    });
                } else {
                    resolve({
                        "success": true,
                        "data": [],
                        "message": "Security master empty",
                        "messageType": "success"
                    });
                }
            }
        });
    })
};

function getSecurityById(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spGetSecurityById('${data.SecurityID}')`;
        connection.query(Query, (Err, Res) => {
            if (Err) {
                reject({
                    "success": false,
                    "message": Err,
                    "messageType": "error",
                    "error": Err,
                });
            } else {
                if (Res[0]?.length) {
                    let response = Res[0];
                    response[0].CareOffPerson = Res[1]?.length ? Res[1] : [];
                    resolve({
                        "success": true,
                        "data": response,
                        "message": "Get security successfully",
                        "messageType": "success"
                    });
                } else {
                    resolve({
                        "success": true,
                        "data": [],
                        "message": "Security empty",
                        "messageType": "success"
                    });
                }

            }
        });
    })
};

function AddUpdateSecurity(data) {

    return new Promise((resolve, reject) => {
        let Query = `CALL spAddUpdateSecurity('${JSON.stringify(data)}')`;
        connection.query(Query, function (Err, Res) {

            if (Err) {
                reject({
                    "success": false,
                    "data": [],
                    "message": Err,
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

};

function DeleteSecurity(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spDeleteSecurity('${data.SecurityID}', '${data.SecurityUserID}')`;
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

function updateIsEnableStatus(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spUpdateIsEnableStatus('${data.SecurityID}', '${data.SecurityUserID}', '${data.IsEnable}')`;
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

module.exports = SecurityCtrl;
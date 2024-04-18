const Common = require('./../common');
const connection = require('../MySqlConnect');

var UserAccessCtrl = {
    getUserAccess: getUserAccess,
    getEntityType: getEntityType,
    getUserTypeList: getUserTypeList,
    getMenuMaster: getMenuMaster,
    addUpdateEntityType: addUpdateEntityType,
    getEntityTypeByID: getEntityTypeByID,
    getUserTypeByID: getUserTypeByID,
    addUpdateUserType: addUpdateUserType
}

function getUserAccess(data) {
    return new Promise((resolve, reject) => {
        if (!Common.isEmpty(data.SecurityUserID)) {

            let Query = `CALL spGetUserAccess('${data.SecurityUserID}', '${data.OrganizationID}')`;
            connection.query(Query, (Err, Res) => {
                if (Err) {
                    reject({

                        "success": false,
                        "message": Err,
                        "messageType": "error",
                        "error": Err,
                    });
                } else {
                    let data = Res[0];
                    let childMenus = Res[1];
                    if(childMenus?.length) {
                        data.forEach(element => {
                            element['SubMenus'] = childMenus.filter(x => x.ParentId == element.MenuID);
                        });
                    }
                    
                    resolve({
                        "success": true,
                        "data": data,
                        "message": "Get User Menu List successfully",
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
}

function getEntityType(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spGetEntityType('${data.SecurityUserID}', '${data.OrganizationID}')`;
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
                    "message": "Get Entity Type List successfully",
                    "messageType": "success"
                });
            }
        });
    })
}

function getUserTypeList(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spGetUserTypeList('${data.OrganizationID}')`;
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
                    "message": "Get User List successfully",
                    "messageType": "success"
                });
            }
        });
    })
}

function getMenuMaster() {
    return new Promise((resolve, reject) => {
        let Query = `CALL spGetMenuMaster()`;
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
                    "message": "Get menu master successfully",
                    "messageType": "success"
                });
            }
        });
    })
}

function addUpdateEntityType(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spAddUpdateEntityType('${data.UserID}','${JSON.stringify(data)}')`;
        connection.query(Query, (Err, Res) => {
            if (Err) {
                reject({
                    "success": false,
                    "data": [],
                    "message": Err,
                    "messageType": "error",
                });
            } else {
                resolve({
                    "success": Res[0][0].MessageType == "success" ? true : false,
                    "data": [],
                    "message": Res[0][0].Message,
                    "messageType": Res[0][0].MessageType
                });
            }
        });
    })
}

function getEntityTypeByID(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spGetEntityTypeByID('${data.SecurityGroupID}', '${data.OrganizationID}', '${data?.SecurityUserID}')`;
        connection.query(Query, (Err, Res) => {
            if (Err) {
                reject({
                    "success": false,
                    "data": [],
                    "message": Err,
                    "messageType": "error",
                });
            } else {
                let response = Res[0][0];
                response.AccessList = Res[1];
                response.RoleAccessList = Res[2];
                resolve({
                    "success": true,
                    "data": response,
                    "message": "Get user type details sucessfully.",
                    "messageType": "success"
                });
            }
        });
    })
}

function getUserTypeByID(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spGetUserTypeByID('${data.SecurityUserID}', '${data.OrganizationID}', '${data.SelfSecurityUserID}')`;
        connection.query(Query, (Err, Res) => {
            if (Err) {
                reject({
                    "success": false,
                    "data": [],
                    "message": Err,
                    "messageType": "error",
                });
            } else {
                let response = Res[0][0];
                response.AccessList = Res[1];
                response.RoleAccessList = Res[2];
                resolve({
                    "success": true,
                    "data": response,
                    "message": "Get user type details sucessfully.",
                    "messageType": "success"
                });
            }
        });
    })
}

function addUpdateUserType(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spAddUpdateUserType('${data.UserID}','${JSON.stringify(data)}')`;
        connection.query(Query, (Err, Res) => {
            if (Err) {
                reject({
                    "success": false,
                    "data": [],
                    "message": Err,
                    "messageType": "error",
                });
            } else {
                resolve({
                    "success": Res[0][0].MessageType == "success" ? true : false,
                    "data": [],
                    "message": Res[0][0].Message,
                    "messageType": Res[0][0].MessageType
                });
            }
        });
    })
}

module.exports = UserAccessCtrl;
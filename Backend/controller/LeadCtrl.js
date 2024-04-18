const Common = require('../common');
const connection = require('../MySqlConnect');
const bcrypt = require('bcrypt');


var LeadCtrl = {
    AddUpdateLead: AddUpdateLead,
    getLead: getLead,
    getLeadList: getLeadList,
    getLeadById: getLeadById,
    DeleteLead: DeleteLead,
    closeLead: closeLead,
   
};


function AddUpdateLead(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spAddUpdateLead('${JSON.stringify(data)}')`;
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

function getLead(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spGetLead('${data.SecurityUserID}')`;
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
                    resolve({
                        "success": true,
                        "data": response,
                        "message": "Get lead list successfully",
                        "messageType": "success"
                    });
                } else {
                    resolve({
                        "success": true,
                        "data": [],
                        "message": "lead list is empty",
                        "messageType": "success"
                    });
                }
            }
        });
    })
};



function getLeadList(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spGetLeadList('${data.SecurityUserID}')`;
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

                    resolve({
                        "success": true,
                        "data": response,
                        "message": "Get Lead list successfully",
                        "messageType": "success"
                    });
                } else {
                    resolve({
                        "success": true,
                        "data": [],
                        "message": "Lead list is empty",
                        "messageType": "success"
                    });
                }
            }
        });
    })
};


function getLeadById(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spGetLeadById('${data.LeadID}')`;
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
                    // response[0].CareOffPerson = Res[1]?.length ? Res[1] : [];
                    resolve({
                        "success": true,
                        "data": response,
                        "message": "Get lead successfully",
                        "messageType": "success"
                    });
                } else {
                    resolve({
                        "success": true,
                        "data": [],
                        "message": "lead is not found",
                        "messageType": "success"
                    });
                }

            }
        });
    })
};


function DeleteLead(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spDeleteLead('${data.LeadMasterID}', '${data.SecurityUserID}')`;
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


function closeLead(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spCloseLead('${data.LeadMasterID}', '${data.SecurityUserID}')`;
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
                    "message": 'Lead closed successfully',
                    "messageType": 'success',
                });
            }
        });
    })
}


module.exports = LeadCtrl;
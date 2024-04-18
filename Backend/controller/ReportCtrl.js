const Common = require('../common');
const connection = require('../MySqlConnect');
const bcrypt = require('bcrypt');

var ReportCtrl = {
    getCommisssionWithByforgettionReport: getCommisssionWithByforgettionReport,
    getCommisssionPayoutReport: getCommisssionPayoutReport,
    addUpdatePolicyCommissionReport: addUpdatePolicyCommissionReport
};

function getCommisssionWithByforgettionReport(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spGetFullReport('${JSON.stringify(data)}')`;
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
                    // }
                    resolve({
                        "success": true,
                        "data": response,
                        "message": "Get report list successfully",
                        "messageType": "success"
                    });
                } else {
                    resolve({
                        "success": true,
                        "data": [],
                        "message": "Report list is empty",
                        "messageType": "success"
                    });
                }
            }
        });
    })
};

function getCommisssionPayoutReport(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spGetCommisssionPayoutReport('${JSON.stringify(data)}')`;
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
                        "message": "Get report list successfully",
                        "messageType": "success"
                    });
                } else {
                    resolve({
                        "success": true,
                        "data": [],
                        "message": "Report list is empty",
                        "messageType": "success"
                    });
                }
            }
        });
    })
};

function addUpdatePolicyCommissionReport(data) {

    return new Promise((resolve, reject) => {
        let Query = `CALL spAddUpdatePolicyCommissionReport('${JSON.stringify(data)}')`;
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


module.exports = ReportCtrl;
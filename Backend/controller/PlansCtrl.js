const Common = require('../common');
const connection = require('../MySqlConnect');
const bcrypt = require('bcrypt');

var PlansCtrl = {
    AddUpdatePlan: AddUpdatePlan,
    GetPlansList: GetPlansList,
    DeletePlan: DeletePlan,

}

function GetPlansList(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spGetPlanList('${data.UserID}')`;
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
                    "message": "Get Plans List successfully",
                    "messageType": "success"
                });
            }
        });
    })
}

function AddUpdatePlan(data) {

    return new Promise((resolve, reject) => {
        let Query = `CALL spAddUpdatePlans('${JSON.stringify(data)}')`;
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

function DeletePlan(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spDeletePlan('${data.PlanId}', '${data.UserID}')`;
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

module.exports = PlansCtrl;
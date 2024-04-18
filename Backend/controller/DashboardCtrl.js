const Common = require('../common');
const connection = require('../MySqlConnect');
const bcrypt = require('bcrypt');
const emailService = require('./../services/emailService');

var DashboardCtrl = {
    getDahboardData: getDahboardData,
    getDashboardList: getDashboardList,
    getInsuredPolicyList: getInsuredPolicyList,
    addWorkflow: addWorkflow,
    // DeleteWorkflow:DeleteWorkflow,
};

function getDahboardData(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spGetDahboardData('${data.SecurityUserID}', '${data.OrganizationID}', '${data.FinancialYear}')`;
        connection.query(Query, (Err, Res) => {
            if (Err) {
                reject({
                    "success": false,
                    "message": Err,
                    "messageType": "error",
                    "error": Err,
                });
            } else {
                if (Res?.length) {
                    let response = Res;
                    let TempDashData = [];
                    const Role = response?.length && response[0]?.length ? response[0][0]?.Role : null;
                    if (Role && Role === 'Super Admin') {
                        TempDashData.push({
                            CompanyCount: response?.length && response[1]?.length ? response[1][0]?.CompanyCount : 0,
                            UserCount: response?.length && response[2]?.length ? response[2][0]?.UserCount : 0,
                            TotalAmount: response?.length && response[3]?.length ? response[3][0]?.TotalAmount : 0,
                            PendingCompanyRenewals: response?.length && response[4]?.length ? response[4][0]?.PendingCompanyRenewals : 0,
                        })
                    } else if (Role && Role === 'Organization Admin') {
                        TempDashData.push({
                            UserCount: response?.length && response[1]?.length ? response[1][0]?.UserCount : 0,
                        })
                    } else {
                        TempDashData.push({
                            PendingLeads: response?.length && response[1]?.length ? response[1][0]?.PendingLeads : 0,
                            PendingEmails: response?.length && response[2]?.length ? response[2][0]?.PendingEmails : 0,
                            PendingRenewals: response?.length && response[3]?.length ? response[3][0]?.PendingRenewals : 0,
                            RenewalsOverDue: response?.length && response[4]?.length ? response[4][0]?.RenewalsOverDue : 0,
                            PendingPolicy: response?.length && response[5]?.length ? response[5][0]?.PendingPolicy : 0
                        })
                    }
                    resolve({
                        "success": true,
                        "data": TempDashData,
                        "message": "Get dashboard data successfully",
                        "messageType": "success"
                    });
                } else {
                    resolve({
                        "success": true,
                        "data": [],
                        "message": "Policy list is empty",
                        "messageType": "success"
                    });
                }
            }
        });
    })
};

function getDashboardList(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spGetDashboardList('${JSON.stringify(data)}')`;
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
                        "message": "Get dashboard list successfully",
                        "messageType": "success"
                    });
                } else {
                    resolve({
                        "success": true,
                        "data": [],
                        "message": "Dashboard list is empty",
                        "messageType": "success"
                    });
                }
            }
        });
    })
};

function getInsuredPolicyList(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spGetInsuredPolicyList('${data.SecurityUserID}')`;
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
                    // let responseOne = Res[1]?.length ? Res[1] : [];
                    // let tempData = []
                    // for(let i = 0; i < response.length; i++) {
                    //     for(let j = 0; j < responseOne.length; j++) {
                    //         if (response[i]?.PolicyID === responseOne[j].PolicyID) {
                    //             tempData.push(responseOne[j])
                    //         }
                    //     }
                    //     response[i].CareOffPerson = tempData;
                    //     tempData = []
                    // }
                    resolve({
                        "success": true,
                        "data": response,
                        "message": "Get insured policy list successfully",
                        "messageType": "success"
                    });
                } else {
                    resolve({
                        "success": true,
                        "data": [],
                        "message": "Policy list is empty",
                        "messageType": "success"
                    });
                }
            }
        });
    })
};


function addWorkflow(data) {
    return new Promise((resolve, reject) => {
        const { WorkflowId,WorkflowType, WorkflowName, SelectTrigger, TriggerUrl, ParameterName, ParameterValue, SelectAction, ActionUrl, ActionParameterName, ActionParameterValue } = data;
        let Query;
        let vMessage, vMessageType;
        let vWorkflowId;
        // if (!WorkflowId) {
            vWorkflowId = UUID();
        // } else {
        //     vWorkflowId = WorkflowId;
        // }

        Query = `INSERT INTO workflow_app_master (  WorkflowMasterID,WorkflowType,TriggerURL,ActionURL,ParameterName,ParameterValue,CreatedBy,CreatedOn,Status,StartDate,) 
                 VALUES ('${vWorkflowId}', '${WorkflowType}', '$}', ${SelectTrigger}, ${TriggerUrl},  ${ParameterName},' ${ParameterValue},${''}', NOW(), 'Active', NOW())`;

        connection.query(Query, function (err, res) {
            if (err) {
                reject({
                    "success": false,
                    "data": [],
                    "message": err,
                    "messageType": "error"
                });
            } else {
                vMessage = 'data added successfully';
                vMessageType = 'success';

                resolve({
                    "success": true,
                    "data": [],
                    "message": vMessage,
                    "messageType": vMessageType
                });
            }
        });
    });
};




module.exports = DashboardCtrl;
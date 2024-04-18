const Common = require('../common');
const connection = require('../MySqlConnect');
const bcrypt = require('bcrypt');
const emailService = require('./../services/emailService');

var PolicyCtrl = {
    getPolicyDocNo: getPolicyDocNo,
    getPolicy: getPolicy,
    getPolicyList: getPolicyList,
    AddUpdatePolicy: AddUpdatePolicy,
    getPolicyById: getPolicyById,
    DeletePolicy: DeletePolicy,
    updateEmailCount: updateEmailCount,
    sendEmailByPolicyID: sendEmailByPolicyID,
    sendEmailByAllPolicy: sendEmailByAllPolicy,
    closePolicy: closePolicy
};

function getPolicyDocNo(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spGetPolicyDocNo()`;
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
                        "message": "Get policy doc no successfully",
                        "messageType": "success"
                    });
                } else {
                    resolve({
                        "success": true,
                        "data": [],
                        "message": "Policy doc no is not found",
                        "messageType": "success"
                    });
                }
            }
        });
    })
};

function getPolicy(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spGetPolicy('${data.SecurityUserID}')`;
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
                    let responseTwo = Res[2]?.length ? Res[2] : [];
                    let tempData = [];
                    let fundNameData = [];
                    for(let i = 0; i < response.length; i++) {
                        for(let j = 0; j < responseOne.length; j++) {
                            if (response[i]?.PolicyMasterID === responseOne[j].PolicyMasterID) {
                                tempData.push(responseOne[j]);
                            }
                        }
                        response[i].RiderPerson = tempData;
                        tempData = [];
                    }
                    for(let i = 0; i < response.length; i++) {
                        for(let j = 0; j < responseTwo.length; j++) {
                            if (response[i]?.PolicyMasterID === responseTwo[j].PolicyMasterID) {
                                fundNameData.push(responseTwo[j]);
                            }
                        }
                        response[i].FundNames = fundNameData;
                        fundNameData = [];
                    }
                    resolve({
                        "success": true,
                        "data": response,
                        "FundNames": responseTwo,
                        "message": "Get policy list successfully",
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

function getPolicyList(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spGetPolicyList('${data.SecurityUserID}')`;
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
                        "message": "Get policy list successfully",
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

function getPolicyById(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spGetPolicyById('${data.PolicyID}')`;
        connection.query(Query, (Err, Res) => {
            if (Err) {
                reject({
                    "success": false,
                    "message": Err,
                    "messageType": "error",
                    "error": Err,
                });
            } else {
                if (Res && Res.length >= 1 && Res[0].length) {
                    let policyData = Res[0];
                    let riderData = Res[1];
                    let fundData = Res[2];
                    for (let i = 0; i < policyData.length; i++) {
                        let policy = policyData[i];
                        let policyRiders = [];
                        let policyFunds = [];
                        for (let j = 0; j < riderData.length; j++) {
                            let rider = riderData[j];
                            if (policy.PolicyMasterID === rider.PolicyMasterID) {
                                policyRiders.push({
                                    "RiderMasterId": rider.RiderMasterId,
                                    "RiderName": rider.RiderName,
                                    "Amount": rider.Amount,
                                    "Status": rider.Status
                                });
                            }
                        }

                        for (let k = 0; k < fundData.length; k++) {
                            let fund = fundData[k];
                            if (policy.PolicyMasterID === fund.PolicyMasterID) {
                                policyFunds.push({
                                    "FundNameId": fund.FundNameId,
                                    "FundName": fund.FundName,
                                    "Allocation": fund.Allocation,
                                    "Status": fund.Status
                                });
                            }
                        }
                        policy.RiderPerson = policyRiders;
                        policy.FundNames = policyFunds;
                    }

                    resolve({
                        "success": true,
                        "data": policyData,
                        "message": "Get policy successfully",
                        "messageType": "success"
                    });
                } else {
                    resolve({
                        "success": true,
                        "data": [],
                        "message": "Policy is not found",
                        "messageType": "success"
                    });
                }
            }
        });
    })
};

// function getPolicyById(data) {
//     return new Promise((resolve, reject) => {
//         let Query = `CALL spGetPolicyById('${data.PolicyID}')`;
//         connection.query(Query, (Err, Res) => {
//             if (Err) {
//                 reject({
//                     "success": false,
//                     "message": Err,
//                     "messageType": "error",
//                     "error": Err,
//                 });
//             } else {
//                 if (Res[0]?.length) {
//                     let response = Res[0];
//                     response[0].RiderPerson = Res[1]?.length ? Res[1] : [];
//                     resolve({
//                         "success": true,
//                         "data": response,
//                         "message": "Get policy successfully",
//                         "messageType": "success"
//                     });
//                 } else {
//                     resolve({
//                         "success": true,
//                         "data": [],
//                         "message": "Policy is not found",
//                         "messageType": "success"
//                     });
//                 }
//             }
//         });
//     })
// };

function AddUpdatePolicy(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spAddUpdatePolicy('${JSON.stringify(data)}')`;
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

function DeletePolicy(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spDeletePolicy('${data.PolicyMasterID}', '${data.SecurityUserID}')`;
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

function closePolicy(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spClosePolicy('${data.PolicyMasterID}', '${data.SecurityUserID}','${data.CloseRemark}')`;
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
                    "message": 'Policy closed successfully',
                    "messageType": 'success',
                });
            }
        });
    })
}

function updateEmailCount(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spUpdateEmailCount('${data.PolicyMasterID}', '${data.SecurityUserID}')`;
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
                    "message": 'Email logs updated successfully',
                    "messageType": 'success',
                });
            }
        });
    })
}

function sendEmailByPolicyID(data) {
    return new Promise(async (resolve, reject) => {
        let message = `<h2>Insurance Policy Confirmation</h2>

        <p>Dear ${data?.Data?.CareOffMaster},</p>
    
        <p>We are pleased to confirm the details of your insurance policy with satyam consultants  for your ${data?.Data?.MakeMaster} ${data?.Data?.ModelMaster}.</p>
    
        <h3>Policy Details:</h3>
        <ul>
            <li>Policy Number: ${data?.Data?.PolicyNo}</li>
            <li>Policy Start Date: ${data?.Data?.DateOfBooking}</li>
            <li>Policy End Date: ${data?.Data?.DueDate}</li>
            <li>Type of Policy: ${data?.Data?.TypeOfPolicyMaster}</li>
            <li>Subtype of Policy: ${data?.Data?.SubTypeOfPolicyMaster}</li>
            <li>Insurance Company: ${data?.Data?.NameOfInsuranceCompanyMaster}</li>
            <li>Sum Insured: ${data?.Data?.SumInsured}</li>
            <li>Premium Amount (Total): ${data?.Data?.Total}</li>
        </ul>
    
        <h3>Insured Details:</h3>
        <ul>
            <li>Name: ${data?.Data?.NameOfInsured}</li>
            <li>Registration Number: ${data?.Data?.RegistrationNo}</li>
            <li>Model: ${data?.Data?.ModelMaster}</li>
        </ul>
    
        <h3>Policy Documents:</h3>
        <ul>
            <li><a href="${data?.Data?.PolicyOneDocument}">Policy One Document</a></li>
            <li><a href="${data?.Data?.PolicyTwoDocument}">Policy Two Document</a></li>
            <li><a href="${data?.Data?.EndorsementDocument}">Endorsement Document</a></li>
            <li><a href="${data?.Data?.OtherDocument}">Other Document</a></li>
        </ul>
    
        <h3>Payment Information:</h3>
        <ul>
            <li>Payment Mode: ${data?.Data?.PaymentModeMaster}</li>
        </ul>
    
        <p>Please review the policy details, and if you have any questions or need further assistance, feel free to contact us at info@satyamconsultant.com.</p>
    
        <p>Thank you for choosing satyam consultants for your insurance needs. We appreciate your business and look forward to serving you.</p>
    
        <p>Sincerely,<br>
        Satyam Consultants<br></p>`;

        const mailOptions = {
            toEmail: data?.Email, // Recipient's email address
            subject: `Insurance Policy Confirmation: Your Policy ID #${data?.Data.PolicyNo}`, // Subject of the email
            text: '', // Plain text body of the email
            html: message
        };

        await emailService.sendEmail(mailOptions).then(async (res) => {
            if (res) {
                let params = {
                    PolicyMasterID: data?.Data?.PolicyMasterID,
                    SecurityUserID: data.SecurityUserID
                }
                await updateEmailCount(params).then((data) => {
                    if (data) {
                        // console.log("data", data);
                    }
                }).catch((err) => {
                    console.log("error", err);
                });

                resolve({
                    "success": true,
                    "data": {},
                    "message": 'Email send successfully',
                    "messageType": 'success',
                });

            } else {
                reject({
                    "success": false,
                    "data": {},
                    "message": "Email send failed!",
                    "messageType": "error"
                });
            }
        }).catch(err => {
            reject({
                "success": false,
                "data": {},
                "message": err,
                "messageType": "error"
            });
        });
    })
}

function sendEmailByAllPolicy(data) {
    return new Promise(async (resolve, reject) => {
        let params = {
            SecurityUserID: data.SecurityUserID
        }

        PolicyCtrl.getPolicy(params).then(async (response) => {
            if (response && response?.data?.length) {
                const PolicyData = response?.data;
                for (var i = 0; i < PolicyData?.length; i++) {
                    if (PolicyData[i]?.CareOffMasterEmailOne) {
                        let message = `<h2>Insurance Policy Confirmation</h2>

                        <p>Dear ${PolicyData[i]?.CareOffMaster},</p>
                    
                        <p>We are pleased to confirm the details of your insurance policy with satyam consultants  for your ${PolicyData[i]?.MakeMaster} ${data?.Data?.ModelMaster}.</p>
                    
                        <h3>Policy Details:</h3>
                        <ul>
                            <li>Policy Number: ${PolicyData[i]?.PolicyNo}</li>
                            <li>Policy Start Date: ${PolicyData[i]?.DateOfBooking}</li>
                            <li>Policy End Date: ${PolicyData[i]?.DueDate}</li>
                            <li>Type of Policy: ${PolicyData[i]?.TypeOfPolicyMaster}</li>
                            <li>Subtype of Policy: ${PolicyData[i]?.SubTypeOfPolicyMaster}</li>
                            <li>Insurance Company: ${PolicyData[i]?.NameOfInsuranceCompanyMaster}</li>
                            <li>Sum Insured: ${PolicyData[i]?.SumInsured}</li>
                            <li>Premium Amount (Total): ${PolicyData[i]?.Total}</li>
                        </ul>
                    
                        <h3>Insured Details:</h3>
                        <ul>
                            <li>Name: ${PolicyData[i]?.NameOfInsured}</li>
                            <li>Registration Number: ${PolicyData[i]?.RegistrationNo}</li>
                            <li>Model: ${PolicyData[i]?.ModelMaster}</li>
                        </ul>
                    
                        <h3>Policy Documents:</h3>
                        <ul>
                            <li><a href="${PolicyData[i]?.PolicyOneDocument}">Policy One Document</a></li>
                            <li><a href="${PolicyData[i]?.PolicyTwoDocument}">Policy Two Document</a></li>
                            <li><a href="${PolicyData[i]?.EndorsementDocument}">Endorsement Document</a></li>
                            <li><a href="${PolicyData[i]?.OtherDocument}">Other Document</a></li>
                        </ul>
                    
                        <h3>Payment Information:</h3>
                        <ul>
                            <li>Payment Mode: ${PolicyData[i]?.PaymentModeMaster}</li>
                        </ul>
                    
                        <p>Please review the policy details, and if you have any questions or need further assistance, feel free to contact us at info@satyamconsultant.com.</p>
                    
                        <p>Thank you for choosing satyam consultants for your insurance needs. We appreciate your business and look forward to serving you.</p>
                    
                        <p>Sincerely,<br>
                        Satyam Consultants<br></p>`;

                        const mailOptions = {
                            toEmail: [PolicyData[i]?.CareOffMasterEmailOne, PolicyData[i]?.CareOffMasterEmailTwo], // Recipient's email address
                            subject: `Insurance Policy Confirmation: Your Policy ID #${PolicyData[i]?.PolicyNo}`, // Subject of the email
                            text: '', // Plain text body of the email
                            html: message
                        };

                        await emailService.sendEmail(mailOptions).then(async (res) => {
                            if (res) {
                                let params = {
                                    PolicyMasterID: PolicyData[i]?.PolicyMasterID,
                                    SecurityUserID: data.SecurityUserID
                                }
                                await updateEmailCount(params).then((data) => {
                                    if (data) {
                                        // console.log("data", data);
                                    }
                                }).catch((err) => {
                                    console.log("error", err);
                                });
                            } else {
                                reject({
                                    "success": false,
                                    "data": {},
                                    "message": "Email send failed!",
                                    "messageType": "error"
                                });
                            }
                        }).catch(err => {
                            reject({
                                "success": false,
                                "data": {},
                                "message": err,
                                "messageType": "error"
                            });
                        });
                    }
                }
                resolve({
                    "success": true,
                    "data": {},
                    "message": 'Email send successfully',
                    "messageType": 'success',
                });
            }
        }).catch((err) => {
            res.json(err);
        });
    })
}

module.exports = PolicyCtrl;
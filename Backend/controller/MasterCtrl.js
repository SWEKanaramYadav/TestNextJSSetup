const Common = require('../common');
const connection = require('../MySqlConnect');
const bcrypt = require('bcrypt');

var MasterCtrl = {
    //Care Off MasterCtrl
    getCareOffMasterList: getCareOffMasterList,
    getCareOffMaster: getCareOffMaster,
    AddUpdateCareOffMaster: AddUpdateCareOffMaster,
    getCareOffMasterById: getCareOffMasterById,
    DeleteCareOffMaster: DeleteCareOffMaster,

    // Insurance Company Master Ctrl
    getInsuranceCompanyMaster: getInsuranceCompanyMaster,
    getInsuranceCompanyList: getInsuranceCompanyList,
    AddUpdateInsuranceCompanyMaster: AddUpdateInsuranceCompanyMaster,
    getInsuranceCompanyMasterById: getInsuranceCompanyMasterById,
    DeleteInsuranceCompanyMaster: DeleteInsuranceCompanyMaster,

    // Mode Of Payment Master Ctrl
    getModeOfPaymentMaster: getModeOfPaymentMaster,
    getModeOfPaymentMasterList: getModeOfPaymentMasterList,
    AddUpdateModeOfPaymentMaster: AddUpdateModeOfPaymentMaster,
    getModeOfPaymentMasterById: getModeOfPaymentMasterById,
    DeleteModeOfPaymentMaster: DeleteModeOfPaymentMaster,

    // Type Of Policy Master Ctrl
    getTypeOfPolicyMaster: getTypeOfPolicyMaster,
    getTypeOfPolicyMasterList: getTypeOfPolicyMasterList,
    getSubTypeOfPolicyMasterList: getSubTypeOfPolicyMasterList,
    getMulipleSubTypeOfPolicyMasterList: getMulipleSubTypeOfPolicyMasterList,
    AddUpdateTypeOfPolicyMaster: AddUpdateTypeOfPolicyMaster,
    getTypeOfPolicyMasterById: getTypeOfPolicyMasterById,
    DeleteTypeOfPolicyMaster: DeleteTypeOfPolicyMaster,
    DeleteSubTypeOfPolicyMaster: DeleteSubTypeOfPolicyMaster,
    AddUpdateTypeOfSubPolicyMaster: AddUpdateTypeOfSubPolicyMaster,

    // Commission Master Ctrl 
    getTypeOfSubPolicyMasterByType: getTypeOfSubPolicyMasterByType,
    getCommissionMaster: getCommissionMaster,
    AddUpdateCommissionMaster: AddUpdateCommissionMaster,
    getCommissionMasterById: getCommissionMasterById,
    DeleteCommissionMaster: DeleteCommissionMaster,

    // Insured Master Ctrl
    getInsuredMaster: getInsuredMaster,
    getNameOfInsuredList: getNameOfInsuredList,
    AddUpdateInsuredMaster: AddUpdateInsuredMaster,
    getInsuredMasterById: getInsuredMasterById,
    DeleteInsuredMaster: DeleteInsuredMaster,

    // Make Master Ctrl
    getMakeMaster: getMakeMaster,
    getMakeMasterList: getMakeMasterList,
    AddUpdateMakeMaster: AddUpdateMakeMaster,
    getMakeMasterById: getMakeMasterById,
    DeleteMakeMaster: DeleteMakeMaster,

    // Designation Master Ctrl
    getDesignationMaster: getDesignationMaster,
    getDesignationMasterList: getDesignationMasterList,
    AddUpdateDesignationMaster: AddUpdateDesignationMaster,
    getDesignationMasterById: getDesignationMasterById,
    DeleteDesignationMaster: DeleteDesignationMaster,

    // PolicyStatus Master Ctrl
    getPolicyStatusMaster: getPolicyStatusMaster,
    getPolicyStatusMasterList: getPolicyStatusMasterList,
    AddUpdatePolicyStatusMaster: AddUpdatePolicyStatusMaster,
    getPolicyStatusMasterById: getPolicyStatusMasterById,
    DeletePolicyStatusMaster: DeletePolicyStatusMaster,

    // Model Master Ctrl
    getModelMaster: getModelMaster,
    getModelMasterList: getModelMasterList,
    AddUpdateModelMaster: AddUpdateModelMaster,
    getModelMasterById: getModelMasterById,
    DeleteModelMaster: DeleteModelMaster,

    // Bank Master Ctrl
    getBankMaster: getBankMaster,
    AddUpdateBankMaster: AddUpdateBankMaster,
    DeleteBankMaster: DeleteBankMaster,

    // Client Master Ctrl
    getClientMaster: getClientMaster,
    AddUpdateClientMaster: AddUpdateClientMaster,
    getClientMasterById: getClientMasterById,
    DeleteClientMaster: DeleteClientMaster,

    // Group Master Ctrl
    getGroupMaster: getGroupMaster,
    AddUpdateGroupMaster: AddUpdateGroupMaster,
    getGroupMasterById: getGroupMasterById,
    DeleteGroupMaster: DeleteGroupMaster,

    // AgencyCode Master Ctrl
    getAgencyCodeMaster: getAgencyCodeMaster,
    getAgencyCodeMasterList: getAgencyCodeMasterList,
    AddUpdateAgencyCodeMaster: AddUpdateAgencyCodeMaster,
    getAgencyCodeMasterById: getAgencyCodeMasterById,
    DeleteAgencyCodeMaster: DeleteAgencyCodeMaster,

    // SubAgentCode Master Ctrl
    getSubAgentCodeMaster: getSubAgentCodeMaster,
    getSubAgentCodeMasterList: getSubAgentCodeMasterList,
    AddUpdateSubAgentCodeMaster: AddUpdateSubAgentCodeMaster,
    getSubAgentCodeMasterById: getSubAgentCodeMasterById,
    DeleteSubAgentCodeMaster: DeleteSubAgentCodeMaster,

    // Fund Ulip Ctrl
    getFundUlipMaster: getFundUlipMaster,
    AddUpdateFundUlipMaster: AddUpdateFundUlipMaster,
    DeleteFundUlipMaster: DeleteFundUlipMaster,
    
    // Sum Assured Rider Master Ctrl
    getSumAssuredRiderMaster: getSumAssuredRiderMaster,
    AddUpdateSumAssuredRiderMaster: AddUpdateSumAssuredRiderMaster,
    DeleteSumAssuredRiderMaster: DeleteSumAssuredRiderMaster,

    // Policy plan Master Ctrl
    getPolicyPlanMaster: getPolicyPlanMaster,
    getPolicyPlanList: getPolicyPlanList,
    AddUpdatePolicyPlanMaster: AddUpdatePolicyPlanMaster,
    getPolicyPlanMasterById: getPolicyPlanMasterById,
    DeletePolicyPlanMaster: DeletePolicyPlanMaster,

    // Branch master
    getBranchMaster: getBranchMaster,
    AddUpdateBranchMaster: AddUpdateBranchMaster,
    DeleteBranchMaster: DeleteBranchMaster,
}

//Care Off Master
function getCareOffMasterList(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spGetCareOffMasterList()`;
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
                        "message": "Get care off master list successfully",
                        "messageType": "success"
                    });
                } else {
                    resolve({
                        "success": true,
                        "data": [],
                        "message": "Care off master empty",
                        "messageType": "success"
                    });
                }
            }
        });
    })
};

function getCareOffMaster(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spGetCareOffMaster('${data.SecurityUserID}')`;
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
                    for (let i = 0; i < response.length; i++) {
                        for (let j = 0; j < responseOne.length; j++) {
                            if (response[i]?.CareOffMasterID === responseOne[j].CareOffMasterID) {
                                tempData.push(responseOne[j])
                            }
                        }
                        response[i].CareOffPerson = tempData;
                        tempData = []
                    }
                    resolve({
                        "success": true,
                        "data": response,
                        "message": "Get care off master successfully",
                        "messageType": "success"
                    });
                } else {
                    resolve({
                        "success": true,
                        "data": [],
                        "message": "Care off master empty",
                        "messageType": "success"
                    });
                }
            }
        });
    })
};

function getCareOffMasterById(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spGetCareOffMasterById('${data.CareOffMasterID}')`;
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
                        "message": "Get care off master successfully",
                        "messageType": "success"
                    });
                } else {
                    resolve({
                        "success": true,
                        "data": [],
                        "message": "Care off master empty",
                        "messageType": "success"
                    });
                }

            }
        });
    })
};

function AddUpdateCareOffMaster(data) {

    return new Promise((resolve, reject) => {
        let Query = `CALL spAddUpdateCareOffMaster('${JSON.stringify(data)}')`;
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

function DeleteCareOffMaster(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spDeleteCareOffMaster('${data.CareOffMasterID}', '${data.SecurityUserID}')`;
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

//InsuranceCompany Master
function getInsuranceCompanyMaster(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spGetInsuranceCompanyMaster('${data.SecurityUserID}', '${data.OrganizationID}')`;
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
                    for (let i = 0; i < response.length; i++) {
                        for (let j = 0; j < responseOne.length; j++) {
                            if (response[i]?.InsuranceCompanyMasterID === responseOne[j].InsuranceCompanyMasterID) {
                                tempData.push(responseOne[j])
                            }
                        }
                        response[i].InsuranceCompanyPerson = tempData;
                        tempData = []
                    }
                    resolve({
                        "success": true,
                        "data": response,
                        "message": "Get insurance company master successfully",
                        "messageType": "success"
                    });
                } else {
                    resolve({
                        "success": true,
                        "data": [],
                        "message": "Insurance company master empty",
                        "messageType": "success"
                    });
                }
            }
        });
    })
};

function getInsuranceCompanyList(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spGetInsuranceCompanyList()`;
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
                    //         if (response[i]?.InsuranceCompanyMasterID === responseOne[j].InsuranceCompanyMasterID) {
                    //             tempData.push(responseOne[j])
                    //         }
                    //     }
                    //     response[i].InsuranceCompanyPerson = tempData;
                    //     tempData = []
                    // }
                    resolve({
                        "success": true,
                        "data": response,
                        "message": "Get insurance company master list successfully",
                        "messageType": "success"
                    });
                } else {
                    resolve({
                        "success": true,
                        "data": [],
                        "message": "Insurance company list is empty",
                        "messageType": "success"
                    });
                }
            }
        });
    })
};

function getInsuranceCompanyMasterById(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spGetInsuranceCompanyMasterById('${data.InsuranceCompanyMasterID}')`;
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
                    response[0].InsuranceCompanyPerson = Res[1]?.length ? Res[1] : [];
                    resolve({
                        "success": true,
                        "data": response,
                        "message": "Get insurance company master successfully",
                        "messageType": "success"
                    });
                } else {
                    resolve({
                        "success": true,
                        "data": [],
                        "message": "Insurance company master empty",
                        "messageType": "success"
                    });
                }

            }
        });
    })
};

function AddUpdateInsuranceCompanyMaster(data) {

    return new Promise((resolve, reject) => {
        let Query = `CALL spAddUpdateInsuranceCompanyMaster('${JSON.stringify(data)}')`;
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

function DeleteInsuranceCompanyMaster(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spDeleteInsuranceCompanyMaster('${data.InsuranceCompanyMasterID}', '${data.SecurityUserID}')`;
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


//Payment Method 
function getModeOfPaymentMaster(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spGetModeOfPaymentMaster('${data.SecurityUserID}', '${data.OrganizationID}')`;
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
                        "message": "Get mode of payment master successfully",
                        "messageType": "success"
                    });
                } else {
                    resolve({
                        "success": true,
                        "data": [],
                        "message": "Payment mode master empty",
                        "messageType": "success"
                    });
                }
            }
        });
    })
};

function getModeOfPaymentMasterList(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spGetModeOfPaymentMasterList('${data.SecurityUserID}', '${data.OrganizationID}')`;
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
                        "message": "Get mode of payment master list successfully",
                        "messageType": "success"
                    });
                } else {
                    resolve({
                        "success": true,
                        "data": [],
                        "message": "Payment mode master list empty",
                        "messageType": "success"
                    });
                }
            }
        });
    })
};

function getModeOfPaymentMasterById(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spGetModeOfPaymentMasterById('${data.ModeOfPaymentMasterID}')`;
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
                        "message": "Get mode of payment master successfully",
                        "messageType": "success"
                    });
                } else {
                    resolve({
                        "success": true,
                        "data": [],
                        "message": "Payment mode master empty",
                        "messageType": "success"
                    });
                }

            }
        });
    })
};

function AddUpdateModeOfPaymentMaster(data) {

    return new Promise((resolve, reject) => {
        let Query = `CALL spAddUpdateModeOfPaymentMaster('${JSON.stringify(data)}')`;
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

function DeleteModeOfPaymentMaster(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spDeleteModeOfPaymentMaster('${data.ModeOfPaymentMasterID}', '${data.SecurityUserID}')`;
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

//Type Of Policy Method 
function getTypeOfPolicyMaster(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spGetTypeOfPolicyMaster('${data.SecurityUserID}', '${data?.OrganizationID}')`;
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
                    for (let i = 0; i < response.length; i++) {
                        for (let j = 0; j < responseOne.length; j++) {
                            if (response[i]?.TypeOfPolicyMasterID === responseOne[j].TypeOfPolicyMasterID) {
                                tempData.push(responseOne[j])
                            }
                        }
                        response[i].TypeOfSubPolicy = tempData;
                        tempData = []
                    }

                    resolve({
                        "success": true,
                        "data": response,
                        "message": "Get policy type master successfully",
                        "messageType": "success"
                    });
                } else {
                    resolve({
                        "success": true,
                        "data": [],
                        "message": "Policy type master empty",
                        "messageType": "success"
                    });
                }
            }
        });
    })
};

function getTypeOfPolicyMasterList(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spGetTypeOfPolicyMasterList()`;
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
                    // 

                    resolve({
                        "success": true,
                        "data": response,
                        "message": "Get policy type master list successfully",
                        "messageType": "success"
                    });
                } else {
                    resolve({
                        "success": true,
                        "data": [],
                        "message": "Policy type master list is empty",
                        "messageType": "success"
                    });
                }
            }
        });
    })
};

function getSubTypeOfPolicyMasterList(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spGetSubTypeOfPolicyMasterList('${data.TypeOfPolicyMasterID}')`;
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
                    // 

                    resolve({
                        "success": true,
                        "data": response,
                        "message": "Get policy type master list successfully",
                        "messageType": "success"
                    });
                } else {
                    resolve({
                        "success": true,
                        "data": [],
                        "message": "Policy type master list is empty",
                        "messageType": "success"
                    });
                }
            }
        });
    })
};

function getMulipleSubTypeOfPolicyMasterList(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spGetMulipleSubTypeOfPolicyMasterList('${data.TypeOfPolicyMasterID}')`;
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
                    // 

                    resolve({
                        "success": true,
                        "data": response,
                        "message": "Get policy type master list successfully",
                        "messageType": "success"
                    });
                } else {
                    resolve({
                        "success": true,
                        "data": [],
                        "message": "Policy type master list is empty",
                        "messageType": "success"
                    });
                }
            }
        });
    })
};

function getTypeOfPolicyMasterById(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spGetTypeOfPolicyMasterById('${data.TypeOfPolicyMasterID}')`;
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
                    for (let i = 0; i < response.length; i++) {
                        for (let j = 0; j < responseOne.length; j++) {
                            if (response[i]?.TypeOfPolicyMasterID === responseOne[j].TypeOfPolicyMasterID) {
                                tempData.push(responseOne[j])
                            }
                        }
                        response[i].TypeOfSubPolicy = tempData;
                        tempData = []
                    }
                    resolve({
                        "success": true,
                        "data": response,
                        "message": "Get policy type master successfully",
                        "messageType": "success"
                    });
                } else {
                    resolve({
                        "success": true,
                        "data": [],
                        "message": "Policy type master empty",
                        "messageType": "success"
                    });
                }

            }
        });
    })
};

function AddUpdateTypeOfPolicyMaster(data) {

    return new Promise((resolve, reject) => {
        let Query = `CALL spAddUpdateTypeOfPolicyMaster('${JSON.stringify(data)}')`;
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

function DeleteTypeOfPolicyMaster(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spDeleteTypeOfPolicyMaster('${data.TypeOfPolicyMasterID}', '${data.SecurityUserID}')`;
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
};

function DeleteSubTypeOfPolicyMaster(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spDeleteSubTypeOfPolicyMaster('${data.SubTypeOfPolicyMasterID}', '${data.SecurityUserID}')`;
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
};

function AddUpdateTypeOfSubPolicyMaster(data) {

    return new Promise((resolve, reject) => {
        let Query = `CALL spAddUpdateTypeOfSubPolicyMaster('${JSON.stringify(data)}')`;
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

function getTypeOfSubPolicyMasterByType(data) {
    return new Promise((resolve, reject) => {
        let Query = `SELECT tospm.TypeOfSubPolicyMasterID AS value,tospm.Name AS label FROM TypeOfSubPolicyMaster tospm WHERE tospm.Status = 'Active' AND tospm.TypeOfPolicyMasterID = '${data.TypeOfPolicyMasterID}' ORDER BY tospm.CreatedOn DESC;`;
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
                    resolve({
                        "success": true,
                        "data": response,
                        "message": "Get policy sub type master successfully",
                        "messageType": "success"
                    });
                } else {
                    resolve({
                        "success": true,
                        "data": [],
                        "message": "Policy sub type master empty",
                        "messageType": "success"
                    });
                }

            }
        });
    })
};

//Commission API Here
function getCommissionMaster(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spGetCommissionMaster('${data.SecurityUserID}')`;
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
                    let response = {
                        CommissionMasterData: Res[0],
                        CommissionODBasicTPTerrData: Res[1]
                    };
                    resolve({
                        "success": true,
                        "data": response,
                        "message": "Get commission master successfully",
                        "messageType": "success"
                    });
                } else {
                    resolve({
                        "success": true,
                        "data": [],
                        "message": "Commission master empty",
                        "messageType": "success"
                    });
                }
            }
        });
    })
};

function AddUpdateCommissionMaster(data) {

    return new Promise((resolve, reject) => {
        let Query = `CALL spAddUpdateCommissionMaster('${JSON.stringify(data)}')`;
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

function getCommissionMasterById(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spGetCommissionMasterById('${data.CommissionMasterID}')`;
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
                    let response = {
                        CommissionData: Res[0],
                        CommissionODBasicTPTerr: Res[1]
                    };

                    resolve({
                        "success": true,
                        "data": response,
                        "message": "Get commission master successfully",
                        "messageType": "success"
                    });
                } else {
                    resolve({
                        "success": true,
                        "data": [],
                        "message": "Commission master empty",
                        "messageType": "success"
                    });
                }

            }
        });
    })
};

function DeleteCommissionMaster(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spDeleteCommissionMaster('${data.CommissionMasterID}', '${data.SecurityUserID}')`;
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

//Insured Method 
function getInsuredMaster(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spGetInsuredMaster('${data.SecurityUserID}')`;
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
                        "message": "Get insured master successfully",
                        "messageType": "success"
                    });
                } else {
                    resolve({
                        "success": true,
                        "data": [],
                        "message": "Insured master empty",
                        "messageType": "success"
                    });
                }
            }
        });
    })
};

function getNameOfInsuredList(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spGetNameOfInsuredList()`;
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
                        "message": "Get insured master list is successfully",
                        "messageType": "success"
                    });
                } else {
                    resolve({
                        "success": true,
                        "data": [],
                        "message": "Insured master list is empty",
                        "messageType": "success"
                    });
                }
            }
        });
    })
};

function getInsuredMasterById(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spGetInsuredMasterById('${data.InsuredMasterID}')`;
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
                        "message": "Get insured master successfully",
                        "messageType": "success"
                    });
                } else {
                    resolve({
                        "success": true,
                        "data": [],
                        "message": "Insured master empty",
                        "messageType": "success"
                    });
                }

            }
        });
    })
};

function AddUpdateInsuredMaster(data) {

    return new Promise((resolve, reject) => {
        let Query = `CALL spAddUpdateInsuredMaster('${JSON.stringify(data)}')`;
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

function DeleteInsuredMaster(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spDeleteInsuredMaster('${data.InsuredMasterID}', '${data.SecurityUserID}')`;
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
};


//Make Method 
function getMakeMaster(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spGetMakeMaster('${data.SecurityUserID}')`;
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
                        "message": "Get make master successfully",
                        "messageType": "success"
                    });
                } else {
                    resolve({
                        "success": true,
                        "data": [],
                        "message": "Make master empty",
                        "messageType": "success"
                    });
                }
            }
        });
    })
};

function getMakeMasterList(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spGetMakeMasterList('${data.SecurityUserID}')`;
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
                        "message": "Get make master list successfully",
                        "messageType": "success"
                    });
                } else {
                    resolve({
                        "success": true,
                        "data": [],
                        "message": "Make master list is empty",
                        "messageType": "success"
                    });
                }
            }
        });
    })
};

function getMakeMasterById(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spGetMakeMasterById('${data.MakeMasterID}')`;
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
                        "message": "Get make master successfully",
                        "messageType": "success"
                    });
                } else {
                    resolve({
                        "success": true,
                        "data": [],
                        "message": "Make master empty",
                        "messageType": "success"
                    });
                }

            }
        });
    })
};

function AddUpdateMakeMaster(data) {

    return new Promise((resolve, reject) => {
        let Query = `CALL spAddUpdateMakeMaster('${JSON.stringify(data)}')`;
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

function DeleteMakeMaster(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spDeleteMakeMaster('${data.MakeMasterID}', '${data.SecurityUserID}')`;
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
};

function getModelMaster(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spGetModelMaster('${data.SecurityUserID}')`;
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
                        "message": "Get model master successfully",
                        "messageType": "success"
                    });
                } else {
                    resolve({
                        "success": true,
                        "data": [],
                        "message": "Model master empty",
                        "messageType": "success"
                    });
                }
            }
        });
    })
};

function getModelMasterList(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spGetModelMasterList('${data.MakeMasterID}')`;
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
                        "message": "Get model master list successfully",
                        "messageType": "success"
                    });
                } else {
                    resolve({
                        "success": true,
                        "data": [],
                        "message": "Model master list is empty",
                        "messageType": "success"
                    });
                }
            }
        });
    })
};

function getModelMasterById(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spGetModelMasterById('${data.ModelMasterID}')`;
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
                        "message": "Get model master successfully",
                        "messageType": "success"
                    });
                } else {
                    resolve({
                        "success": true,
                        "data": [],
                        "message": "Model master empty",
                        "messageType": "success"
                    });
                }

            }
        });
    })
};

function AddUpdateModelMaster(data) {

    return new Promise((resolve, reject) => {
        let Query = `CALL spAddUpdateModelMaster('${JSON.stringify(data)}')`;
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

function DeleteModelMaster(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spDeleteModelMaster('${data.ModelMasterID}', '${data.SecurityUserID}')`;
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
};

//Designation Method 
function getDesignationMaster(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spGetDesignationMaster('${data.SecurityUserID}', '${data.OrganizationID}')`;
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
                        "message": "Get designation master successfully",
                        "messageType": "success"
                    });
                } else {
                    resolve({
                        "success": true,
                        "data": [],
                        "message": "Designation master empty",
                        "messageType": "success"
                    });
                }
            }
        });
    })
};

function getDesignationMasterList(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spGetDesignationMasterList('${data.SecurityUserID}', '${data.OrganizationID}')`;
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
                        "message": "Get designation master list successfully",
                        "messageType": "success"
                    });
                } else {
                    resolve({
                        "success": true,
                        "data": [],
                        "message": "Designation master list is empty",
                        "messageType": "success"
                    });
                }
            }
        });
    })
};

function getDesignationMasterById(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spGetDesignationMasterById('${data.DesignationMasterID}')`;
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
                        "message": "Get designation master successfully",
                        "messageType": "success"
                    });
                } else {
                    resolve({
                        "success": true,
                        "data": [],
                        "message": "Designation master empty",
                        "messageType": "success"
                    });
                }

            }
        });
    })
};

function AddUpdateDesignationMaster(data) {

    return new Promise((resolve, reject) => {
        let Query = `CALL spAddUpdateDesignationMaster('${JSON.stringify(data)}')`;
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

function DeleteDesignationMaster(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spDeleteDesignationMaster('${data.DesignationMasterID}', '${data.SecurityUserID}')`;
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
};

//Bank master Ctrl 
function getBankMaster(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spGetBankMaster('${data.SecurityUserID}', '${data.OrganizationID}')`;
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
                        "message": "Get Bank master successfully",
                        "messageType": "success"
                    });
                } else {
                    resolve({
                        "success": true,
                        "data": [],
                        "message": "Bank master empty",
                        "messageType": "success"
                    });
                }
            }
        });
    })
};

function AddUpdateBankMaster(data) {

    return new Promise((resolve, reject) => {
        let Query = `CALL spAddUpdateBankMaster('${JSON.stringify(data)}')`;
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

function DeleteBankMaster(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spDeleteBankMaster('${data.BankMasterID}', '${data.SecurityUserID}')`;
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
};


//PolicyStatus Method 
function getPolicyStatusMaster(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spGetPolicyStatusMaster('${data.SecurityUserID}', '${data.OrganizationID}')`;
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
                        "message": "Get policy status master successfully",
                        "messageType": "success"
                    });
                } else {
                    resolve({
                        "success": true,
                        "data": [],
                        "message": "Policy status master empty",
                        "messageType": "success"
                    });
                }
            }
        });
    })
};

function getPolicyStatusMasterList(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spGetPolicyStatusMasterList('${data.SecurityUserID}', '${data.OrganizationID}')`;
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
                        "message": "Get policy status master list successfully",
                        "messageType": "success"
                    });
                } else {
                    resolve({
                        "success": true,
                        "data": [],
                        "message": "Policy status master list is empty",
                        "messageType": "success"
                    });
                }
            }
        });
    })
};

function getPolicyStatusMasterById(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spGetPolicyStatusMasterById('${data.PolicyStatusMasterID}')`;
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
                        "message": "Get policy status master successfully",
                        "messageType": "success"
                    });
                } else {
                    resolve({
                        "success": true,
                        "data": [],
                        "message": "Policy status master empty",
                        "messageType": "success"
                    });
                }

            }
        });
    })
};

function AddUpdatePolicyStatusMaster(data) {

    return new Promise((resolve, reject) => {
        let Query = `CALL spAddUpdatePolicyStatusMaster('${JSON.stringify(data)}')`;
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

function DeletePolicyStatusMaster(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spDeletePolicyStatusMaster('${data.PolicyStatusMasterID}', '${data.SecurityUserID}')`;
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
};

//Client master Ctrl 
function getClientMaster(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spGetClientMaster('${data.SecurityUserID}', '${data.OrganizationID}')`;
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
                        "message": "Get Client master successfully",
                        "messageType": "success"
                    });
                } else {
                    resolve({
                        "success": true,
                        "data": [],
                        "message": "Client master empty",
                        "messageType": "success"
                    });
                }
            }
        });
    })
};

function AddUpdateClientMaster(data) {

    return new Promise((resolve, reject) => {
        let Query = `CALL spAddUpdateClientMaster('${JSON.stringify(data)}')`;
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

function getClientMasterById(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spGetClientMasterById('${data.ClientMasterID}')`;
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
                        "message": "Get client master successfully",
                        "messageType": "success"
                    });
                } else {
                    resolve({
                        "success": true,
                        "data": [],
                        "message": "Client master empty",
                        "messageType": "success"
                    });
                }

            }
        });
    })
};

function DeleteClientMaster(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spDeleteClientMaster('${data.ClientMasterID}', '${data.SecurityUserID}')`;
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
};

//Group master Ctrl 
function getGroupMaster(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spGetGroupMaster('${data.SecurityUserID}', '${data.OrganizationID}')`;
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
                        "message": "Get group master successfully",
                        "messageType": "success"
                    });
                } else {
                    resolve({
                        "success": true,
                        "data": [],
                        "message": "Group master empty",
                        "messageType": "success"
                    });
                }
            }
        });
    })
};

function AddUpdateGroupMaster(data) {

    return new Promise((resolve, reject) => {
        let Query = `CALL spAddUpdateGroupMaster('${JSON.stringify(data)}')`;
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

function getGroupMasterById(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spGetGroupMasterById('${data.GroupMasterID}')`;
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
                        "message": "Get group master successfully",
                        "messageType": "success"
                    });
                } else {
                    resolve({
                        "success": true,
                        "data": [],
                        "message": "Group master empty",
                        "messageType": "success"
                    });
                }

            }
        });
    })
};

function DeleteGroupMaster(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spDeleteGroupMaster('${data.GroupMasterID}', '${data.SecurityUserID}')`;
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
};


//AgencyCode Method 
function getAgencyCodeMaster(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spGetAgencyCodeMaster('${data.SecurityUserID}', '${data.OrganizationID}')`;
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
                        "message": "Get agency code master successfully",
                        "messageType": "success"
                    });
                } else {
                    resolve({
                        "success": true,
                        "data": [],
                        "message": "Agency code master empty",
                        "messageType": "success"
                    });
                }
            }
        });
    })
};

function getAgencyCodeMasterList(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spGetAgencyCodeMasterList('${data.SecurityUserID}', '${data.OrganizationID}')`;
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
                        "message": "Get agency code master list successfully",
                        "messageType": "success"
                    });
                } else {
                    resolve({
                        "success": true,
                        "data": [],
                        "message": "Agency code master list is empty",
                        "messageType": "success"
                    });
                }
            }
        });
    })
};

function getAgencyCodeMasterById(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spGetAgencyCodeMasterById('${data.AgencyCodeMasterID}')`;
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
                        "message": "Get agency code master successfully",
                        "messageType": "success"
                    });
                } else {
                    resolve({
                        "success": true,
                        "data": [],
                        "message": "Agency code master empty",
                        "messageType": "success"
                    });
                }

            }
        });
    })
};

function AddUpdateAgencyCodeMaster(data) {

    return new Promise((resolve, reject) => {
        let Query = `CALL spAddUpdateAgencyCodeMaster('${JSON.stringify(data)}')`;
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

function DeleteAgencyCodeMaster(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spDeleteAgencyCodeMaster('${data.AgencyCodeMasterID}', '${data.SecurityUserID}')`;
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
};

//SubAgentCode Method 
function getSubAgentCodeMaster(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spGetSubAgentCodeMaster('${data.SecurityUserID}', '${data.OrganizationID}')`;
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
                        "message": "Get Sub agent code master successfully",
                        "messageType": "success"
                    });
                } else {
                    resolve({
                        "success": true,
                        "data": [],
                        "message": "Sub agent code master empty",
                        "messageType": "success"
                    });
                }
            }
        });
    })
};

function getSubAgentCodeMasterList(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spGetSubAgentCodeMasterList('${data.SecurityUserID}', '${data.OrganizationID}')`;
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
                        "message": "Get sub agent code master list successfully",
                        "messageType": "success"
                    });
                } else {
                    resolve({
                        "success": true,
                        "data": [],
                        "message": "Sub agent code master list is empty",
                        "messageType": "success"
                    });
                }
            }
        });
    })
};

function getSubAgentCodeMasterById(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spGetSubAgentCodeMasterById('${data.SubAgentCodeMasterID}')`;
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
                        "message": "Get sub agent code master successfully",
                        "messageType": "success"
                    });
                } else {
                    resolve({
                        "success": true,
                        "data": [],
                        "message": "Sub agent code master empty",
                        "messageType": "success"
                    });
                }

            }
        });
    })
};

function AddUpdateSubAgentCodeMaster(data) {

    return new Promise((resolve, reject) => {
        let Query = `CALL spAddUpdateSubAgentCodeMaster('${JSON.stringify(data)}')`;
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

function DeleteSubAgentCodeMaster(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spDeleteSubAgentCodeMaster('${data.SubAgentCodeMasterID}', '${data.SecurityUserID}')`;
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
};

//Fund Ulip Master Ctrl 
function getFundUlipMaster(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spGetFundUlipMaster('${data.SecurityUserID}', '${data.OrganizationID}')`;
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
                        "message": "Get Fund Ulip master successfully",
                        "messageType": "success"
                    });
                } else {
                    resolve({
                        "success": true,
                        "data": [],
                        "message": "Fund Ulip master empty",
                        "messageType": "success"
                    });
                }
            }
        });
    })
};

function AddUpdateFundUlipMaster(data) {

    return new Promise((resolve, reject) => {
        let Query = `CALL spAddUpdateFundUlipMaster('${JSON.stringify(data)}')`;
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

function DeleteFundUlipMaster(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spDeleteFundUlipMaster('${data.FundUlipMasterID}', '${data.SecurityUserID}')`;
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
};

// Sum Assured Rider Master Ctrl
function getSumAssuredRiderMaster(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spGetSumAssuredRiderMaster('${data.SecurityUserID}', '${data.OrganizationID}')`;
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
                        "message": "Get sum assured rider master successfully",
                        "messageType": "success"
                    });
                } else {
                    resolve({
                        "success": true,
                        "data": [],
                        "message": "Sum assured rider master empty",
                        "messageType": "success"
                    });
                }
            }
        });
    })
};

function AddUpdateSumAssuredRiderMaster(data) {

    return new Promise((resolve, reject) => {
        let Query = `CALL spAddUpdateSumAssuredRiderMaster('${JSON.stringify(data)}')`;
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

function DeleteSumAssuredRiderMaster(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spDeleteSumAssuredRiderMaster('${data.SumAssuredRiderMasterID}', '${data.SecurityUserID}')`;
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
};

//PolicyPlan Master
function getPolicyPlanMaster(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spGetPolicyPlanMaster('${data.SecurityUserID}', '${data.OrganizationID}')`;
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
                        "message": "Get policy plan master successfully",
                        "messageType": "success"
                    });
                } else {
                    resolve({
                        "success": true,
                        "data": [],
                        "message": "Policy plan master empty",
                        "messageType": "success"
                    });
                }
            }
        });
    })
};

function getPolicyPlanList(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spGetPolicyPlanList()`;
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
                        "message": "Get policy plan master list successfully",
                        "messageType": "success"
                    });
                } else {
                    resolve({
                        "success": true,
                        "data": [],
                        "message": "Policy plan list is empty",
                        "messageType": "success"
                    });
                }
            }
        });
    })
};

function getPolicyPlanMasterById(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spGetPolicyPlanMasterById('${data.PolicyPlanMasterID}')`;
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
                    response[0].PolicyPlanPerson = Res[1]?.length ? Res[1] : [];
                    resolve({
                        "success": true,
                        "data": response,
                        "message": "Get policy plan master successfully",
                        "messageType": "success"
                    });
                } else {
                    resolve({
                        "success": true,
                        "data": [],
                        "message": "Policy plan master empty",
                        "messageType": "success"
                    });
                }

            }
        });
    })
};

function AddUpdatePolicyPlanMaster(data) {

    return new Promise((resolve, reject) => {
        let Query = `CALL spAddUpdatePolicyPlanMaster('${JSON.stringify(data)}')`;
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

function DeletePolicyPlanMaster(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spDeletePolicyPlanMaster('${data.PolicyPlanMasterID}', '${data.SecurityUserID}')`;
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

//Branch master Ctrl 
function getBranchMaster(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spGetBranchMaster('${data.SecurityUserID}', '${data.OrganizationID}')`;
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
                        "message": "Get Branch master successfully",
                        "messageType": "success"
                    });
                } else {
                    resolve({
                        "success": true,
                        "data": [],
                        "message": "Branch master empty",
                        "messageType": "success"
                    });
                }
            }
        });
    })
};

function AddUpdateBranchMaster(data) {

    return new Promise((resolve, reject) => {
        let Query = `CALL spAddUpdateBranchMaster('${JSON.stringify(data)}')`;
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

function DeleteBranchMaster(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spDeleteBranchMaster('${data.BranchMasterID}', '${data.SecurityUserID}')`;
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
};

module.exports = MasterCtrl;
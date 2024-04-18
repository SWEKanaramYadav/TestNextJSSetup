const Common = require('../common');
const connection = require('../MySqlConnect');
const bcrypt = require('bcrypt');
const otpService = require('./../services/otpService');

var CommonCtrl = {
    AddUpdateDataTableOrder: AddUpdateDataTableOrder,
    getDataTableOrderList: getDataTableOrderList,
    getStringMap: getStringMap,
    sendVerifyOTP: sendVerifyOTP,
    verifyPhoneEmailOTP: verifyPhoneEmailOTP,
    verifyAadharOTP: verifyAadharOTP

}

function AddUpdateDataTableOrder(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spAddUpdateDataTableOrder('${JSON.stringify(data)}')`;
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
                    "success": Res[0][0].MessageType == "error" ? false : true,
                    "data": [],
                    "message": Res[0][0].Message,
                    "messageType": Res[0][0].MessageType
                });
            }
        });
    })
}

function getDataTableOrderList(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spGetDataTableOrderList('${data.Type}', '${data.OrganizationID}')`;
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
                        "message": "Get data table order list successfully",
                        "messageType": "success"
                    });
                } else {
                    resolve({
                        "success": true,
                        "data": [],
                        "message": "Data table order list is empty",
                        "messageType": "success"
                    });
                }
            }
        });
    })
}

function getStringMap(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spGetStringMap('${data.Type}')`;
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
                        "message": "Get string map list successfully",
                        "messageType": "success"
                    });
                } else {
                    resolve({
                        "success": true,
                        "data": [],
                        "message": "String map list is empty",
                        "messageType": "success"
                    });
                }
            }
        });
    })
}

function sendVerifyOTP(data) {
    return new Promise(async (resolve, reject) => {
        if (data?.Type === 'Email') {
            const otp = await otpService.sendOTPVerifyEmail(data.Value);
            if (otp) {
                resolve({
                    "success": true,
                    "data": {
                        OTP: otp?.otp,
                        ExpirationTime: otp?.expirationTime,
                        OTPType: data?.Type,
                    },
                    "message": 'OTP send on email successfully',
                    "messageType": 'success',
                });
            } else {
                reject({
                    "success": false,
                    "data": {},
                    "message": "OTP send on email failed!",
                    "messageType": "error"
                });
            }
        } else if (data?.Type === 'Phone') {
            const otp = await otpService.sendOTPVerfiyPhone(data.Value);
            if (otp) {
                resolve({
                    "success": true,
                    "data": {
                        OTP: otp?.otp,
                        ExpirationTime: otp?.expirationTime,
                        OTPType: data?.Type,
                    },
                    "message": 'OTP send on phone successfully',
                    "messageType": 'success',
                });
            } else {
                reject({
                    "success": false,
                    "data": {},
                    "message": "OTP send on phone failed!",
                    "messageType": "error"
                });
            }
        } else if (data?.Type === 'Aadhaar') {
            const res = await otpService.verifyAadhaar(data.Value);
            if (res.success) {
                resolve(res);
            } else {
                reject(res);
            }
        }
    })
}

function verifyPhoneEmailOTP(data) {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await otpService.verifyOTP(data.Value, data.OTP);
            if (res.success) {
                resolve(res);
            } else {
                reject(res);
            }
        } catch (error) {
            reject({
                "success": false,
                "data": {},
                "message": error,
                "messageType": "error"
            });
        }

    })
}

function verifyAadharOTP(data) {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await otpService.verifyAadhaarOTP(data.RefId, data.OTP);
            if (res.success) {
                resolve(res);
            } else {
                reject(res);
            }
        } catch (error) {
            reject({
                "success": false,
                "data": {},
                "message": error,
                "messageType": "error"
            });
        }

    })
}

module.exports = CommonCtrl;
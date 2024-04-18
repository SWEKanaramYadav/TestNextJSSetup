var Common = require('./../common');
const bcrypt = require('bcrypt');
var connection = require('../MySqlConnect');
var async = require('async');
const Cryptr = require('cryptr');
const { v4: uuidv4 } = require('uuid');
const emailService = require('../services/emailService');
const userCtrl = require('./UserCtrl');
const config = require('../config/email.config');
const { passwordHash, comparePassword } = require('../handlers/password');
const { generateAccessToken, generateRefreshToken, verifyToken } = require('../handlers/jwt');
const otpService = require('./../services/otpService');
const { response } = require('express');

var AuthenticationCtrl = {
    Login: Login,
    Register: Register,
    forgotPassword: forgotPassword,
    resetPassword: resetPassword,
    checkUrl: checkUrl,
    sendOTP: sendOTP,
    verifyOTP: verifyOTP,
    sendEmployeeOTP: sendEmployeeOTP,
    addOTPVerification: addOTPVerification,
    getOTPVerification: getOTPVerification
}

function Login(data) {
    return new Promise(async (resolve, reject) => {
        if (data?.IsOTPLogin) {

            console.log("Login with Otp", data?.IsOTPLogin);
        } else {
            let userLoginQuery = `CALL spLogin('${data.UserName}');`;
            connection.query(userLoginQuery, (Err, Res) => {

                if (Err) {
                    reject({
                        "success": false,
                        "data": {
                            accessToken: null,
                            refreshToken: null,
                            data: []
                        },
                        "message": "server error " + Err,
                        "messageType": "error"
                    });
                }
                else if (Res[0].length === 0) {
                    reject({
                        "success": false,
                        "data": {
                            accessToken: null,
                            refreshToken: null,
                            data: []
                        },
                        "message": "Invalid Username/Password",
                        "messageType": "error"
                    });
                } else {

                    const isMatch = comparePassword(data.Password, Res[0][0].Password);


                    if (!isMatch) {
                        reject({
                            "success": false,
                            "data": {
                                accessToken: null,
                                refreshToken: null,
                                data: []
                            },
                            "message": "Incorrect Password",
                            "messageType": "error"
                        });
                    }

                    if (!Res[0][0].UserStatus) {
                        reject({
                            "success": false,
                            "data": {
                                accessToken: null,
                                refreshToken: null,
                                data: []
                            },
                            "message": "Account is deactivated. Please contact to admin",
                            "messageType": "error"
                        });
                    }

                    const payload = { userId: Res[0][0].SecurityUserID }

                    const accessToken = generateAccessToken(payload);
                    const refreshToken = generateRefreshToken(payload);

                    let userLoginQuery = `CALL spUpdateRefreshToken('${Res[0][0].SecurityUserID}', '${refreshToken}');`;
                    connection.query(userLoginQuery, (Error, Response) => {
                        if (Error) {
                            reject({
                                "success": false,
                                "data": {
                                    accessToken: null,
                                    refreshToken: null,
                                    data: []
                                },
                                "message": "server error " + Error,
                                "messageType": "error"
                            });
                        } else {
                            resolve({
                                "success": true,
                                "data": {
                                    accessToken: accessToken,
                                    refreshToken: refreshToken,
                                    data: Res[0][0]
                                },
                                "message": 'Login successfully',
                                "messageType": 'success',
                            });
                        }
                    });

                }
            })
        }
    })
}

function sendOTP(data) {
    return new Promise(async (resolve, reject) => {
        let isData = Common.isPhoneNumberOrEmail(data.Username);

        var chekUserQuery = `CALL spCheckUser('${data.Username}', '${isData}', '${data.Device}')`;

        connection.query(chekUserQuery, async (Err, Response) => {
            if (Err) {
                reject({
                    "success": false,
                    "data": {},
                    "messageType": 'error',
                    "message": Err
                })
            }
            else {
                const res = Response[0][0];
                if (res?.IsUserFound) {
                    if (!res?.IsUserEmployee) {
                        if (isData === 'Email Address') {
                            const otp = await otpService.sendOTPByEmail(data.Username);
                            if (otp) {
                                resolve({
                                    "success": true,
                                    "data": {
                                        OTP: otp?.otp,
                                        ExpirationTime: otp?.expirationTime,
                                        IsCareOffMember: res?.IsCareOffMember ? true : false,
                                        OTPType: isData === 'Email Address' ? 'Email' : 'Phone',
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
                        } else if (isData === 'Phone Number') {
                            const otp = await otpService.sendOTPByPhone(data.Username);
                            if (otp) {
                                resolve({
                                    "success": true,
                                    "data": {
                                        OTP: otp?.otp,
                                        ExpirationTime: otp?.expirationTime,
                                        IsCareOffMember: res?.IsCareOffMember ? true : false,
                                        OTPType: isData === 'Email Address' ? 'Email' : 'Phone',
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
                        } else {
                            reject({
                                "success": false,
                                "data": {},
                                "message": "Invalid Email/Phone Number",
                                "messageType": "error"
                            });
                        }
                    }

                } else {
                    reject({
                        "success": false,
                        "data": {},
                        "message": "Your Account does not exist",
                        "messageType": "error"
                    });
                }
            }
        });

    })
}

function sendEmployeeOTP(data) {
    return new Promise(async (resolve, reject) => {
        let isData = Common.isPhoneNumberOrEmail(data.Username);

        var chekUserQuery = `CALL spCheckUser('${data.Username}', '${isData}', '${data.Device}')`;

        connection.query(chekUserQuery, async (Err, Response) => {
            if (Err) {
                reject({
                    "success": false,
                    "data": {},
                    "messageType": 'error',
                    "message": Err
                })
            }
            else {
                const res = Response[0][0];
                if (res?.IsUserFound) {
                    let securityData = await getSecurityData();
                    securityData = securityData.data;
                    const filteredSecurityData = securityData.filter(item => item.IsEnable === 1);

                    if (filteredSecurityData.length > 0) {
                        const genratedOtp = otpService.generateOTP();
                        const expirationTime = Date.now() + 600000;
                        for (const item of filteredSecurityData) {

                            if (item.Type === 'Email') {
                                const otp = await otpService.sendOTPByPhoneEmail(item.Item, genratedOtp, expirationTime, item.Type);
                                if (otp) {
                                    resolve({
                                        "success": true,
                                        "data": {
                                            OTP: otp?.Otp,
                                            ExpirationTime: otp?.expirationTime,
                                            IsCareOffMember: res?.IsCareOffMember ? true : false,
                                            OTPType: 'Both',
                                        },
                                        "message": 'OTP sent on email successfully',
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
                            } else if (item.Type === 'Phone') {
                                const otp = await otpService.sendOTPByPhoneEmail(item.Item, genratedOtp, expirationTime, item.Type);
                                if (otp) {
                                    resolve({
                                        "success": true,
                                        "data": {
                                            OTP: otp?.Otp,
                                            ExpirationTime: otp?.expirationTime,
                                            IsCareOffMember: res?.IsCareOffMember ? true : false,
                                            OTPType: 'Both',
                                        },
                                        "message": 'OTP sent on phone successfully',
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
                            } else {
                                reject({
                                    "success": false,
                                    "data": {},
                                    "message": "Invalid Email/Phone Number",
                                    "messageType": "error"
                                });
                            }
                        }
                    } else {
                        reject({
                            "success": false,
                            "data": {},
                            "message": "OTP send failed!",
                            "messageType": "error"
                        });
                    }
                } else {
                    reject({
                        "success": false,
                        "data": {},
                        "message": "Your Account does not exist",
                        "messageType": "error"
                    });
                }
            }
        });

    })
}

function verifyOTP(data) {
    return new Promise(async (resolve, reject) => {
        // let isData = Common.isPhoneNumberOrEmail(data.Username);
        const isVerifyData = await otpService.verifyOTP(data.Username, data?.OTP);
        // OTPType
        if (isVerifyData?.success) {
            if (!data?.IsCareOffMember) {
                let userDetailsQuery = `CALL spGetUserDetailsByEmailAndPhone('${data.Username}', '${data?.OTPType}');`;
                connection.query(userDetailsQuery, (Error, Response) => {
                    if (Error) {
                        reject({
                            "success": false,
                            "data": {
                                accessToken: null,
                                refreshToken: null,
                                data: []
                            },
                            "message": "server error " + Error,
                            "messageType": "error"
                        });
                    } else {

                        const payload = { userId: Response[0][0]?.SecurityUserID }

                        const accessToken = generateAccessToken(payload);
                        const refreshToken = generateRefreshToken(payload);

                        let userLoginQuery = `CALL spUpdateRefreshToken('${Response[0][0]?.SecurityUserID}', '${refreshToken}');`;
                        connection.query(userLoginQuery, (Error, Res) => {
                            if (Error) {
                                reject({
                                    "success": false,
                                    "data": {
                                        accessToken: null,
                                        refreshToken: null,
                                        data: []
                                    },
                                    "message": "server error " + Error,
                                    "messageType": "error"
                                });
                            } else {
                                resolve({
                                    "success": true,
                                    "data": {
                                        accessToken: accessToken,
                                        refreshToken: refreshToken,
                                        data: Response[0][0]
                                    },
                                    "message": 'OTP verify, login successfully',
                                    "messageType": 'success',
                                });
                            }
                        });
                    }
                });

            } else {
                console.log("Datatatat", data);
                let userDetailsQuery = `CALL spCreateCareOffUserByEmailAndPhone('${data?.Username}', '${data?.OTPType}');`;
                connection.query(userDetailsQuery, (Error, Response) => {
                    if (Error) {
                        reject({
                            "success": false,
                            "data": {
                                accessToken: null,
                                refreshToken: null,
                                data: []
                            },
                            "message": "server error " + Error,
                            "messageType": "error"
                        });
                    } else {

                        // console.log("Resssss", Response);

                        let userDetailsQuery = `CALL spGetUserDetailsByEmailAndPhone('${Response[0][0].Entity}', '${Response[0][0]?.EntityType}');`;
                        connection.query(userDetailsQuery, (Error, Res) => {
                            if (Error) {
                                reject({
                                    "success": false,
                                    "data": {
                                        accessToken: null,
                                        refreshToken: null,
                                        data: []
                                    },
                                    "message": "server error " + Error,
                                    "messageType": "error"
                                });
                            } else {

                                // console.log("Ressssssss", Res);

                                const payload = { userId: Res[0][0]?.SecurityUserID }

                                const accessToken = generateAccessToken(payload);
                                const refreshToken = generateRefreshToken(payload);

                                let userLoginQuery = `CALL spUpdateRefreshToken('${Res[0][0]?.SecurityUserID}', '${refreshToken}');`;
                                connection.query(userLoginQuery, (Error, ResData) => {
                                    if (Error) {
                                        reject({
                                            "success": false,
                                            "data": {
                                                accessToken: null,
                                                refreshToken: null,
                                                data: []
                                            },
                                            "message": "server error " + Error,
                                            "messageType": "error"
                                        });
                                    } else {
                                        resolve({
                                            "success": true,
                                            "data": {
                                                accessToken: accessToken,
                                                refreshToken: refreshToken,
                                                data: Res[0][0]
                                            },
                                            "message": 'OTP verify, login successfully',
                                            "messageType": 'success',
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        } else {
            reject({
                "success": false,
                "data": {},
                "message": isVerifyData?.message,
                "messageType": "error"
            });
        }

    })
}

function Register(data) {
    return new Promise((resolve, reject) => {

        data.password = passwordHash(data.Password);

        var userQuery = `CALL spAddUpdateUser('${JSON.stringify(data)}')`;
        connection.query(userQuery, (Err, Response) => {

            if (Err) {
                reject({
                    "success": false,
                    "data": [],
                    "message": Err,
                    "messageType": Err,
                })
            }
            else {
                if (Response.length > 0) {
                    resolve({
                        "success": Response[0][0].MessageType == "error" ? false : true,
                        "data": [],
                        "message": Response[0][0].Message,
                        "messageType": Response[0][0].MessageType
                    });
                }
                else {
                    resolve({
                        "success": false,
                        "data": [],
                        "message": "Something bad happened ",
                        "messageType": "error"
                    })
                }
            }
        });
    });
}

function checkUrl(data) {
    return new Promise((resolve, reject) => {


        var chekUserQuery = `CALL spcheckToken('${data.Token}')`;
        connection.query(chekUserQuery, (checkUserErr, checkUserRows) => {

            if (checkUserErr) {
                reject({
                    "success": false,
                    "error": checkUserErr,
                    "message": Common.ExceptionMsg
                })
            }
            else {
                if (checkUserRows.length > 0) {

                    resolve({
                        "success": true,
                        "data": checkUserRows[0][0],
                        "message": checkUserRows[0][0].message,
                        "messagetype": checkUserRows[0][0].messagetype
                    });



                }
                else {
                    resolve({
                        "success": false,
                        "message": "User not found",
                        "messagetype": "error"
                    })
                }
            }
        })


    })
}

function forgotPassword(data) {
    return new Promise((resolve, reject) => {
        if (!Common.isEmpty(data.LoginID)) {

            var chekUserQuery = `CALL spCheckEmail('${data.LoginID}')`;

            connection.query(chekUserQuery, async (checkUserErr, checkUserRows) => {
                if (checkUserErr) {
                    reject({
                        "success": false,
                        "error": checkUserErr,
                        "message": Common.ExceptionMsg
                    })
                }
                else {
                    if (checkUserRows.length && checkUserRows[0].length) {
                        const token = uuidv4();
                        let Query = `CALL spAddResetPasswordToken('${checkUserRows[0][0].SecurityUserID}','${token}')`;
                        connection.query(Query, (Err, Res) => {
                            if (Err) {
                                reject(Err);
                            }
                            else {
                                console.log("Update Token")
                            }
                        });

                        const resetUrl = `${config.linkOrigin}/reset-password?token=${token}`;

                        const mailOptions = {
                            toEmail: checkUserRows[0][0].Email, // Recipient's email address
                            subject: 'Reset Password - Dheera Advisor', // Subject of the email
                            text: '', // Plain text body of the email
                            html: `<p>Dear User,</p>
                            <pre>Please click the below link to reset your password, the link will be valid for 1 day:</pre>
                            <pre><a href="${resetUrl}">${resetUrl}</a></pre>
                            <h5>Thanks</h5>
                            <h6>Dheera Advisor</h6>`
                        };

                        await emailService.sendEmail(mailOptions);

                        resolve({
                            "success": true,
                            "message": "Email Send Successfully",
                            "messagetype": "success"
                        });
                    }
                    else {
                        resolve({
                            "success": false,
                            "message": "User not found",
                            "messagetype": "error"
                        })
                    }
                }
            })

        } else {
            reject({
                "success": false,
                "error": "empty email",
                "message": "email required"
            })
        }
    })
}

function resetPassword(data) {
    return new Promise((resolve, reject) => {
        if (!Common.isEmpty(data.NewPassword)) {

            var chekUserQuery = `SELECT * from SecurityUser WHERE ResetPasswordToken ='${data.Token}'`;

            connection.query(chekUserQuery, (checkUserErr, checkUserRows) => {


                if (checkUserErr) {
                    reject({
                        "success": false,
                        "error": checkUserErr,
                        "message": Common.ExceptionMsg
                    })
                }
                else {
                    if (checkUserRows.length > 0) {

                        bcrypt.genSalt(10, function (err, salt) {
                            if (err) {
                                return next(err);
                            }
                            bcrypt.hash(data.NewPassword, salt, function (err, hash) {
                                if (err) {
                                    return next(err);
                                }

                                data.NewPassword = hash;

                                let Query = `CALL spResetPassword('${data.NewPassword}','${data.Token}')`;
                                connection.query(Query, (updateErr, updateQuery) => {

                                    if (updateErr) {
                                        reject({

                                            "success": false,
                                            "message": Common.ExceptionMsg,
                                            "messagetype": "error",
                                            "err": updateErr,
                                        });
                                    } else {

                                        resolve({
                                            "success": true,
                                            "message": updateQuery[0][0].message,
                                            "messagetype": updateQuery[0][0].messageType
                                        });
                                    }
                                });
                            });
                        });
                    }
                    else {
                        resolve({
                            "success": false,
                            "message": "Token Not Found",
                            "messagetype": "error"
                        })
                    }
                }
            })

        }
    })
}

function getSecurityData(data) {
    return new Promise(async (resolve, reject) => {

        var chekUserQuery = `CALL spGetSecurity('')`;

        connection.query(chekUserQuery, async (Err, Response) => {
            if (Err) {
                reject({
                    "success": false,
                    "data": {},
                })
            }
            else {
                const res = Response[0];
                resolve({
                    "success": true,
                    "data": res
                });
            }
        });

    })
}

function addOTPVerification(email, otp, otp) {

    return new Promise((resolve, reject) => {
        let Query = `CALL spAddOTPVerification('${email}', '${otp}', '${otp}')`;
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

function getOTPVerification(email) {

    return new Promise((resolve, reject) => {
        let Query = `CALL spGetOTPVerification('${email}')`;
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
                if (Res?.length) {
                    resolve({
                        "success": true,
                        "data": Res[0],
                        "message": 'Get OTP successfully',
                        "messageType": 'success'
                    })
                } else {
                    resolve({
                        "success": true,
                        "data": [],
                        "message": 'Get OTP successfully',
                        "messageType": 'success'
                    })
                }
            }
        })
    })

};

module.exports = AuthenticationCtrl;
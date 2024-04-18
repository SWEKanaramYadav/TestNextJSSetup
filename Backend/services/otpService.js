// const twilio = require('twilio');

// // Replace these values with your Twilio account SID, authentication token, and Twilio phone number
// const twilioAccountSid = 'your_twilio_account_sid';
// const twilioAuthToken = 'your_twilio_auth_token';
// const twilioPhoneNumber = 'your_twilio_phone_number';

const axios = require('axios');
const emailService = require('./emailService');
const connection = require('../MySqlConnect');

// Generate a random 6-digit OTP
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// Store generated OTPs and their expiration times
const otps = new Map();

// Send OTP via SMS using Twilio
async function sendOTPByPhone(phoneNumber) {

    // Generate a new OTP
    const otp = generateOTP();
    const expirationTime = Date.now() + 600000; // OTP expires in 10 minutes

    // Store OTP and its expiration time
    // otps.set(phoneNumber, { otp, expirationTime });
    await addOTPVerification(phoneNumber, otp, expirationTime);

    try {
        var url = 'http://sms2.pentesthouse.com/app/smsapi/index.php?key=5652F7AE5B22F9&campaign=13446&routeid=3&type=text&contacts=91' + phoneNumber + '&senderid=PLIIND&msg=Your OTP is ' + otp + ' for user authentication login/signup. - PLIIND&template_id=1707169926814714346&pe_id=1701169694038699027';
        await axios.get(url).then((response) => {
            console.log(response);
        }).catch(error => {
            console.log(error);
        });

        return { otp, expirationTime };
    } catch (error) {
        console.error(error);
        throw new Error('Failed to send OTP.');
    }
};

// Function to send OTP via email
async function sendOTPByEmail(emailAddress) {
    try {
        // Generate a new OTP
        const otp = generateOTP();
        const expirationTime = Date.now() + 600000; // OTP expires in 10 minutes

        // Store OTP and its expiration time
        // otps.set(emailAddress, { otp, expirationTime });
        await addOTPVerification(emailAddress, otp, expirationTime);


        const mailOptions = {
            toEmail: emailAddress, // Recipient's email address
            subject: `Your Dheera Advisor's Team Login OTP`, // Subject of the email
            text: '', // Plain text body of the email
            html: `<p>Dear User,</p>
            <p>Your One-Time Password (OTP) for Dheera Advisor's Team login is: <strong>${otp}</strong>.</p>
            <p>Use this OTP to access your account securely.</p>
            <p>This OTP is valid for a single login session and will expire shortly after use. If you did not request this OTP or need assistance, please contact our support team immediately.</p>
            <p>Best regards,<br>Dheera Advisor's Team</p>`
        };

        await emailService.sendEmail(mailOptions);
        return { otp, expirationTime }
    }
    catch (error) {
        console.error(error);
        throw new Error('Failed to send OTP.');
    }
};

async function verifyOTP(number, otp) {
    try {
        const phoneNumber = number;
        const userOTP = otp;

        const res = await getOTPVerification(phoneNumber);

        const storedOTP = res.data.length ? res.data[0] : null;

        if (!storedOTP || Date.now() > storedOTP.expirationTime) {
            return { success: false, message: 'OTP has expired or is invalid.', messageType: 'error' };
        } else if (userOTP === storedOTP.otp) {
            // otps.delete(phoneNumber);
            return { success: true, message: 'OTP verify successfully', messageType: 'success' };
        } else {
            return { success: false, message: 'Incorrect OTP.', messageType: 'error' };
        }
    } catch (error) {
        console.error(error);
        throw new Error('Failed to verify OTP.');
    }
}

async function addOTPVerification(email, otp, expirationTime) {

    return new Promise((resolve, reject) => {
        let Query = `CALL spAddOTPVerification('${email}', '${otp}', '${expirationTime}')`;
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

async function getOTPVerification(email) {

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


async function sendOTPByPhoneEmail(senderId, Otp, expirationTime, Type) {
    try {
        if (Type === 'Email') {
            // Generate a new OTP

            // Store OTP and its expiration time
            // otps.set(emailAddress, { otp, expirationTime });
            await addOTPVerification(senderId, Otp, expirationTime);


            const mailOptions = {
                toEmail: senderId, // Recipient's email address
                subject: `Your Dheera Advisor's Login OTP`, // Subject of the email
                text: '', // Plain text body of the email
                html: `<p>Dear User,</p>
                <p>Your One-Time Password (OTP) for Dheera Advisor's login is: <strong>${Otp}</strong>.</p>
                <p>Use this OTP to access your account securely.</p>
                <p>This OTP is valid for a single login session and will expire shortly after use. If you did not request this OTP or need assistance, please contact our support team immediately.</p>
                <p>Best regards,<br>Dheera Advisor's Team</p>`
            };

            await emailService.sendEmail(mailOptions);
            return { Otp, expirationTime }
        }
        else {
            await addOTPVerification(senderId, Otp, expirationTime);

            try {
                var url = 'http://sms2.pentesthouse.com/app/smsapi/index.php?key=5652F7AE5B22F9&campaign=13446&routeid=3&type=text&contacts=91' + senderId + '&senderid=PLIIND&msg=Your OTP is ' + Otp + ' for user authentication login/signup. - PLIIND&template_id=1707169926814714346&pe_id=1701169694038699027';
                await axios.get(url).then((response) => {
                    console.log(response);
                }).catch(error => {
                    console.log(error);
                });

                return { Otp, expirationTime };
            } catch (error) {
                console.error(error);
                throw new Error('Failed to send OTP.');
            }
        }
    }
    catch (error) {
        console.error(error);
        throw new Error('Failed to send OTP.');
    }
};

async function sendOTPVerfiyPhone(phoneNumber) {

    // Generate a new OTP
    const otp = generateOTP();
    const expirationTime = Date.now() + 600000; // OTP expires in 10 minutes

    // Store OTP and its expiration time
    // otps.set(phoneNumber, { otp, expirationTime });
    await addOTPVerification(phoneNumber, otp, expirationTime);

    try {
        var url = 'http://sms2.pentesthouse.com/app/smsapi/index.php?key=5652F7AE5B22F9&campaign=13446&routeid=3&type=text&contacts=91' + phoneNumber + '&senderid=PLIIND&msg=Your OTP is ' + otp + ' for user authentication login/signup. - PLIIND&template_id=1707169926814714346&pe_id=1701169694038699027';
        await axios.get(url).then((response) => {
            console.log(response);
        }).catch(error => {
            console.log(error);
        });

        return { otp, expirationTime };
    } catch (error) {
        console.error(error);
        throw new Error('Failed to send OTP.');
    }
};

async function sendOTPVerifyEmail(emailAddress) {
    try {
        // Generate a new OTP
        const otp = generateOTP();
        const expirationTime = Date.now() + 600000; // OTP expires in 10 minutes

        // Store OTP and its expiration time
        // otps.set(emailAddress, { otp, expirationTime });
        await addOTPVerification(emailAddress, otp, expirationTime);

        const mailOptions = {
            toEmail: emailAddress, // Recipient's email address
            subject: `Your One-Time Password (OTP) for Dheera Advisor's Email Verification`, // Subject of the email
            text: '', // Plain text body of the email
            html: `<p>Dear User,</p>
            <p>Your One-Time Password (OTP) for email verification is: <strong>${otp}</strong>.</p>
            <p>Please use this OTP to complete the email verification process and ensure the security of your account. It is important to note that this OTP is valid for a single verification session and will expire shortly after use.</p>
            <p>If you did not request this OTP or require any assistance during the verification process, please do not hesitate to contact our support team immediately. We are here to help and ensure a smooth experience for you.</p>
            <p>Best regards,<br>Dheera Advisor's Team</p>`
        };

        await emailService.sendEmail(mailOptions);
        return { otp, expirationTime }
    }
    catch (error) {
        console.error(error);
        throw new Error('Failed to send OTP.');
    }
};

async function verifyAadhaar(AadhaarNo) {
    try {
        if (AadhaarNo) {
            const response = await axios.post(
                "https://api.apiclub.in/api/v1/aadhaar_v2/send_otp",
                {
                    aadhaar_no: AadhaarNo,
                },
                {
                    headers: {
                        Referer: "https://portlinksindia.com",
                        "API-KEY": "5ead8b172325649453d4f113ca05f0a8",
                    },
                }
            );
            if (response.data.code === 200) {
                const msg = "OTP send successfully on registered mobile no";

                return {
                    success: true,
                    message: msg,
                    data: response.data.response,
                }
            } else {
                return {
                    success: false,
                    message: response.data.response,
                }
            }
        } else {
            return {
                success: false,
                message: "Invalid parameters",
            }
        }
    } catch (error) {
        console.error(error);
        throw new Error('Some error occurred');
    }
}

async function verifyAadhaarOTP(RefId, OTP) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.post(
                "https://api.apiclub.in/api/v1/aadhaar_v2/submit_otp",
                {
                    ref_id: RefId,
                    otp: OTP,
                },
                {
                    headers: {
                        Referer: "https://portlinksindia.com",
                        "API-KEY": "5ead8b172325649453d4f113ca05f0a8",
                    },
                }
            );

            if (response.data.code === 200) {
                const msg = "Aadhaar No verified successfully";
                resolve({
                    success: true,
                    message: msg,
                    data: response.data.response,
                });
            } else {
                reject({
                    success: false,
                    message: response.data.response,
                });
            }
        } catch (error) {
            reject({
                success: false,
                message: "Some error occurred",
            });
        }
    });
}

module.exports = {
    sendOTPByPhone, sendOTPByEmail, verifyOTP, sendOTPByPhoneEmail, generateOTP, sendOTPVerfiyPhone, sendOTPVerifyEmail, verifyAadhaar, verifyAadhaarOTP
};

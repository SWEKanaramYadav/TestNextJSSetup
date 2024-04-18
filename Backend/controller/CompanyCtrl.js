const Common = require('../common');
const { passwordHash } = require('../handlers/password');
const connection = require('../MySqlConnect');
const bcrypt = require('bcrypt');

var CompanyCtrl = {
    getCompany: getCompany,
    AddUpdateCompany: AddUpdateCompany,
    getCompanyById: getCompanyById,
    DeleteCompany: DeleteCompany,
}

function getCompany(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spGetCompany('${data.SecurityUserID}')`;
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
                        "message": "Get company successfully",
                        "messageType": "success"
                    });
                } else {
                    resolve({
                        "success": true,
                        "data": [],
                        "message": "Company master empty",
                        "messageType": "success"
                    });
                }
            }
        });
    })
};

function getCompanyById(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spGetCompanyById('${data.OrganizationID}')`;
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
                        "message": "Get company successfully",
                        "messageType": "success"
                    });
                } else {
                    resolve({
                        "success": true,
                        "data": [],
                        "message": "Company empty",
                        "messageType": "success"
                    });
                }

            }
        });
    })
};

function AddUpdateCompany(data) {

    return new Promise((resolve, reject) => {
        
        data.Password = passwordHash(data.Password);

        
        let Query = `CALL spAddUpdateCompany('${JSON.stringify(data)}')`;
        // console.log("data", Query);
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

function DeleteCompany(data) {
    return new Promise((resolve, reject) => {
        let Query = `CALL spDeleteCompany('${data.OrganizationID}', '${data.SecurityUserID}')`;
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

module.exports = CompanyCtrl;
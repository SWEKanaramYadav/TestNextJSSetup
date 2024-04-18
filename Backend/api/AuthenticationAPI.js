var express = require('express');
var Common = require('../common');
var AuthenticationCtrl = require('./../controller/AuthenticationCtrl');
var router = express.Router();
var { authMiddleware } = require('../middleware/authMiddleware')
var moment = require('moment');
var multer = require("multer");
var fs = require('fs');

let fileArray = [];
var Storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let dir = 'document/';
        //  + Common.PropertyMediaPath;
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        // let inputData = Common.isEmpty(req.body.data) === false ? JSON.parse(req.body.data) : req.body;
        let fileName = moment().format('DD_MM_YYYY_HH_mm_ss') + "KYCDOC." + file.originalname.split('.').pop();

        fileArray.push({ DocumentName: fileName, DocumentType: file.fieldname })
        cb(null, fileName);

    }
});
var upload = multer({
    storage: Storage
})

router.post('/Login', function (req, res) {
    var Data = req.body;

    AuthenticationCtrl.Login(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

router.post('/sendOTP', function (req, res) {
    var Data = req.body;

    AuthenticationCtrl.sendOTP(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

router.post('/sendEmployeeOTP', function (req, res) {
    var Data = req.body;

    AuthenticationCtrl.sendEmployeeOTP(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

router.post('/verifyOTP', function (req, res) {
    var Data = req.body;

    AuthenticationCtrl.verifyOTP(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

router.post('/Register', upload.any(), function (req, res) {
    // var Data = req.body;

    var Data = Common.isEmpty(req.body.Data) === false ? JSON.parse(req.body.Data) : req.body;
    Data.KYCAttachment = fileArray;
    fileArray = [];
    AuthenticationCtrl.Register(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});


router.post('/checkUrl', function (req, res) {
    var Data = req.body;
    AuthenticationCtrl.checkUrl(Data).then((data) => {

        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

router.post('/forgotPassword', function (req, res) {
    var Data = req.body;

    AuthenticationCtrl.forgotPassword(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

router.post('/resetPassword', function (req, res) {
    var Data = req.body;

    AuthenticationCtrl.resetPassword(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});



module.exports = router;
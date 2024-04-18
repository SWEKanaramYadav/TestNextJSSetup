var express = require('express');
var CommonCtrl = require('./../controller/CommonCtrl.js');
var router = express.Router();

router.post('/AddUpdateDataTableOrder', function (req, res) {
    var Data = req.body;

    CommonCtrl.AddUpdateDataTableOrder(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

router.post('/getDataTableOrderList', function (req, res) {
    var Data = req.body;

    CommonCtrl.getDataTableOrderList(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

router.post('/sendVerifyOTP', function (req, res) {
    var Data = req.body;

    CommonCtrl.sendVerifyOTP(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

router.post('/verifyPhoneEmailOTP', function (req, res) {
    var Data = req.body;

    CommonCtrl.verifyPhoneEmailOTP(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

router.post('/verifyAadharOTP', function (req, res) {
    var Data = req.body;

    CommonCtrl.verifyAadharOTP(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

router.post('/getStringMap', function (req, res) {
    var Data = req.body;

    CommonCtrl.getStringMap(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});


module.exports = router;
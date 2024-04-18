const DashboardCtrl = require('../controller/DashboardCtrl.js');
var express = require('express');
var Common = require('../common');
var router = express.Router();
var moment = require('moment');
var multer = require("multer");
var fs = require('fs');


// Policy API

router.post('/getDahboardData', function (req, res) {
    var Data = req.body;
    DashboardCtrl.getDahboardData(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

router.post('/getDashboardList', function (req, res) {
    var Data = req.body;
    DashboardCtrl.getDashboardList(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});
router.post('/getInsuredPolicyList', function (req, res) {
    var Data = req.body;
    DashboardCtrl.getInsuredPolicyList(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

router.post('/addWorkflow', function (req, res) {
    var Data = req.body;
    DashboardCtrl.addWorkflow(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

router.post('/DeleteWorkflow', function (req, res) {
    var Data = req.body;
    DashboardCtrl.DeleteWorkflow(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});


module.exports = router;
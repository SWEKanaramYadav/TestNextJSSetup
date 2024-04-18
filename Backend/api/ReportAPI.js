const ReportCtrl = require('../controller/ReportCtrl.js');
var express = require('express');
var Common = require('../common');

var router = express.Router();
var moment = require('moment');
var multer = require("multer");
var fs = require('fs');

router.post('/getCommisssionWithByforgettionReport', function (req, res) {
    var Data = req.body;
    ReportCtrl.getCommisssionWithByforgettionReport(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

router.post('/getCommisssionPayoutReport', function (req, res) {
    var Data = req.body;
    ReportCtrl.getCommisssionPayoutReport(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

router.post('/addUpdatePolicyCommissionReport', function (req, res) {
    var Data = req.body;
    ReportCtrl.addUpdatePolicyCommissionReport(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

module.exports = router;
var express = require('express');
var UserAccessCtrl = require('./../controller/UserAccessCtrl.js');
var router = express.Router();

router.post('/getUserAccess', function (req, res) {

    var Data = req.body;

    UserAccessCtrl.getUserAccess(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

router.post('/getEntityType', function (req, res) {
    var Data = req.body;
    UserAccessCtrl.getEntityType(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

router.post('/getUserTypeList', function (req, res) {
    var Data = req.body;
    UserAccessCtrl.getUserTypeList(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

router.get('/getMenuMaster', function (req, res) {

    UserAccessCtrl.getMenuMaster().then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

router.post('/addUpdateEntityType', function (req, res) {

    var Data = req.body;

    UserAccessCtrl.addUpdateEntityType(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

router.post('/getEntityTypeByID', function (req, res) {

    var Data = req.body;

    UserAccessCtrl.getEntityTypeByID(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

router.post('/getUserTypeByID', function (req, res) {

    var Data = req.body;

    UserAccessCtrl.getUserTypeByID(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

router.post('/addUpdateUserType', function (req, res) {

    var Data = req.body;

    UserAccessCtrl.addUpdateUserType(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

module.exports = router;
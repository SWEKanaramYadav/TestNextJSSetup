var express = require('express');
var UserCtrl = require('./../controller/UserCtrl.js');
var router = express.Router();

router.post('/getUser', function (req, res) {
    var Data = req.body;

    UserCtrl.getUser(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

router.post('/getUserById', function (req, res) {
    var Data = req.body;
    UserCtrl.getUserById(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

router.post('/deleteUser', function (req, res) {
    var Data = req.body;

    UserCtrl.deleteUser(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

router.post('/updateUserStatus', function (req, res) {
    var Data = req.body;

    UserCtrl.updateUserStatus(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

router.post('/activeInActiveUser', function (req, res) {
    var Data = req.body;

    UserCtrl.activeInActiveUser(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

router.post('/getUserRoleById', function (req, res) {
    var Data = req.body;
    UserCtrl.getUserRoleById(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

module.exports = router;
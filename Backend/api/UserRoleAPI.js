var UserRoleCtrl = require('./../controller/UserRoleCtrl.js');
var express = require('express');
var Common = require('../common');

var router = express.Router();
var fs = require('fs');




/** Code API */
router.post('/GetUserRoleById', function (req, res) {

    var Data = req.body;

    UserRoleCtrl.GetUserRoleById(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

router.post('/AddUpdateUserRole', function (req, res) {
    var Data = req.body;

    UserRoleCtrl.AddUpdateUserRole(Data).then((data) => {
        if (Data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    })
})


router.post('/DeleteUserRole', function (req, res) {
    var Data = req.body;

    UserRoleCtrl.DeleteUserRole(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

router.post('/GetUserRole', function (req, res) {
    var Data = req.body;
    UserRoleCtrl.GetUserRole(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});


module.exports = router;
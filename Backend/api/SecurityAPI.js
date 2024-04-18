var SecurityCtrl = require('./../controller/SecurityCtrl.js');
var express = require('express');
var Common = require('../common');

var router = express.Router();
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
        let fileName = moment().format('DD_MM_YYYY_HH_mm_ss') + "InsuredDocumet." + file.originalname.split('.').pop();

        fileArray.push({ DocumentName: fileName, DocumentType : file.fieldname })
        cb(null, fileName);

    }
});
var upload = multer({
    storage: Storage
})

router.post('/getSecurity', function (req, res) {
    var Data = req.body;
    SecurityCtrl.getSecurity(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

router.post('/AddUpdateSecurity', function (req, res) {
    var Data = req.body;

    SecurityCtrl.AddUpdateSecurity(Data).then((data) => {
        if (Data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    })
});

router.post('/DeleteSecurity', function (req, res) {
    var Data = req.body;

    SecurityCtrl.DeleteSecurity(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

router.post('/getSecurityById', function (req, res) {
    var Data = req.body;
    SecurityCtrl.getSecurityById(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

router.post('/updateIsEnableStatus', function (req, res) {
    var Data = req.body;
    SecurityCtrl.updateIsEnableStatus(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});



module.exports = router;
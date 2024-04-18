var CompanyCtrl = require('./../controller/CompanyCtrl.js');
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
        let fileName = moment().format('DD_MM_YYYY_HH_mm_ss') + "Image-"+ file.fieldname+"." + file.originalname.split('.').pop();

        fileArray.push({ DocumentName: fileName, DocumentType : file.fieldname })
        cb(null, fileName);
    }
});
var upload = multer({
    storage: Storage
})

router.post('/getCompany', function (req, res) {
    var Data = req.body;
    CompanyCtrl.getCompany(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

router.post('/AddUpdateCompany', upload.any(), function (req, res) {
    // var Data = req.body;

    var Data = Common.isEmpty(req.body.Data) === false ? JSON.parse(req.body.Data) : req.body;
    // console.log("fileArray", fileArray);
    // Data.ProjectVideo = fileArray.length ? fileArray[0].FileName : '';
    Data.ProfilePicture = fileArray.length && fileArray.filter(x=>x.DocumentType == "ProfilePicture").length ? fileArray.filter(x=>x.DocumentType == "ProfilePicture")[0].DocumentName : '';
    Data.CompanyLogo = fileArray.length && fileArray.filter(x=>x.DocumentType == "CompanyLogo").length ? fileArray.filter(x=>x.DocumentType == "CompanyLogo")[0].DocumentName : '';

    fileArray = [];

    CompanyCtrl.AddUpdateCompany(Data).then((data) => {
        if (Data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    })
});

router.post('/DeleteCompany', function (req, res) {
    var Data = req.body;

    CompanyCtrl.DeleteCompany(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

router.post('/getCompanyById', function (req, res) {
    var Data = req.body;
    CompanyCtrl.getCompanyById(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});



module.exports = router;
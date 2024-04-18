const PolicyCtrl = require('../controller/PolicyCtrl.js');
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
        let fileName = moment().format('DD_MM_YYYY_HH_mm_ss') + "Policy-"+ file.fieldname+"." + file.originalname.split('.').pop();

        fileArray.push({ DocumentName: fileName, DocumentType : file.fieldname })
        cb(null, fileName);
    }
});
var upload = multer({
    storage: Storage
})

// Policy API

router.get('/getPolicyDocNo', function (req, res) {
    var Data = req.body;
    PolicyCtrl.getPolicyDocNo(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });
});

router.post('/getPolicy', function (req, res) {
    var Data = req.body;
    PolicyCtrl.getPolicy(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });
});

router.post('/getPolicyList', function (req, res) {
    var Data = req.body;
    PolicyCtrl.getPolicyList(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });
});

router.post('/getPolicyById', function (req, res) {
    var Data = req.body;
    PolicyCtrl.getPolicyById(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });
});

router.post('/AddUpdatePolicy', upload.any(), function (req, res) {
    // var Data = req.body;

    var Data = Common.isEmpty(req.body.Data) === false ? JSON.parse(req.body.Data) : req.body;
    // console.log("fileArray", fileArray);
    // Data.ProjectVideo = fileArray.length ? fileArray[0].FileName : '';
    Data.KYCDocument = fileArray.length && fileArray.filter(x=>x.DocumentType == "KYCDocument").length ? fileArray.filter(x=>x.DocumentType == "KYCDocument")[0].DocumentName : '';
    Data.PolicyOneDocument = fileArray.length && fileArray.filter(x=>x.DocumentType == "PolicyOneDocument").length ? fileArray.filter(x=>x.DocumentType == "PolicyOneDocument")[0].DocumentName : '';
    Data.PolicyTwoDocument = fileArray.length && fileArray.filter(x=>x.DocumentType == "PolicyTwoDocument").length ? fileArray.filter(x=>x.DocumentType == "PolicyTwoDocument")[0].DocumentName : '';
    Data.PolicyThreeDocument = fileArray.length && fileArray.filter(x=>x.DocumentType == "PolicyThreeDocument").length ? fileArray.filter(x=>x.DocumentType == "PolicyThreeDocument")[0].DocumentName : '';

    fileArray = [];
    // console.log("Data", Data);

    PolicyCtrl.AddUpdatePolicy(Data).then((data) => {
        if (Data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    })
});

router.post('/DeletePolicy', function (req, res) {
    var Data = req.body;

    PolicyCtrl.DeletePolicy(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });
});

router.post('/sendEmailByPolicyID', function (req, res) {
    var Data = req.body;

    PolicyCtrl.sendEmailByPolicyID(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });
});

router.post('/sendEmailByAllPolicy', function (req, res) {
    var Data = req.body;

    PolicyCtrl.sendEmailByAllPolicy(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });
});


router.post('/updateEmailCount', function (req, res) {
    var Data = req.body;

    PolicyCtrl.updateEmailCount(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });
});

router.post('/closePolicy', function (req, res) {
    var Data = req.body;

    PolicyCtrl.closePolicy(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });
});


module.exports = router;
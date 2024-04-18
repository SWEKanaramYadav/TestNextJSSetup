const LeadCtrl = require('../controller/LeadCtrl.js');
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



router.post('/AddUpdateLead', upload.any(), function (req, res) {
    // var Data = req.body;

    var Data = Common.isEmpty(req.body.Data) === false ? JSON.parse(req.body.Data) : req.body;
    // console.log("fileArray", fileArray);
    // Data.ProjectVideo = fileArray.length ? fileArray[0].FileName : '';
    Data.PolicyOneDocument = fileArray.length && fileArray.filter(x=>x.DocumentType == "PolicyOneDocument").length ? fileArray.filter(x=>x.DocumentType == "PolicyOneDocument")[0].DocumentName : '';
    Data.PolicyTwoDocument = fileArray.length && fileArray.filter(x=>x.DocumentType == "PolicyTwoDocument").length ? fileArray.filter(x=>x.DocumentType == "PolicyTwoDocument")[0].DocumentName : '';
    Data.EndorsementDocument = fileArray.length && fileArray.filter(x=>x.DocumentType == "EndorsementDocument").length ? fileArray.filter(x=>x.DocumentType == "EndorsementDocument")[0].DocumentName : '';
    Data.OtherDocument = fileArray.length && fileArray.filter(x=>x.DocumentType == "OtherDocument").length ? fileArray.filter(x=>x.DocumentType == "OtherDocument")[0].DocumentName : '';
    
    fileArray = [];

    LeadCtrl.AddUpdateLead(Data).then((data) => {
        if (Data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    })
});

router.post('/getLead', function (req, res) {
    var Data = req.body;
    LeadCtrl.getLead(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });
});

router.post('/getLeadList', function (req, res) {
    var Data = req.body;
    LeadCtrl.getLeadList(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });
});

router.post('/getLeadById', function (req, res) {
    var Data = req.body;
    LeadCtrl.getLeadById(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});


router.post('/DeleteLead', function (req, res) {
    var Data = req.body;

   LeadCtrl.DeleteLead(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });
});

router.post('/closeLead', function (req, res) {
    var Data = req.body;

    LeadCtrl.closeLead(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});


module.exports = router;
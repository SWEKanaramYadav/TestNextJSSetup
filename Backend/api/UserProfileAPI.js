var UserProfileCtrl = require('./../controller/UserProfileCtrl.js');
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
        let fileName = moment().format('DD_MM_YYYY_HH_mm_ss') + "profile." + file.originalname.split('.').pop();
        console.log("filename", fileName);
        fileArray.push({ FileName: fileName })
        cb(null, fileName);

    }
});
var upload = multer({
    storage: Storage
})
/** Code API */
router.post('/getUserProfileByID', function (req, res) {

    var Data = req.body;

    UserProfileCtrl.getUserProfileByID(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

router.post('/updateUserProfile', upload.single('PicturePath'), function (req, res) {

    var Data = Common.isEmpty(req.body.data) === false ? JSON.parse(req.body.data) : req.body;
    Data.PicturePath = fileArray.length ? fileArray[0].FileName : '';
    fileArray = [];

    UserProfileCtrl.updateUserProfile(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});


// router.post('/userChangePassword', function (req, res) {
//     var Data = req.body;
//     console.log('asa',Data)

//     UserProfileCtrl.userChangePassword(Data).then((data) => {
//         if (data) {
//             res.json(data);
//         }
//     }).catch((err) => {
//         res.json(err);
//     });

// });

router.post('/userChangePassword', function (req, res) {
    var Data = req.body;

    UserProfileCtrl.userChangePassword(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

module.exports = router;
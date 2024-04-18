var PlansCtrl = require('./../controller/PlansCtrl.js');
var express = require('express');

var router = express.Router();


/** Code API */
router.post('/AddUpdatePlan', function (req, res) {
    var Data = req.body;

    PlansCtrl.AddUpdatePlan(Data).then((data) => {
        if (Data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    })
})


router.post('/DeletePlan', function (req, res) {
    var Data = req.body;

    PlansCtrl.DeletePlan(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

router.post('/GetPlansList', function (req, res) {
    var Data = req.body;
    PlansCtrl.GetPlansList(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});


module.exports = router;
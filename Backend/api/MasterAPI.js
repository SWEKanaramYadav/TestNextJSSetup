var MasterCtrl = require('./../controller/MasterCtrl.js');
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
        let fileName = moment().format('DD_MM_YYYY_HH_mm_ss') + "Documet-"+ file.fieldname+"." + file.originalname.split('.').pop();

        // Check if the file with the same name already exists
        let filePath = 'document/' + file.originalname;
        if (fs.existsSync(filePath)) {
            // Delete the existing file
            fs.unlinkSync(filePath);
        }

        fileArray.push({ DocumentName: fileName, DocumentType: file.fieldname });
        cb(null, fileName);
    }
});

var upload = multer({
    storage: Storage
})

/**Care Off Master API */
router.post('/getCareOffMasterList', function (req, res) {
    var Data = req.body;
    MasterCtrl.getCareOffMasterList(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

router.post('/getCareOffMaster', function (req, res) {
    var Data = req.body;
    MasterCtrl.getCareOffMaster(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

router.post('/AddUpdateCareOffMaster', function (req, res) {
    var Data = req.body;

    MasterCtrl.AddUpdateCareOffMaster(Data).then((data) => {
        if (Data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    })
});

router.post('/DeleteCareOffMaster', function (req, res) {
    var Data = req.body;

    MasterCtrl.DeleteCareOffMaster(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

router.post('/getCareOffMasterById', function (req, res) {
    var Data = req.body;
    MasterCtrl.getCareOffMasterById(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

//Insurance Company Master API
router.post('/getInsuranceCompanyMaster', function (req, res) {
    var Data = req.body;
    MasterCtrl.getInsuranceCompanyMaster(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

router.post('/getInsuranceCompanyList', function (req, res) {
    var Data = req.body;
    MasterCtrl.getInsuranceCompanyList(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

router.post('/AddUpdateInsuranceCompanyMaster', function (req, res) {
    var Data = req.body;

    MasterCtrl.AddUpdateInsuranceCompanyMaster(Data).then((data) => {
        if (Data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    })
});

router.post('/DeleteInsuranceCompanyMaster', function (req, res) {
    var Data = req.body;

    MasterCtrl.DeleteInsuranceCompanyMaster(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

router.post('/getInsuranceCompanyMasterById', function (req, res) {
    var Data = req.body;
    MasterCtrl.getInsuranceCompanyMasterById(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});


//Mode Of Payment Master API
router.post('/getModeOfPaymentMaster', function (req, res) {
    var Data = req.body;
    MasterCtrl.getModeOfPaymentMaster(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

router.post('/getModeOfPaymentMasterList', function (req, res) {
    var Data = req.body;
    MasterCtrl.getModeOfPaymentMasterList(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

router.post('/AddUpdateModeOfPaymentMaster', function (req, res) {
    var Data = req.body;

    MasterCtrl.AddUpdateModeOfPaymentMaster(Data).then((data) => {
        if (Data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    })
});

router.post('/DeleteModeOfPaymentMaster', function (req, res) {
    var Data = req.body;

    MasterCtrl.DeleteModeOfPaymentMaster(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

router.post('/getModeOfPaymentMasterById', function (req, res) {
    var Data = req.body;
    MasterCtrl.getModeOfPaymentMasterById(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });
    
});

//Type Of Policy Master API
router.post('/getTypeOfPolicyMaster', function (req, res) {
    var Data = req.body;
    MasterCtrl.getTypeOfPolicyMaster(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

router.post('/getTypeOfPolicyMasterList', function (req, res) {
    var Data = req.body;
    MasterCtrl.getTypeOfPolicyMasterList(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

router.post('/getSubTypeOfPolicyMasterList', function (req, res) {
    var Data = req.body;
    MasterCtrl.getSubTypeOfPolicyMasterList(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

router.post('/getMulipleSubTypeOfPolicyMasterList', function (req, res) {
    var Data = req.body;
    MasterCtrl.getMulipleSubTypeOfPolicyMasterList(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

router.post('/AddUpdateTypeOfPolicyMaster', function (req, res) {
    var Data = req.body;

    MasterCtrl.AddUpdateTypeOfPolicyMaster(Data).then((data) => {
        if (Data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    })
});

router.post('/DeleteTypeOfPolicyMaster', function (req, res) {
    var Data = req.body;
    
    MasterCtrl.DeleteTypeOfPolicyMaster(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

router.post('/DeleteSubTypeOfPolicyMaster', function (req, res) {
    var Data = req.body;
    
    MasterCtrl.DeleteSubTypeOfPolicyMaster(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

router.post('/getTypeOfPolicyMasterById', function (req, res) {
    var Data = req.body;
    MasterCtrl.getTypeOfPolicyMasterById(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });
    
});

router.post('/AddUpdateTypeOfSubPolicyMaster', function (req, res) {
    var Data = req.body;

    MasterCtrl.AddUpdateTypeOfSubPolicyMaster(Data).then((data) => {
        if (Data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    })
});

router.post('/getTypeOfSubPolicyMasterByType', function (req, res) {
    var Data = req.body;
    MasterCtrl.getTypeOfSubPolicyMasterByType(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });
    
});

router.post('/getCommissionMaster', function (req, res) {
    var Data = req.body;
    MasterCtrl.getCommissionMaster(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

router.post('/AddUpdateCommissionMaster', function (req, res) {
    var Data = req.body;

    MasterCtrl.AddUpdateCommissionMaster(Data).then((data) => {
        if (Data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    })
});

router.post('/getCommissionMasterById', function (req, res) {
    var Data = req.body;
    MasterCtrl.getCommissionMasterById(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

router.post('/DeleteCommissionMaster', function (req, res) {
    var Data = req.body;

    MasterCtrl.DeleteCommissionMaster(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});



//Insured Master API
router.post('/getInsuredMaster', function (req, res) {
    var Data = req.body;
    MasterCtrl.getInsuredMaster(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

router.post('/getNameOfInsuredList', function (req, res) {
    var Data = req.body;
    MasterCtrl.getNameOfInsuredList(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

router.post('/AddUpdateInsuredMaster', upload.any(), function (req, res) {
    // var Data = req.body;

    var Data = Common.isEmpty(req.body.Data) === false ? JSON.parse(req.body.Data) : req.body;
    // console.log("fileArray", fileArray);
    // Data.ProjectVideo = fileArray.length ? fileArray[0].FileName : '';
    Data.PANCard = fileArray.length && fileArray.filter(x=>x.DocumentType == "PANCard").length ? fileArray.filter(x=>x.DocumentType == "PANCard")[0].DocumentName : '';
    Data.AadhaarCardFront = fileArray.length && fileArray.filter(x=>x.DocumentType == "AadhaarCardFront").length ? fileArray.filter(x=>x.DocumentType == "AadhaarCardFront")[0].DocumentName : '';
    Data.AadhaarCardBack = fileArray.length && fileArray.filter(x=>x.DocumentType == "AadhaarCardBack").length ? fileArray.filter(x=>x.DocumentType == "AadhaarCardBack")[0].DocumentName : '';
    Data.GST = fileArray.length && fileArray.filter(x=>x.DocumentType == "GST").length ? fileArray.filter(x=>x.DocumentType == "GST")[0].DocumentName : '';
    Data.OtherDocument1 = fileArray.length && fileArray.filter(x=>x.DocumentType == "OtherDocument1").length ? fileArray.filter(x=>x.DocumentType == "OtherDocument1")[0].DocumentName : '';
    Data.OtherDocument2 = fileArray.length && fileArray.filter(x=>x.DocumentType == "OtherDocument2").length ? fileArray.filter(x=>x.DocumentType == "OtherDocument2")[0].DocumentName : '';
    
    fileArray = [];

    // console.log("Data", Data);

    MasterCtrl.AddUpdateInsuredMaster(Data).then((data) => {
        if (Data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    })
});

router.post('/DeleteInsuredMaster', function (req, res) {
    var Data = req.body;
    
    MasterCtrl.DeleteInsuredMaster(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

router.post('/getInsuredMasterById', function (req, res) {
    var Data = req.body;
    MasterCtrl.getInsuredMasterById(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });
    
});

//Make Master API
router.post('/getMakeMaster', function (req, res) {
    var Data = req.body;
    MasterCtrl.getMakeMaster(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

router.post('/getMakeMasterList', function (req, res) {
    var Data = req.body;
    MasterCtrl.getMakeMasterList(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

router.post('/AddUpdateMakeMaster', function (req, res) {
    var Data = req.body;

    MasterCtrl.AddUpdateMakeMaster(Data).then((data) => {
        if (Data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    })
});

router.post('/DeleteMakeMaster', function (req, res) {
    var Data = req.body;

    MasterCtrl.DeleteMakeMaster(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

router.post('/getMakeMasterById', function (req, res) {
    var Data = req.body;
    MasterCtrl.getMakeMasterById(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });
    
});

//Model Master API
router.post('/getModelMaster', function (req, res) {
    var Data = req.body;
    MasterCtrl.getModelMaster(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

router.post('/getModelMasterList', function (req, res) {
    var Data = req.body;
    MasterCtrl.getModelMasterList(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

router.post('/AddUpdateModelMaster', function (req, res) {
    var Data = req.body;

    MasterCtrl.AddUpdateModelMaster(Data).then((data) => {
        if (Data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    })
});

router.post('/DeleteModelMaster', function (req, res) {
    var Data = req.body;

    MasterCtrl.DeleteModelMaster(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

router.post('/getModelMasterById', function (req, res) {
    var Data = req.body;
    MasterCtrl.getModelMasterById(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });
    
});

//Designation Master API
router.post('/getDesignationMaster', function (req, res) {
    var Data = req.body;
    MasterCtrl.getDesignationMaster(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

router.post('/getDesignationMasterList', function (req, res) {
    var Data = req.body;
    MasterCtrl.getDesignationMasterList(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

router.post('/AddUpdateDesignationMaster', function (req, res) {
    var Data = req.body;

    MasterCtrl.AddUpdateDesignationMaster(Data).then((data) => {
        if (Data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    })
});

router.post('/DeleteDesignationMaster', function (req, res) {
    var Data = req.body;

    MasterCtrl.DeleteDesignationMaster(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

router.post('/getDesignationMasterById', function (req, res) {
    var Data = req.body;
    MasterCtrl.getDesignationMasterById(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });
    
});

//Bank Master API
router.post('/getBankMaster', function (req, res) {
    var Data = req.body;
    MasterCtrl.getBankMaster(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});
router.post('/AddUpdateBankMaster', function (req, res) {
    var Data = req.body;

    MasterCtrl.AddUpdateBankMaster(Data).then((data) => {
        if (Data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    })
});

router.post('/DeleteBankMaster', function (req, res) {
    var Data = req.body;

    MasterCtrl.DeleteBankMaster(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

//PolicyStatus Master API
router.post('/getPolicyStatusMaster', function (req, res) {
    var Data = req.body;
    MasterCtrl.getPolicyStatusMaster(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

router.post('/getPolicyStatusMasterList', function (req, res) {
    var Data = req.body;
    MasterCtrl.getPolicyStatusMasterList(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

router.post('/AddUpdatePolicyStatusMaster', function (req, res) {
    var Data = req.body;

    MasterCtrl.AddUpdatePolicyStatusMaster(Data).then((data) => {
        if (Data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    })
});

router.post('/DeletePolicyStatusMaster', function (req, res) {
    var Data = req.body;

    MasterCtrl.DeletePolicyStatusMaster(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

router.post('/getPolicyStatusMasterById', function (req, res) {
    var Data = req.body;
    MasterCtrl.getPolicyStatusMasterById(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });
    
});

//Client Master API
router.post('/getClientMaster', function (req, res) {
    var Data = req.body;
    MasterCtrl.getClientMaster(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

router.post('/AddUpdateClientMaster', upload.any(), function (req, res) {
    
    var Data = Common.isEmpty(req.body.Data) === false ? JSON.parse(req.body.Data) : req.body;
    // console.log("fileArray", fileArray);
    // Data.ProjectVideo = fileArray.length ? fileArray[0].FileName : '';
    Data.PanCardDocument = fileArray.length && fileArray.filter(x=>x.DocumentType == "PanCardDocument").length ? fileArray.filter(x=>x.DocumentType == "PanCardDocument")[0].DocumentName : '';
    Data.AadhaarCardFrontDocument = fileArray.length && fileArray.filter(x=>x.DocumentType == "AadhaarCardFrontDocument").length ? fileArray.filter(x=>x.DocumentType == "AadhaarCardFrontDocument")[0].DocumentName : '';
    Data.AadhaarCardBackDocument = fileArray.length && fileArray.filter(x=>x.DocumentType == "AadhaarCardBackDocument").length ? fileArray.filter(x=>x.DocumentType == "AadhaarCardBackDocument")[0].DocumentName : '';
    Data.ChequeDocument = fileArray.length && fileArray.filter(x=>x.DocumentType == "ChequeDocument").length ? fileArray.filter(x=>x.DocumentType == "ChequeDocument")[0].DocumentName : '';
    Data.DLDocument = fileArray.length && fileArray.filter(x=>x.DocumentType == "DLDocument").length ? fileArray.filter(x=>x.DocumentType == "DLDocument")[0].DocumentName : '';
    
    fileArray = [];

    MasterCtrl.AddUpdateClientMaster(Data).then((data) => {
        if (Data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    })
});

router.post('/getClientMasterById', function (req, res) {
    var Data = req.body;
    MasterCtrl.getClientMasterById(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

router.post('/DeleteClientMaster', function (req, res) {
    var Data = req.body;

    MasterCtrl.DeleteClientMaster(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

//Group Master API
router.post('/getGroupMaster', function (req, res) {
    var Data = req.body;
    MasterCtrl.getGroupMaster(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

router.post('/AddUpdateGroupMaster', upload.any(), function (req, res) {
    
    var Data = req.body;

    MasterCtrl.AddUpdateGroupMaster(Data).then((data) => {
        if (Data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    })
});

router.post('/getGroupMasterById', function (req, res) {
    var Data = req.body;
    MasterCtrl.getGroupMasterById(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

router.post('/DeleteGroupMaster', function (req, res) {
    var Data = req.body;

    MasterCtrl.DeleteGroupMaster(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});


//AgencyCode Master API
router.post('/getAgencyCodeMaster', function (req, res) {
    var Data = req.body;
    MasterCtrl.getAgencyCodeMaster(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

router.post('/getAgencyCodeMasterList', function (req, res) {
    var Data = req.body;
    MasterCtrl.getAgencyCodeMasterList(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

router.post('/AddUpdateAgencyCodeMaster', function (req, res) {
    var Data = req.body;

    MasterCtrl.AddUpdateAgencyCodeMaster(Data).then((data) => {
        if (Data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    })
});

router.post('/DeleteAgencyCodeMaster', function (req, res) {
    var Data = req.body;

    MasterCtrl.DeleteAgencyCodeMaster(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

router.post('/getAgencyCodeMasterById', function (req, res) {
    var Data = req.body;
    MasterCtrl.getAgencyCodeMasterById(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });
    
});

//SubAgentCode Master API
router.post('/getSubAgentCodeMaster', function (req, res) {
    var Data = req.body;
    MasterCtrl.getSubAgentCodeMaster(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

router.post('/getSubAgentCodeMasterList', function (req, res) {
    var Data = req.body;
    MasterCtrl.getSubAgentCodeMasterList(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

router.post('/AddUpdateSubAgentCodeMaster', function (req, res) {
    var Data = req.body;

    MasterCtrl.AddUpdateSubAgentCodeMaster(Data).then((data) => {
        if (Data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    })
});

router.post('/DeleteSubAgentCodeMaster', function (req, res) {
    var Data = req.body;

    MasterCtrl.DeleteSubAgentCodeMaster(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

router.post('/getSubAgentCodeMasterById', function (req, res) {
    var Data = req.body;
    MasterCtrl.getSubAgentCodeMasterById(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });
    
});

//Fund Ulip Master API
router.post('/getFundUlipMaster', function (req, res) {
    var Data = req.body;
    MasterCtrl.getFundUlipMaster(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

router.post('/AddUpdateFundUlipMaster', function (req, res) {
    var Data = req.body;

    MasterCtrl.AddUpdateFundUlipMaster(Data).then((data) => {
        if (Data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    })
});

router.post('/DeleteFundUlipMaster', function (req, res) {
    var Data = req.body;

    MasterCtrl.DeleteFundUlipMaster(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

//Sum Assured Rider Master API
router.post('/getSumAssuredRiderMaster', function (req, res) {
    var Data = req.body;
    MasterCtrl.getSumAssuredRiderMaster(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

router.post('/AddUpdateSumAssuredRiderMaster', function (req, res) {
    var Data = req.body;

    MasterCtrl.AddUpdateSumAssuredRiderMaster(Data).then((data) => {
        if (Data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    })
});

router.post('/DeleteSumAssuredRiderMaster', function (req, res) {
    var Data = req.body;

    MasterCtrl.DeleteSumAssuredRiderMaster(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

//Policy Plan Master API
router.post('/getPolicyPlanMaster', function (req, res) {
    var Data = req.body;
    MasterCtrl.getPolicyPlanMaster(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

router.post('/getPolicyPlanList', function (req, res) {
    var Data = req.body;
    MasterCtrl.getPolicyPlanList(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

router.post('/AddUpdatePolicyPlanMaster', function (req, res) {
    var Data = req.body;

    MasterCtrl.AddUpdatePolicyPlanMaster(Data).then((data) => {
        if (Data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    })
});

router.post('/DeletePolicyPlanMaster', function (req, res) {
    var Data = req.body;

    MasterCtrl.DeletePolicyPlanMaster(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

router.post('/getPolicyPlanMasterById', function (req, res) {
    var Data = req.body;
    MasterCtrl.getPolicyPlanMasterById(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

// Branch master 

router.post('/getBranchMaster', function (req, res) {
    var Data = req.body;

    MasterCtrl.getBranchMaster(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

router.post('/AddUpdateBranchMaster', function (req, res) {
    var Data = req.body;

    MasterCtrl.AddUpdateBranchMaster(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

router.post('/DeleteBranchMaster', function (req, res) {
    var Data = req.body;

    MasterCtrl.DeleteBranchMaster(Data).then((data) => {
        if (data) {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    });

});

module.exports = router;
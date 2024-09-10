// importing relevant dependencies 
const express = require('express')
const applicantModel = require('../models/applicant.model')
const studentModel = require('../models/student.model')
const { generateApplicantID, generateApplicantPIN } = require('../utils/generateApplicantData')

// setting up the router 
const router = express.Router()

// DECLARED ROUTES CONFIG 
// returns all the applicant details stored 
router.get('/', async (req, res) => {
    try {
        const applicants = await applicantModel.find({})
        res.json({success: true, data: applicants, error: null})

    } catch(err) {
        res.json({success: false, data: null, error:err})
    } 
})


// creates a new applicant record in the database 
router.post('/', async (req, res) => {
    try {
        let gen_id = generateApplicantID()
        let pin = generateApplicantPIN()

        // generating a new applicant session 
        const applicant = applicantModel({
            gen_id,
            pin,
            available_for_check: false, 
        })

        applicant.set('info', studentModel.schema.obj)
        applicant.save().then(doc => {
            res.json({success: true, data: doc, error: null})
        }).catch(err => {
            res.json({success: false, data: null, error: err})
        })

    } catch(err) {
        res.json({success: false, data: null, error: err})
    }
})


// gets a specific applicant information 
router.post('/specific', async (req, res) => {
    try {
        await applicantModel.findOne({'gen_id': req.body.gen_id, 'pin': req.body.pin}).then(doc => {
            if(doc === null){
                res.json({success: false, data: null, error: null})
            } else {
                res.json({success: true, data: doc, error: null})
            }
        }).catch(() => {
            res.json({success: false, data: null, error: error})
        })

    } catch(error) {
        res.json({success: false, data: null, error: error})
    }
})


//updates an applicant information 
router.put('/', async (req, res) => {
    try {
        await applicantModel.findOneAndUpdate({'gen_id': req.body.gen_id, 'pin': req.body.pin}, req.body).then(doc => {
            res.json({success: true, data: null, error: null})
        }).catch(() => {
            res.json({success: false, data: null, error: "Update failed"})
        })
    } catch(error) {
        res.json({success: false, data: null, error: error })
    }
})


//deletes an applicant information 
router.post('/delete', async (req, res) => {
    try {
        await applicantModel.findOneAndDelete({'gen_id': req.body.gen_id, 'pin': req.body.pin}).then(doc => {
            console.log(doc)
            res.json({success: true, data: null, error: null})
        }).catch(() => {
            res.json({success: false, data: null, error: "Update failed"})
        })
    } catch(error) {
        res.json({success: false, data: null, error: error })
    }
})
 


module.exports = router
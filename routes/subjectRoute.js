const express = require('express')
const subjectModel = require('../models/subject.model')


// setting up the router 
const router = express.Router()

// DECLARED ROUTES CONFIG 
// gets all the subjects created 
router.get('/', async (req, res) => {
    try{
        const subjects = await subjectModel.find({})
        res.json({success: true, data: subjects, error: null})
    } catch(err) {
        res.json({success: false, data: null, error: err})
    }
})

// creates a new subject record in the database 
router.post('/', async (req, res) => {
    try {
        // sanitizing inputs 
        if(Object.keys(req.body).length == 0 || req.body.name == "" || req.body.code == ""){
            throw "Invalid inputs"
        }

        // checking if subject already exists in the database 
        const subjects = await subjectModel.find({})
        subjects.forEach(x => {
            if(x.name == req.body.name){
                throw "Subject name already exist in the database"
            } else if(x.code == req.body.code){
                throw "Subject code already exist in the database"
            }
        })

        // generating a new applicant session 
        const subject = subjectModel(req.body)

        subject.save().then(doc => {
            res.json({success: true, data: doc, error: null})
        }).catch(err => {
            throw "An internal error occurred"
        })

    } catch(err) {
        res.statusCode = 400
        res.json({success: false, data: null, error: err})
    }
})


// gets a specific applicant information 
router.post('/specific', async (req, res) => {
    try {
        await subjectModel.findOne({name: req.body.name, code: req.body.code}).then(doc => {
            if(doc === null){
                throw "Subject does not exist"
            } else {
                res.json({success: true, data: doc, error: null})
            }
        }).catch(err => {
            throw err
        })

    } catch(error) {
        res.statusCode = 400 
        res.json({success: false, data: null, error: error})
    }
})


//updates a subject information 
router.put('/:code', async (req, res) => {
    try {
        // checking if the new selected name already exists in the database
        const subjects = await subjectModel.find({code: req.params.code})
        if(subjects.length === 0){
            throw "The Subject specified is invalid"
        }
        
        // ensuring that the subject code and name remains unchanged
        req.body.code = subjects[0].code
        req.body.name = subjects[0].name

        // updating the subject
        await subjectModel.findOneAndUpdate({code: req.params.code}, req.body).then(doc => {
            if(doc){
                res.json({success: true, data: null, error: null})
            } else {
                throw "No subject found"
            }
        }).catch(() => {
            throw "Update failed"
        })
    } catch(error) {
        res.statusCode = 400
        res.json({success: false, data: null, error: error })
    }
})


//deletes a subject information 
router.delete('/:code', async (req, res) => {
    try {
        // const subjects = await subjectModel.find({})

        // subjects.forEach(x => {
        //     x.sub_subjects = x.sub_subjects.filter(el => el.code !== req.params.code)
        // })

        // removing subjects to be deleted from other subjects that have it registered under it
        await subjectModel.updateMany({}, { $pull: {
            sub_subjects: {
                code: req.params.code
            }
        }})
        

        await subjectModel.findOneAndDelete({code: req.params.code}).then(doc => {
            res.json({success: true, data: null, error: null})
        }).catch(() => {
            throw `Unable to delete  ${req.params.code}`
        })
    } catch(error) {
        console.log(error)
        res.statusCode = 400
        res.json({success: false, data: null, error: error })
    }
})


module.exports = router 
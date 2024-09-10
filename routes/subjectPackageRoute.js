const express = require('express')
const subjectPackageModel = require('../models/subjectPackage.model')


// setting up the router 
const router = express.Router()

// DECLARED ROUTES CONFIG 
// gets all the subjects created 
router.get('/', async (req, res) => {
    try{
        const subjects = await subjectPackageModel.find({})
        res.json({success: true, data: subjects, error: null})
    } catch(err) {
        res.json({success: false, data: null, error: err})
    }
})

// creates a new subject package record in the database 
router.post('/', async (req, res) => {
    try {
        // sanitizing inputs 
        if(Object.keys(req.body).length == 0 || req.body.name == ""){
            throw "Invalid inputs"
        }

        // checking if subject package already exists in the database 
        const manyPackages = await subjectPackageModel.find({})
        manyPackages.forEach(x => {
            if(x.name == req.body.name){
                throw "Subject Package name already exist in the database"
            }
        })

        // generating a new subject package session 
        const subjectPackage = subjectPackageModel(req.body)

        subjectPackage.save().then(doc => {
            res.json({success: true, data: doc, error: null})
        }).catch(err => {
            throw "An internal error occurred"
        })

    } catch(err) {
        res.statusCode = 400
        res.json({success: false, data: null, error: err})
    }
})


// gets a specific subject package information 
router.post('/specific', async (req, res) => {
    try {
        await subjectPackageModel.findOne({name: req.body.name}).then(doc => {
            if(doc === null){
                throw "Subject Package does not exist"
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


//updates a subject package information 
router.put('/update', async (req, res) => {
    try {
        // checking if the new selected name already exists in the database
        // const subjectsPackageCheck = await subjectPackageModel.find({name: req.body.name})
        // if(subjectsPackageCheck.length === 0){
        //     throw "The Subject Package specified is invalid"
        // }
        
        // ensuring that the subject page name remains unchanged
        // req.body.name = subjectsPackageCheck[0].name

        // updating the subject package 
        // this uses the old name to get the subject package 
        // and the sets its name to a new_name 
        await subjectPackageModel.findOneAndUpdate({name: req.body.name}, {
            name: req.body.new_name,
            subjects: req.body.subjects
        }).then(doc => {
            if(doc){
                res.json({success: true, data: null, error: null})
            } else {
                throw "No subject Package found"
            }
        }).catch(() => {
            throw "Update failed"
        })
    } catch(error) {
        res.statusCode = 400
        res.json({success: false, data: null, error: error })
    }
})


//deletes a subject package information 
router.post('/delete', async (req, res) => {
    try {
        await subjectPackageModel.findOneAndDelete({name: req.body.name}).then(doc => {
            res.json({success: true, data: null, error: null})
        }).catch(() => {
            throw `Unable to delete  ${req.params.code}`
        })
    } catch(error) {
        res.statusCode = 400
        res.json({success: false, data: null, error: error })
    }
})


module.exports = router 
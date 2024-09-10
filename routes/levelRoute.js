const express = require('express')
const levelModel = require('../models/level.model')


// setting up the router 
const router = express.Router()

// DECLARED ROUTES CONFIG 
// gets all the levels created 
router.get('/', async (req, res) => {
    try{
        const levels = await levelModel.find({})
        res.json({success: true, data: levels, error: null})
    } catch(err) {
        res.json({success: false, data: null, error: err})
    }
})

// creates a new level record in the database 
router.post('/', async (req, res) => {
    try {
        // sanitizing inputs 
        if(Object.keys(req.body).length == 0 || req.body.name == "" || req.body.code == ""){
            throw "Invalid inputs"
        }

        // checking if level already exists in the database 
        const levels = await levelModel.find({})
        levels.forEach(x => {
            if(x.name == req.body.name){
                throw "Level name already exist in the database"
            } else if(x.code == req.body.code){
                throw "Level code already exist in the database"
            }
        })

        // generating a new level instance 
        const level = levelModel(req.body)

        level.save().then(doc => {
            res.json({success: true, data: doc, error: null})
        }).catch(() => {
            throw "An internal error occurred"
        })

    } catch(err) {
        res.statusCode = 400
        res.json({success: false, data: null, error: err})
    }
})


// gets a specific level information 
router.get('/:code', async (req, res) => {
    try {
        await levelModel.findOne({code: req.params.code}).then(doc => {
            if(doc === null){
                throw "Level does not exist"
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
        const levels = await levelModel.find({code: req.params.code})
        if(levels.length === 0){
            throw "The Level specified is invalid"
        }
        
        // ensuring that the level code
        req.body.code = levels[0].code

        // common is a term used when there is no arms in the 
        // level to be created 
        

        // updating the level
        await levelModel.findOneAndUpdate({code: req.params.code}, req.body).then(doc => {
            if(doc){
                res.json({success: true, data: null, error: null})
            } else {
                throw "No Level found"
            }
        }).catch(() => {
            throw "Update failed"
        })
    } catch(error) {
        res.statusCode = 400
        res.json({success: false, data: null, error: error })
    }
})


//deletes a level information 
router.delete('/:code', async (req, res) => {
    try {
        // await levelModel.updateMany({}, { $pull: {
        //     sub_subjects: {
        //         code: req.params.code
        //     }
        // }})
        await levelModel.findOneAndDelete({code: req.params.code}).then(doc => {
            res.json({success: true, data: null, error: null})
        }).catch(() => {
            throw `Unable to delete the level`
        })
    } catch(error) {
        res.statusCode = 400
        res.json({success: false, data: null, error: error })
    }
})


module.exports = router 
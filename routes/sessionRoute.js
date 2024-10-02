const express = require('express')
const sessionModel = require('../models/session.model')
const levelModel = require('../models/level.model')


//setting up the router 
const  router = express.Router()

// gets all the sessions stored in the database 
router.get('/', async (req, res) => {
    try {
        const check = await sessionModel.find({})
        res.json({success: true, data: check, error: null})
    } catch(error){
        res.statusCode = 400
        res.json({success: false, data: null, error: error})
    }
})

// creates a new session record in the database 
router.post('/', async (req, res) => {
    try {
        // checking if the session already exists 
        const check = await sessionModel.find({name: req.body.name})
        if(check.length > 0){
            // throwing an error if the session already exist
            throw "Session exists in the database"
        }

        // fetching the current state of levels 
        // let result = []
        // const levels = await levelModel.find({})
        // levels.forEach(x => {
        //     result.push({code: x.code, score_setting: 320})
        // })

        // // registering the current state of levels in the session
        // req.body.terms.forEach(x => {
        //     x.levels = result 
        // })


        sessionModel.create(req.body).then(doc => {
            res.json({success: true, data: doc, error: null})
        }).catch(err => {
            throw err
        })



        

    } catch(error){
        res.statusCode = 400
        res.json({success: false, data: null, error: error})
    }
})

module.exports = router 

// {
// "name": "2024/2025 Academic Session", 
// "code": "3425", 
// "from_year": 2024,
// "to_year": 2025,
// "terms": [
//     {"name": "First Term", "code": "1st"},
//     {"name": "Second Term", "code": "2nd"},
//     {"name": "Third Term", "code": "3rd"}
// ]
// }
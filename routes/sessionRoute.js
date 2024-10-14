const express = require('express')
const sessionModel = require('../models/session.model')
const scoresheetModel = require('../models/scoresheet.model')
const studentModel = require('../models/student.model')
const levelModel = require('../models/level.model')
const { subjectsLister } = require('../utils/subject')

const { generateTenAlphaNumbericDigits } = require('../utils/generateRandomLibrary')


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

// lock or unlock a term 
// req structure 
// {name: "2023/2024 Academic Session", term: "First Term", locked: true}
router.put('/term-guard', async (req, res) => {
    try {
        let session = await sessionModel.find({name: req.body.name})

        if(session.length <= 0){
            throw "Session is not available"
        }

        // setting only the single term active and diabling others 
        session[0].terms.forEach(term => {
            if(term.name === req.body.term){
                term.locked = req.body.locked
            }
        })

        // setting the current session 
        await sessionModel.findOneAndUpdate({name: req.body.name}, session[0]).then(() => {
            res.json({success: true, data: null, error: null})
        }).catch(err => {
            throw err
        })
    } catch(error){
        res.statusCode = 400
        res.json({success: false, data: null, error: error})
    }
})

// activate a term 
// request structure 
// {name: "2023/2024 Academic Session", term: "name of term"}
router.post('/term-activate', async (req, res) => {
    try {
        let session = await sessionModel.find({name: req.body.name})

        if(session.length <= 0){
            throw "Session is not available"
        }

        // setting only the single term active and diabling others 
        session[0].terms.forEach(term => {
            if(term.name === req.body.term){
                term.active = true 
            } else { 
                term.active = false 
            }
        })

        // setting the current session 
        await sessionModel.findOneAndUpdate({name: req.body.name}, session[0]).then(() => {
            res.json({success: true, data: null, error: null})
        }).catch(err => {
            throw err
        })
    } catch(error) {
        res.statusCode = 400
        res.json({success: false, data: null, error: error})
    }
})

// deactivate a term 


// activate a session 
router.post('/activate', async (req, res) => {
    try {
        // disabling all sessions 
        await sessionModel.updateMany({}, {$set: {active: false}})

        // setting the current session 
        await sessionModel.findOneAndUpdate({name: req.body.name}, {$set: {active: true}}).then(() => {
            res.json({success: true, data: null, error: null})
        }).catch(err => {
            throw err
        })
    } catch(error) {
        res.statusCode = 400
        res.json({success: false, data: null, error: error})
    }
})

// deactivate a session 
router.post('/deactivate', async (req, res) => {
    try {
        await sessionModel.findOneAndUpdate({name: req.body.name}, {$set: {active: false}}).then(() => {
            res.json({success: true, data: null, error: null})
        }).catch(err => {
            throw err
        })
    } catch(error) {
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

        // populating the terms automatically 
        req.body.terms = [
            {name: "First Term", scoresheet_code: "first_" + generateTenAlphaNumbericDigits()},
            {name: "Second Term", scoresheet_code: "second_" + generateTenAlphaNumbericDigits()},
            {name: "Third Term", scoresheet_code: "third_" + generateTenAlphaNumbericDigits()},
        ]


        // fetching all the registered students in the database
        // and formating them for entry into the session collection
        let result = [] 
        let students = await studentModel.find({})
        if(students.length > 0){
            students.forEach(async st => {
                result.push({   
                    ref_id: st.account.ref_id, 
                    level: st.academic.level, 
                    subject_scores: []
                })
            })
        }

        //creating documents for the terms in the scoresheet collection
        req.body.terms.forEach(el => {
            scoresheetModel.create({
                scoresheet_code: el.scoresheet_code,
                students: result
            })
        })

        // creating the session document 
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
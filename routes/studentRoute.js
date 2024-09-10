//importing relevant dependencies 
const express = require('express')
const bcryptjs = require('bcryptjs')
const studentModel = require('../models/student.model')
const staffModel = require('../models/staff.model')
const generateStudentId = require('../utils/generateStudentId')
const jwt = require('jsonwebtoken')

//setting up the router 
const router = express.Router()

// authorization gateway function
const authorizer = function(req, res, next){
    jwt.verify(req.headers['vhc_token'] || "a", process.env.JWT_SECRET, (err, decoded) => {
        if(err){
            res.json({success: false, data: null, error: "Not Authorized"})
        } else {
            const resStudent = studentModel.find({'account.ref_id': decoded.ref_id, 'account.password': decoded.password})
            const resStaff = staffModel.find({'account.ref_id': decoded.ref_id, 'account.password': decoded.password})
            
            if(resStudent || resStaff){
                next()
            } else {
                res.json({success: false, data: null, error: "Not Authorized"})
            }
        }
    })
}

// registering the middleware that authorizes api requests 
// router.use(authorizer)


//DECLARED ROUTES CONFIG 
// returns all the student details stored 
router.get('/', async (req, res) => {
    try {
        const students = await studentModel.find({})
        
        // clearing the password before sending it to the client
        students.forEach(x => {
            x.account.password = ""
        })
        res.json({success: true, data: students, error: null})

    } catch(error){
        res.json({success: false, data: null, error: error})
    }
})

//returns a specific student detail 
router.get('/:id', async (req, res) => {
    try {
        const student = await studentModel.findOne({'account.ref_id': req.params.id})

        if(student.account.password) student.account.password = ""

        res.json({success: true, data: student, error: null})
    } catch(error) {
        res.json({success: false, data: null, error: error})
    }
})

// creates a new student in the database 
router.post('/', async (req, res) => {
    try {
        // generating an ID for the student 
        req.body.account.ref_id = await generateStudentId(req.body.bio.gender)

        // hashing the password 
        if(req.body.account.password === ""){
            res.json({success: false, data: null, error: "Empty Password field"})
        } else {

            req.body.account.password = bcryptjs.hashSync(req.body.account.password)
            
            // saving the student details in the database 
            const student = studentModel(req.body)
            await student.save().then(doc => {
                doc.account.password = ""
                res.json({success: true, data: doc, error: null})
            }).catch(err => {
                res.json({success: false, data: null, error: err})
            })
        }

    } catch(error) {
        res.json({success: false, data: null, error: error})
    }
})

// updates a student information 
router.put('/', async (req, res) => {
    try {
        const studentId = await studentModel.findOne({'account.ref_id': req.body.account.ref_id})
        req.body.account.password = studentId.account.password
        
        await studentModel.findOneAndUpdate({'account.ref_id': req.body.account.ref_id}, req.body).then(doc => {
            res.json({success: true, data: null, error: null})
        }).catch(() => {
            res.json({success: false, data: null, error: "Update failed"})
        })
    } catch (error) {
        res.json({success: false, data: null, error: error})
    }
})

//deletes a student from the database 
router.delete('/:id', async (req, res) => {
    try {
        await studentModel.findOneAndDelete({'account.ref_id': req.params.id}).then(doc => {
            console.log(doc)
            res.json({success: true, data: null, error: null})
        }).catch(() => {
            res.json({success: false, data: null, error: "Student was not deleted"})
        })
    } catch(error){
        res.json({success: false, data: null, error: "Student was not deleted"})
    }
})
module.exports = router 
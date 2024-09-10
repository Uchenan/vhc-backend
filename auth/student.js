const express = require('express')
const bcryptjs = require('bcryptjs')
const studentModel = require('../models/student.model')
const jwt = require('jsonwebtoken')

const router = express.Router()

// authenticates a student and returns a token that
// can be used to access other parts of the backend
router.post('/', async (req, res) => {
    try {
        const userId = req.body.ref_id 
        const password = req.body.password 
    
        const students = await studentModel.find({'account.ref_id': userId})
    
        if(students.length === 1){
            students.forEach(x => {
                if(bcryptjs.compareSync(password, x.account.password)){
                    const token = jwt.sign(x.account.toJSON(), process.env.JWT_SECRET)
    
                    res.setHeader("vhc_token", token)
    
                    x.account.password = ""
    
                    res.json({success: true, data: x, error: null})
                } else {
                    res.json({success: false, data: null, error: "student not found"})
                }
            })
        } else if(students.length > 1) {
            res.json({success: false, data: null, error: "Duplicate IDs found. Internal Error"})
        } else {
            res.json({success: false, data: null, error: "Student not found"})
        }
    } catch(error) {
        res.json({success: false, data: null, error: "an internal error ocurred"})
    }
})

module.exports = router 
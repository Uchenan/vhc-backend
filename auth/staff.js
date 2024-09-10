const express = require('express')
const bcryptjs = require('bcryptjs')
const staffModel = require('../models/staff.model')
const jwt = require('jsonwebtoken')

const router = express.Router()

// authenticates a staff and returns a token that
// can be used to access other parts of the backend
router.post('/', async (req, res) => {
    try {
        const userId = req.body.ref_id 
        const password = req.body.password 
    
        const staffs = await staffModel.find({'account.ref_id': userId})
    
        if(staffs.length === 1){
            staffs.forEach(x => {
                if(bcryptjs.compareSync(password, x.account.password)){
                    let img = ""
                    // generating a special token for the staff and setting the vhc_token header for it 
                    const token = jwt.sign(x.account.toJSON(), process.env.JWT_SECRET)
                    res.setHeader("vhc_token", token)
                    
                    // silencing the staff password 
                    x.account.password = ""
                    
                    // sending the authenticated staff profile 
                    res.json({success: true, data: x, error: null})
                } else {
                    res.json({success: false, data: null, error: "staff not found"})
                }
            })
        } else if(staffs.length > 1) {
            res.json({success: false, data: null, error: "Duplicate IDs found. Internal Error"})
        } else {
            res.json({success: false, data: null, error: "Staff not found"})
        }
    } catch(error){
        res.json({success: false, data: null, error: "staff not authenticated"})
    }
})

module.exports = router 
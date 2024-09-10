// importing relevant dependencies 
const express = require('express')
const staffModel = require('../models/staff.model')
const bcryptjs = require('bcryptjs')
const generateStaffId = require('../utils/generateStaffId')
const jwt = require('jsonwebtoken')

// setting up the router
const router = express.Router()

// authorization gateway function
const authorizer = function(req, res, next){
    jwt.verify(req.headers['vhc_token'] || "a", process.env.JWT_SECRET, (err, decoded) => {
        if(err){
            res.json({success: false, data: null, error: "Not Authorized"})
        } else {
            const res = staffModel.find({'account.ref_id': decoded.ref_id, 'account.password': decoded.password})
            if(res.exists){
                next()
            } else {
                res.json({success: false, data: null, error: "Not Authorized"})
            }
        }
    })
}

// registering the middleware that authorizes api requests 
// router.use(authorizer)

// DECLARED ROUTES CONFIG 
// returns all staff details stored 
router.get('/', async (req, res) => {
    try {
        const staffs = await staffModel.find({})
        
        // clearing the password before sending it to the client
        staffs.forEach(x => {
            x.account.password = ""
        })
        res.json({success: true, data: staffs, error: null})

    } catch(error){
        res.json({success: false, data: null, error: error})
    }
})

//returns a specific staff detail 
router.get('/:id', async (req, res) => {
    try {
        const staff = await staffModel.findOne({'account.ref_id': req.params.id})
        
        // silencing the password of the staff
        staff.account.password = ""

        res.json({success: true, data: staff, error: null})
    } catch(error) {
        res.json({success: false, data: null, error: error})
    }
})

// creates a staff in the database 
router.post('/', async (req, res) => {
    try {
        // generating an ID for the staff 
        req.body.account.ref_id = await generateStaffId(req.body.bio.gender)

        // hashing the password 
        if(req.body.account.password === ""){
            res.json({success: false, data: null, error: "Empty Password field"})
        } else {
            // hashing the password of the user 
            req.body.account.password = bcryptjs.hashSync(req.body.account.password)
            
            // saving the staff details in the database 
            const staff = staffModel(req.body)
            
            await staff.save().then(doc => {
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

//update a staffs information 
router.put('/', async (req, res) => {
    try {
        // re-assigning the hashed password of the staff to avoid loss of data 
        const staff = await staffModel.findOne({'account.ref_id': req.body.account.ref_id})
        req.body.account.password = staff.account.password

        // updating the staff record in the staff collection 
        staffModel.findOneAndUpdate({'account.ref_id': req.body.account.ref_id}, req.body).then(doc => {
            res.json({success: true, data: null, error: null})
        }).catch(() => {
            res.json({success: false, data: null, error: "Update failed"})
        })


    } catch (error) {
        res.json({success: false, data: null, error: error})
    }
})


//deletes a staff from the database 
router.delete('/:id', async (req, res) => {
    try {
        await staffModel.findOneAndDelete({'account.ref_id': req.params.id}).then(doc => {
            console.log(doc)
            res.json({success: true, data: null, error: null})
        }).catch(() => {
            res.json({success: false, data: null, error: "Staff was not deleted"})
        })
    } catch(error){
        res.json({success: false, data: null, error: "Staff was not deleted"})
    }
})

module.exports = router 
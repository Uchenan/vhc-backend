const cloudinary = require('cloudinary').v2
const express = require('express')
const staffModel = require('../models/staff.model')
const studentModel = require('../models/student.model')
const router = express.Router()

require('dotenv').config()


// cloudinary configs 
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME.toString(), 
    api_key: process.env.API_KEY.toString(), 
    api_secret: process.env.API_SECRET.toString(),
})

// STAFF IMAGE REGISTRATION FUNCTION 
// value is the picture to be inserted 
// ref_id represents the public id of the image after assignment
async function registerStaffImage(ref_id, value) {
    const uploadResult = await cloudinary.uploader.upload(value, {
        public_id: ref_id,
        upload_preset: process.env.UPLOAD_PRESET.toString()
    }).catch(err => {
        return err
    })

    const staff = staffModel.findOne({'account.ref_id': ref_id}).then(x => {
        x.bio.img_url = uploadResult.secure_url
    })

    staffModel.findOneAndUpdate({'account.ref_id': ref_id}, staff)
    
    console.log(uploadResult)
    return uploadResult
}


// STUDENT IMAGE REGISTRATION FUNCTION 
// value is the picture to be inserted 
// ref_id represents the public id of the image after assignment
async function registerStudentImage(ref_id, value) {
    const uploadResult = await cloudinary.uploader.upload(value, {
        public_id: ref_id,
        upload_preset: process.env.UPLOAD_PRESET.toString()
    }).catch(err => {
        return err
    })

    const student = studentModel.findOne({'account.ref_id': ref_id}).then(x => {
        console.log(ref_id)
        console.log(x)
        x.bio.img_url = uploadResult.secure_url
    })

    studentModel.findOneAndUpdate({'account.ref_id': ref_id}, student)
    
    console.log(uploadResult)
    return uploadResult
}


// to register a new staff image in cloudinary 
router.post('/staff/:ref_id', async (req, res) => {
    //checks the Image database to see if the image already exists
    await cloudinary.api.resource(req.params.ref_id).then(async(res) => {
        if(res){
            // if the image exist
            await cloudinary.uploader.destroy(req.params.ref_id).then(async () => {
                const result = await registerStaffImage(req.params.ref_id, req.body.file)
                res.json(result)
            })
        } else {
            const result = await registerStaffImage(req.params.ref_id, req.body.file)
            res.json(result)
        }
    }). catch(async () => {        
        const result = await registerStaffImage(req.params.ref_id, req.body.file)
        res.json(result)
    })
})

// to register a new student image in cloudinary 
router.post('/student/:ref_id', async (req, res) => {
    //checks the Image database to see if the image already exists
    await cloudinary.api.resource(req.params.ref_id).then(async(res) => {
        if(res){
            // if the image exist
            await cloudinary.uploader.destroy(req.params.ref_id).then(async () => {
                const result = await registerStudentImage(req.params.ref_id, req.body.file)
                res.json(result)
            })
        } else {
            const result = await registerStudentImage(req.params.ref_id, req.body.file)
            res.json(result)
        }
    }). catch(async () => {        
        const result = await registerStudentImage(req.params.ref_id, req.body.file)
        res.json(result)
    })
})

module.exports = router 
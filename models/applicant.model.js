const { Schema, model } = require('mongoose')
const studentModel = require('./student.model')

const applicantSchema =  new Schema({
    gen_id: {type: String, default: ""}, 
    pin: {type: String, default: ""}, 
    reverted_messages: [{type: String, default: ""}], 
    available_for_check: {type: Boolean, default: false}, 
    ref_id: {type: String, default: ""}, 
    password: {type: String, default: ""}, 
    info: studentModel.schema
})

const applicantModel = model('Applicant', applicantSchema)

module.exports = applicantModel 
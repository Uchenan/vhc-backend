const { Schema, model } = require("mongoose")

const subjectSingleSchema = new Schema({
    name: {type: String, default: ""}, 
    code: {type: String, default: "", length: 3},
})

const subjectSchema = new Schema({
    name: {type: String, default: ""}, 
    code: {type: String, default: "", length: 3},
    sub_subjects: [subjectSingleSchema]
}, {strict: true})

const subjectModel = model('Subject', subjectSchema)

module.exports = subjectModel
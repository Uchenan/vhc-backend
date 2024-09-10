const { Schema, model } = require('mongoose')

const armsSchema = new Schema({
    department: {type: String, default: "common"},
    bill: {type: String, default: ""},
    subjectPackage: {type: String, default: ""}
}, {strict: true})

const subjectsPermissionsSchema = new Schema({
    code: {type: String, default: ""}, 
    teacher: {type: String, default: ""}
})


const levelSchema = new Schema({
    name: {type: String, default: ""}, 
    code: {type: String, default: ""}, 
    class_teacher: {type: String, default: ""}, 
    arms: [armsSchema],
    subjects_permissions: [subjectsPermissionsSchema]
}, {strict: true})

const levelModel = model('Level', levelSchema)

module.exports = levelModel 
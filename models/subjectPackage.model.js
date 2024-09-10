const { Schema, model } = require("mongoose")
const subjectModel = require('./subject.model')

const subjectPackageSchema = new Schema({
    name: {type: String, default: ""},
    subjects: [subjectModel.schema.obj]
}, {strict: true})

const subjectPackageModel = model('Subjectpackage', subjectPackageSchema)

module.exports = subjectPackageModel 
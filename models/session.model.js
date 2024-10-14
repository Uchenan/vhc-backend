const { Schema, model } = require('mongoose')




// e.g. name_of_assessment: Exam , mark_obtainable: 60
const scoreSchema = new Schema({
    name_of_assessment: {type: String, default: ""}, 
    mark_obtainable: {type: Number, default: 0}
})


// e.g. 
const gradeSchema = new Schema({
    from: {type: Number}, 
    to: {type: Number}, 
    grade: {type: String}, 
    remark: {type: String}
})

const markAllocationSchema = new Schema({
    levels_included: [String], 
    score_type: [scoreSchema]
})

const gradeAllocationSchema = new Schema({
    levels_included: [String], 
    grade_name: {type: String, default: ""},
    grade_type: [gradeSchema]
})

const termSchema = new Schema({
    name: {type: String, default: ""}, 
    scoresheet_code: {type: String, default: ""},
    locked: {type: Boolean, default: true},
    active: {type: Boolean, default: false}
})

const sessionSchema = new Schema({
    name: {type: String, default: ""}, 
    active: {type: Boolean, default: false}, 
    from_year: {type: Number, default: ""},
    to_year: {type: Number, default: ""}, 
    mark_allocation_type: [markAllocationSchema], 
    grade_type: [gradeAllocationSchema], 
    locked: {type: Boolean, default: false},
    terms: [termSchema]
}, {strict: true})

const sessionModel = model('Session', sessionSchema)

module.exports = sessionModel


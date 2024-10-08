const { Schema, model } = require('mongoose')

// e.g. name_of_assessment: Exam , mark_obtainable: 60
const scoreSchema = new Schema({
    name_of_assessment: {type: String, default: ""}, 
    mark_obtainable: {type: Number, default: 0}
})

//e.g. code: jss1, 
// score_setting: [
// {name_of_assessment: C.A. , mark_obtainable: 40},
// {name_of_assessment: Exam , mark_obtainable: 60}]
// total_score: 100
const levelSchema = new Schema({
    code: {type: String, default: ""}, 
    score_setting: [scoreSchema], 
    total_score: {type: Number, default: 100}
})

const termsSchema = new Schema({
    name: {type: String, default: ""}, 
    code: {type: String, default: ""},
    locked: {type: Boolean, default: false},
    levels: [levelSchema]
})

const sessionSchema = new Schema({
    name: {type: String, default: ""}, 
    active: {type: Boolean, default: false}, 
    from_year: {type: Number, default: ""},
    to_year: {type: Number, default: ""}, 
    locked: {type: Boolean, default: false},
    terms: [termsSchema]
}, {strict: true})

const sessionModel = model('Session', sessionSchema)

module.exports = sessionModel


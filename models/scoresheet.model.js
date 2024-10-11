const { Schema, model } = require('mongoose')

const scoreSchema = new Schema({
    name_of_assessment: {type: String, default: ""},
    mark_obtained: {type: Number}
})

const SubjectScoreSchema = new Schema({
    subject: {type: String, default: ""},
    marks: [scoreSchema]
})

const studentSchema = new Schema({
    ref_id: {type: String, default: ""}, 
    level: {type: String, default: ""},
    subject_scores: [SubjectScoreSchema]
})

const scoresheetSchema = new Schema({
    scoresheet_code: {type: String, default: ""}, 
    students:[studentSchema]
})

const scoresheetModel = model('Scoresheet', scoresheetSchema)

module.exports = scoresheetModel 

/*
DEMO SCORESHEET STRUCTURE 
{
    scoresheet_code: "first_2jy7ag3h19", 
    students: [
        {
            ref_id: "24M0001SU", 
            level: : "jss1",
            subject_scores: [
                {
                    subject: "eng", 
                    marks: [
                        {name_of_assessment: "Test 1", mark_obtained: 10},
                        {name_of_assessment: "Test 2", mark_obtained: 16},
                        {name_of_assessment: "Test 1", mark_obtained: 40}
                    ]
                },
                {
                    subject: "mth", 
                    marks: [
                        {name_of_assessment: "Test 1", mark_obtained: 10},
                        {name_of_assessment: "Test 2", mark_obtained: 16},
                        {name_of_assessment: "Test 1", mark_obtained: 40}
                    ]
                },
            ]
        },
        {
            ref_id: "24M0002SU", 
            subject_scores: [
                {
                    subject: "eng", 
                    marks: [
                        {name_of_assessment: "Test 1", mark_obtained: 10},
                        {name_of_assessment: "Test 2", mark_obtained: 16},
                        {name_of_assessment: "Test 1", mark_obtained: 40}
                    ]
                },
                {
                    subject: "mth", 
                    marks: [
                        {name_of_assessment: "Test 1", mark_obtained: 10},
                        {name_of_assessment: "Test 2", mark_obtained: 16},
                        {name_of_assessment: "Test 1", mark_obtained: 40}
                    ]
                },
            ]
        }
    ]
}
*/ 

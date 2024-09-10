const { Schema, model } = require('mongoose')

const bioSchema = new Schema ({
    surname: {type: String, default: ""},
    other_names: {type: String, default: ""},
    date_of_birth: {type: String, default: ""},
    gender: {type: String, default: ""},
    state_of_origin: {type: String, default: ""},
    religion: {type: String, default: ""},
    nationality: {type: String, default: ""},
    blood_group: {type: String, default: ""},
    genotype: {type: String, default: ""},
    student_allergy: {type: String, default: ""},
    state_specific_illness: {type: String, default: ""},
    last_school_attended: {type: String, default: ""},
    class_last_passed: {type: String, default: ""},
    class_last_passed_date: {type: String, default: ""},
    quran_recitation: {type: String, default: ""},
    identification_of_arabic_alphabets: {type: String, default: ""},
    class_to_which_admission_is_sought: {type: String, default: ""},
    img_url: {type: String, default: ""},

})

const accountSchema = new Schema({
    ref_id: {type: String, default: ""},
    password: {type: String, default: ""},
    position: {type: String, default: "student"}, 
    security_question: {type: String, default: ""},
    security_answer: {type: String, default: ""},
    disable_acct: {type: String, default: "no"},
})

const academicSchema = new Schema({
    level: {type: String, default: ""},
    prefect: {type: String, default: ""},
})

const thirdPartySchema = new Schema({
    name: {type: String, default: ""},
    occupation: {type: String, default: ""},
    post: {type: String, default: ""},
    phone_no_one: {type: String, default: ""},
    phone_no_two: {type: String, default: ""},
    email: {type: String, default: ""},
    office_address: {type: String, default: ""},
    residence_address: {type: String, default: ""},
})


const studentSchema = new Schema({
    bio: bioSchema,
    account: accountSchema,
    academic: academicSchema,
    father: thirdPartySchema,
    mother: thirdPartySchema,
    sponsor: thirdPartySchema
}, { strict: true })

const studentModel = model('Student', studentSchema)

module.exports = studentModel 
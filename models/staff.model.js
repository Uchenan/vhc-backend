const { Schema, model } = require("mongoose")

const bioSchema = new Schema ({
    title: {type: String, default: ""},
    surname:  {type: String, default: ""},
    other_names:  {type: String, default: ""},
    gender:  {type: String, default: ""},
    date_of_birth:  {type: String, default: ""},
    state_of_origin:  {type: String, default: ""},
    nationality:  {type: String, default: ""},
    religion:  {type: String, default: ""},
    img_url:  {type: String, default: " "}
})

const accountSchema = new Schema({
    ref_id:  {type: String, default: ""},
    password: {type: String, require: true},
    position:  {type: String, default: ""},
    security_question:  {type: String, default: ""},
    security_answer:  {type: String, default: ""},
    admin_rights:  {type: String, default: ""},
    disable_acct: {type: String, default: "no"}
})

const academicSchema = new Schema({
    class_teacher:  {type: String, default: ""},
    position:  {type: String, default: ""},
    subjects_holding: [ {type: String, default: ""}]
})

const bankSchema = new Schema({
    acct_name:  {type: String, default: ""},
    bank_name:  {type: String, default: ""},
    acct_no:  {type: String, default: ""},
})

const contactSchema = new Schema({
    tel_one:  {type: String, default: ""},
    tel_two:  {type: String, default: ""},
    email:  {type: String, default: ""},
    addr_one:  {type: String, default: ""},
    addr_two:  {type: String, default: ""},
})

const staffSchema = new Schema({
    bio: bioSchema,
    account: accountSchema,
    academic: academicSchema,
    bank: bankSchema, 
    contact: contactSchema 
}, {strict: true})

const staffModel = model('Staff', staffSchema)

module.exports = staffModel 
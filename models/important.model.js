const { model, Schema } = require('mongoose')

const impSchema = new Schema({
    studentNo: {type: Number, default: 0}, 
    staffNo: {type: Number, default: 0}
})

const impModel = model('Important', impSchema)

module.exports = impModel 
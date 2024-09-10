const impModel = require('../models/important.model')

// this function is designed to return an 
// auto generated ID for staffs when they provide just their Gender
// in cases of error, this function will return an empty string
async function generateStaffId(gender){
    let regNo = "", d = "", sex = ""

    const res = await impModel.find({})
    const staffNo = res[0].staffNo.toString()

    // setting the number of the ID
    if(staffNo > 0 && staffNo <=9){
        regNo = "000" + staffNo
    } else if(staffNo > 9 && staffNo <= 99){
        regNo = "00" + staffNo
    } else if(staffNo > 99 && staffNo <= 999){
        regNo = "0" + staffNo
    } else {
        regNo = staffNo 
    }

    // setting the year of the ID 
    let date = new Date()
    d = date.getFullYear().toString().substring(2)

    // setting the gender section of the ID 
    if(gender == "M"){
        sex = "M"
    } else if(gender == "F"){
        sex = "F"
    } else {
        return ""
    }

    // setting the auto generated ID of the new staff
    let result = d + gender + regNo + "SA"

    //incrementing the counter variable in the database
    await impModel.findByIdAndUpdate(res[0]._id, {$inc: {
        staffNo: 1
    }}, {new: true}).catch(() => {
        return ""
    })

    return result 
}

module.exports = generateStaffId 
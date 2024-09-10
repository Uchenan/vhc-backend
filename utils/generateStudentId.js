const impModel = require('../models/important.model')

// this function is designed to return an 
// auto generated ID for students when they provide just their Gender
// in cases of error, this function will return an empty string
async function generateStudentId(gender){
    let regNo = "", d = "", sex = ""

    const res = await impModel.find({})
    const studentNo = res[0].studentNo.toString()

    // setting the number of the ID
    if(studentNo > 0 && studentNo <=9){
        regNo = "000" + studentNo
    } else if(studentNo > 9 && studentNo <= 99){
        regNo = "00" + studentNo
    } else if(studentNo > 99 && studentNo <= 999){
        regNo = "0" + studentNo
    } else {
        regNo = studentNo 
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

    // setting the auto generated ID of the new student
    let result = d + gender + regNo + "SU"

    //incrementing the counter variable in the database
    await impModel.findByIdAndUpdate(res[0]._id, {$inc: {
        studentNo: 1
    }}, {new: true}).catch(() => {
        return ""
    })

    return result 
}

module.exports = generateStudentId 
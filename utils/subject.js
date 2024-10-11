const subjectModel = require('../models/subject.model')
const subjectPackageModel = require('../models/subjectPackage.model')


// a function that list all subjects and subjects in a 
// subjectpackage string 
async function subjectsLister(value){
    console.log(value)
    let result = []
    const subjects = await subjectModel.find({})

    const subjectPackage = await subjectPackageModel.find({name: value})
    console.log(subjectPackage)

    // decoding and extracting all single subjects 
    // that are contained in a subject package
    // and placing them in the result array which will
    // be sent to the requester 
    if(subjectPackage.length > 0){
        subjectPackage[0].subjects.forEach(el => {
            if(el.sub_subjects.length === 0){
                result.push(el)
            } else if(el.sub_subjects.length > 0){
                el.sub_subjects.forEach(sub => {
                    result.push(sub)
                })
            }else {

            }
        })

    }

    return result 

}

module.exports = {subjectsLister}

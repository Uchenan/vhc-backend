// a function that generates the Application ID for a new Applicant 
function generateApplicantID() {
    let initials = "VHC-", length = 7
    let applicantEntries = "0123456789ABCDEFGHIJKLMNPQRTUVWXYZ"
    for(var i = length; i > 0; --i){
        initials += applicantEntries[Math.floor(Math.random() * applicantEntries.length)]
    }

    return initials 
}

function generateApplicantPIN() {
    let result = ""
    let applicantEntries = "0123456789", length = 10
    for(var i = length; i > 0; --i){
        result += applicantEntries[Math.floor(Math.random() * applicantEntries.length)]
    }

    return result 
}

module.exports = { generateApplicantID, generateApplicantPIN }
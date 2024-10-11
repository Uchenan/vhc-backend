function generateTenAlphaNumbericDigits() {
    let result = "",  length = 10
    let applicantEntries = "0123456789ABCDEFGHIJKLMNPQRTUVWXYZ"
    for(var i = length; i > 0; --i){
        result += applicantEntries[Math.floor(Math.random() * applicantEntries.length)]
    }

    return result 
}

module.exports = { generateTenAlphaNumbericDigits }
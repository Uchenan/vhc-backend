// importing relevant libraries 
const express = require('express')
const cors = require("cors")
const app = express()
const staffRouter = require('./routes/staffRoute')
const studentRouter = require('./routes/studentRoute')
const imageRouter = require('./routes/imageRoute')
const applicantRouter = require('./routes/applicantRoute')
const levelRouter = require('./routes/levelRoute')
const authStaffRouter = require('./auth/staff')
const authStudentRouter = require('./auth/student')
const subjectRouter = require('./routes/subjectRoute')
const subjectPackageRouter = require('./routes/subjectPackageRoute')
const sessionRouter = require('./routes/sessionRoute')
const scoresheetRouter = require('./routes/scoresheetRoute')

const { subjectsLister } = require('./utils/subject')

const corsOptions = {
    exposedHeaders: 'vhc_token'
}

// relevant dependencies and database
require('dotenv').config()
require('./db/conn')
app.use(express.json({ limit: '10mb'}))
app.use(express.urlencoded({ limit: '10mb'}))
app.use(cors(corsOptions))


//registering all the routers 
// api level routes 
app.use('/api/staff', staffRouter)
app.use('/api/student', studentRouter)
app.use('/api/image', imageRouter)
app.use('/api/applicant', applicantRouter)
app.use('/api/subject', subjectRouter)
app.use('/api/level', levelRouter)
app.use('/api/subject-package', subjectPackageRouter)
app.use('/api/session', sessionRouter)
app.use('/api/scoresheet', scoresheetRouter)


app.get('/api/test/:subject', async (req, res) => {
    console.log(req.params.subject)
    let result = await subjectsLister(req.params.subject)
    res.json(result)
})

//authenticator routes 
app.use('/api/auth/staff', authStaffRouter)
app.use('/api/auth/student', authStudentRouter)


// launching the server 
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`)
})
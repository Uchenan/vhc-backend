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

const corsOptions = {
    exposedHeaders: 'vhc_token'
}

// relevant dependencies and database
require('dotenv').config()
require('./db/conn')

// app.use(express.urlencoded({  }))
app.use(express.json({ limit: '10mb'}))
app.use(express.urlencoded({ limit: '10mb', extended: true }))
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

//authenticator routes 
app.use('/api/auth/staff', authStaffRouter)
app.use('/api/auth/student', authStudentRouter)


// launching the server 
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`)
})

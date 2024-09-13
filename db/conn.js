const mongoose = require('mongoose')

let DB_USER = process.env.DB_USER 
let DB_PASSWORD = process.env.DB_PASSWORD 
let DB_NAME = process.env.DB_NAME 

let uri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.zfxbe.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`

const connectToDB = async () => {
    try {
        await mongoose.connect(uri)
        console.log("Successfully connected to the Mongo Database")
    } catch(err) {
        console.log(`Connection failed ${err}`)
    }
}

connectToDB()

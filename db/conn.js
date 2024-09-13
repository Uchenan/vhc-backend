const mongoose = require('mongoose')

let DB_USER = process.env.DB_USER 
let DB_PASSWORD = process.env.DB_PASSWORD 
let DB_NAME = process.env.DB_NAME 

let uri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.zfxbe.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`
mongoose.connect(uri).then(() => {
    console.log("Successfully connected to the Mongo Database")
}).catch((err) => {
    console.log(`Connection failed ${err}`)
})

const dbcon = mongoose.connection
dbcon.on("error", (err) => {console.log("Connection error " + err)})
dbcon.once("open", () => { console.log("Database Connected Successfully")})
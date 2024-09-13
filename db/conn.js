const mongoose = require('mongoose')


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("Successfully connected to the Mongo Database")
}).catch((err) => {
    console.log(`Connection failed ${err}`)
})

const dbcon = mongoose.connection
dbcon.on("error", (err) => {console.log("Connection error " + err)})
dbcon.once("open", () => { console.log("Database Connected Successfully")})
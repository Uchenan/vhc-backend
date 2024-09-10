const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Successfully connected to the Mongo Database")
}).catch((err) => {
    console.log(`Connection failed ${err}`)
})


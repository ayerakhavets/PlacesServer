const mongoose = require('mongoose')

// set the database name
const dbName = 'Places'

// connect to the database
mongoose.connect(`mongodb://localhost:27017/${dbName}`)

// get notified if the connection was successful or not
const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => console.log(`${timeLog()} connected to the ${dbName} database`))
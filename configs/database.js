const mongoose = require('mongoose')

// set the database name
const dbName = 'Places'
const dbUrl = 'mongodb43339-minskfood.mycloud.by/'
const userName = 'naruto'
const userPassword = 'uzumaki'
// connect to the database

mongoose.connect(`mongodb://${userName}:${userPassword}@${dbUrl}${dbName}`)

// get notified if the connection was successful or not
const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => console.log(`${timeLog()} connected to the ${dbName} database`))
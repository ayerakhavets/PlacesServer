const mongoose = require('mongoose')

// set the database name
const dbName = 'Places'
const dbUrl = 'mongodb43339-minskfood.mycloud.by/'
const userName = 'naruto'
const userPassword = 'uzumaki'

/*
 connection error: { DisconnectedError: Ran out of retries trying to reconnect to "localhost:27017".
 Try setting `server.reconnectTries` and `server.reconnectInterval` to something higher.
 message: 'Ran out of retries trying to reconnect to "localhost:27017".
 Try setting `server.reconnectTries` and `server.reconnectInterval` to something higher.',
 name: 'DisconnectedError' }
*/

// connect to the database
mongoose.connect(`mongodb://${userName}:${userPassword}@${dbUrl}${dbName}`)

// get notified if the connection was successful or not
const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => console.log(`${timeLog()} connected to the ${dbName} database`))
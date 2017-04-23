import mongoose from "mongoose";

const dbName = 'Places';
const dbUrl = 'mongodb43339-minskfood.mycloud.by/';
const username = 'naruto';
const password = 'uzumaki';

const options = {
    server: { reconnectInterval: 5000 },
    user: username,
    pass: password
};
mongoose.connect(`mongodb://${dbUrl}${dbName}`, options);
//mongoose.connect(`mongodb://localhost:27017/${dbName}`, options);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log(`${timeLog()} ${dbName} database connection opened`));
db.on('reconnected', () => console.log(`${timeLog()} ${dbName} database reconnected`));
db.on('disconnected', () => console.log(`${timeLog()} ${dbName} database disconnected`));

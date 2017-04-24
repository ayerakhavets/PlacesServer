import bodyParser from 'body-parser';
import express    from 'express';
import places     from './routes/places';

const app = express();

// Configure the body-parser to accept urlencoded bodies, json and raw data.
app.use(bodyParser.json())
    .use(bodyParser.urlencoded({extended: true}))
    .use(bodyParser.raw({type: () => true, limit: '5mb'}));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next()
});

app.use(function (req, res, next) {
    console.log(`${timeLog()} request accepted from ${req.session.user} { url: ${req.url}, method: ${req.method} }`);
    next()
});

// API routes (this are prefixed with /places).
app.use('/places', places);

export default app;

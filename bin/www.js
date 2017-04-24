import app  from '../server';
import http from 'http';
import soap from 'soap';
import {myService, xml} from '../services/soap-service';
import '../services/database';

global.timeLog = () => `[${new Date().toLocaleString()}]`;

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);

server.listen(port);

server.on('error', onError);
server.on('listening', onListening);


/** Normalize port into a number, string or false. */
function normalizePort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val      // named pipe
    }
    if (port >= 0) {
        return port     // port number
    }
    return false
}

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error
    }

    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

    // Handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error
    }
}

function onListening() {
    let addr = server.address();
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    console.log(`${timeLog()} listening on ${bind}`);

    // Start SOAP service
    soap.listen(app, '/wsdl', myService, xml)
}

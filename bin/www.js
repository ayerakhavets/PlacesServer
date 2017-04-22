/** Module dependencies.*/

const app = require('../server')
const http = require('http')
const soap = require('soap')
const service = require("../configs/soap-service")
require('../configs/database')

/** Get port from environment and store in Express.*/

const port = normalizePort(process.env.PORT || '3000')
app.set('port', port)

/** Create HTTP server.*/

const server = http.createServer(app);

/** Listen on provided port, on all network interfaces.*/

server.listen(port)

server.on('error', onError)
server.on('listening', onListening)

/** Normalize a port into a number, string, or false.*/

function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val
    }

    if (port >= 0) {
        // port number
        return port
    }

    return false;
}

/** Event listener for HTTP server "error" event.*/

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error
    }

    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges')
            process.exit(1)
            break
        case 'EADDRINUSE':
            console.error(bind + ' is already in use')
            process.exit(1)
            break
        default:
            throw error
    }
}

/** Event listener for HTTP server "listening" event.*/

function onListening() {
    soap.listen(app, '/wsdl', service.myService, service.xml)
    var addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.log('Listening on ' + bind)

    // start SOAP service
    soap.listen(app, '/wsdl', service.myService, service.xml)
}
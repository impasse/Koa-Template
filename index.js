const http = require('http');
const app = require('./app');
const { port, host } = require('./config');

const server = http.createServer(app.callback());

server.listen(port, host, function(){
    const bind = this.address();
    console.log(`server listen at ${bind.address}:${bind.port}`);
});
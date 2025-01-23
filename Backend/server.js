const http = require('http');
const app = require('./app');
require('dotenv').config();

const port = process.env.PORT || 8000;

console.log('Starting server setup...');

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});



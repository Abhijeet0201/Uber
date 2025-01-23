const http = require('http');
const app = require('./app');


const PORT = process.env.PORT ||8000;

const server = http.createServer(app);


//server
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    
});
module.exports=sever;

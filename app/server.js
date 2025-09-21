// small server for local testing. Use `node app/server.js` to start

const http = require('http');
const fs = require('fs');
http.createServer((req, res) => {
    fs.readFile('.' + (req.url === '/' ? '/index.html' : req.url), (err, data) =>
        res.end(err ? 'Not found' : data)
    );
}).listen(8080, () => console.log('Server on http://0.0.0.0:8080'));

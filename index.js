const http = require('http');

function requestLogger(req, res, next) {
    const now = new Date();
    console.log(`[${now.toISOString()}] ${req.method} ${req.url}`);
    next();
}

function handleRequest(req, res) {
    if (req.url === '/') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end('<h2> Hello, Digistar! </h2>');
     } else if (req.url === '/info') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end(`HTTP Version: ${req.httpVersion}\nMethod: ${req.method}\nURL: ${req.url}`);
     } else if (req.url === '/about') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end('<h2> "Hello, Ini Halaman About Digistar!</h2>');
     } else if (req.url === '/submit') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        if(req.method == "POST"){
            res.end('<h2>"Data submitted successfully!</h2>');
        } else {
            res.end('<h2>"Submission failed"</h2>');
        }
     } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end('<h2> Page Not Found </h2>');
     }
}

const server = http.createServer((req, res) => {
    res.setHeader('Set-Cookie', 'name=Digistar-Class; HttpOnly');
    requestLogger(req, res, () => {
        handleRequest(req, res);
    });
});

server.listen(3000, () => {
    console.log('Server running at http://127.0.0.1:3000/');
});

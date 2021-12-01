const http = require('http');

const messages = [];

const server = http.createServer((req, res) => {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, POST, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Accept',  'application/json');

    if (req.method === "GET") {
        if (req.url.match('^/messages$')) {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(messages));
            return;
        }
    }
    if (req.method === "POST") {
        if (req.url.match('^/messages$')) {
            req.body = "";
            req.on('data', function (chunk) {
                req.body += chunk;
            });
            req.on('end', function () {
                const body = JSON.parse(req.body);
                messages.push(body);
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(JSON.stringify(body));
            });

            return;
        }
    }
    res.writeHead(400);
    res.end();
});

server.listen(8888, () => {
    console.log('Server listening on port 8888 ...');
});
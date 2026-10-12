#!/usr/bin/node

const { createServer } = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const hostname = '127.0.0.1';
const port = 8080;

const routes = {
  '/': 'index.html',
  '/index': 'index.html',
  '/about': 'about.html',
  '/contact-me': 'contact.html',
};

const server = createServer((req, res) => {
  let filePath = '';
  let contentType = 'text/html';
  let statusCode = 200;

  if (routes[req.url]) {
    filePath = path.join(__dirname, routes[req.url]);
  } else if (req.url === '/global.css') {
    filePath = path.join(__dirname, 'global.css');
    contentType = 'text/css';
  } else {
    filePath = path.join(__dirname, '404.html');
    statusCode = 404;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      return res.end('500 Internal Server Error');
    }

    res.writeHead(statusCode, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

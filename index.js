#!/usr/bin/node

const express = require('express');
const path = require('node:path');

const hostname = '127.0.0.1';
const port = 8080;

const app = express();

const routes = {
  '/': 'index.html',
  '/about': 'about.html',
  '/contact-me': 'contact.html',
};

for (const [route, file] of Object.entries(routes)) {
  app.get(route, (req, res) => {
    res.sendFile(path.join(__dirname, file));
  });
}

app.get('/global.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'global.css'));
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '404.html'));
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).type('text/plain').send('500 Internal Server Error');
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

'use strict';

const express = require('express');
const app = express();
const http = require('http');

/* pornesc serverul */
let port = process.env.PORT || 3000;
var server = http.createServer(app);
server.listen(port, () => {
  console.log('so pornit pe portul', port);
});


module.exports = app;
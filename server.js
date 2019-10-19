'use strict';

const express = require('express');
const app = express();

/* pornesc serverul */
let port = process.env.PORT || 3000;
var server = http.createServer(app);
server.listen(port, () => {
  console.log('so pornit');
});


module.exports = app;
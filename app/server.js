'use strict';

const express = require('express');

// Constants
const PORT = 9090;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/hello', (req, res) => {
  if(process.env.NODE_IP) { 
    console.log('NODE_IP is set!');
    res.send(process.env.MESSAGE + process.env.NODE_IP);
  } else {  
    res.send('Hello World');
  }
});

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});

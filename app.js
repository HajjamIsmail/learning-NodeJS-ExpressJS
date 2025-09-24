const express = require('express');

// create app express
const app = express();

// middleware => receive response in server
app.use((req, res, next) => {
    console.log('request receive');
    next();
});

// middlewate change code status
app.use((req, res, next) => {
    res.status(201);
    next();
})

// middleware => receive response format json => client
app.use((req, res, next) => {
    res.json({ message: 'request receive successufully'});
    next();
});

// last middleware => we don't need to put next because he is the last middleware
app.use((req, resp) => {
    console.log("response send success");
})

//export app express
module.exports = app;
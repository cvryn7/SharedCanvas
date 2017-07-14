/**
 * This file defines server for the collaborate/shared canvas
 */
const express = require('express');

const app = express();
var port = 3000;

const server = app.listen(port, () => {
    console.log("Server started at port: " + port);
});
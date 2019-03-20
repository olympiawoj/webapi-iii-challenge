// code away!
//This file index.js is in charge of running the server and telling us which port API is listening on
//We must bring in the server from server.js

const port = 5000;

const server = require("./server.js");

server.listen(port, () => console.log(`<----API running on:`, port));

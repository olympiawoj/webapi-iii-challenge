//The file server.js is in charge of confiruing our server & adding routes
//Express is a framework that sits on TOP of the NodeJS Web Server that allows us to build single page applications and build RESTful web services that work w/ JSON.

const express = require("express");
const server = express();
const postsRouter = require("./data/posts/posts-router.js");
const usersRouter = require("./data/users/users-router.js");

server.use(express.json());

server.use("/api/posts", postsRouter);
server.use("/api/users", usersRouter);

server.get("/", (req, res) => {
  res.send("testing testing 123");
});

module.exports = server;

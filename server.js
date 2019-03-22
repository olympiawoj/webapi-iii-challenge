//The file server.js is in charge of confiruing our server & adding routes
//Express is a framework that sits on TOP of the NodeJS Web Server that allows us to build single page applications and build RESTful web services that work w/ JSON.

const express = require("express");
const server = express();

//Router imports
const postsRouter = require("./data/posts/posts-router.js");
const usersRouter = require("./data/users/users-router.js");

// // Custom middleware, capitalize if string
// function capUser(req, res, next) {
//   console.log("You are using capUser ok");
//   const name = req.body.name;
//   return name.charAt(0).toUpperCase() + name.slice(1);
//   next(); //calling next signals that the middleware has finished and should call the next middleware function.
// }

server.use(express.json());

// This would be global middleware
// server.use(capUser);

//routing
server.use("/api/posts", postsRouter);
server.use("/api/users", usersRouter);

server.get("/", (req, res) => {
  res.send("testing testing 123");
});

module.exports = server;

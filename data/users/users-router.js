const express = require("express");

const db = require("./userDb.js");

const router = express.Router();

// // Custom middleware, capitalize if string
//charAT returns the character at the specified index in a string
//slice selects elements starting at given start arg, returns selected elements in an array as new array obj
//split method splits a STRING obj into an array of strings separated by separating the string into substrings using a specified string to determine where to make each split
//Array JOIN method joins elements of an array into a string and return the string, elements separated by specified separator, default is comma

function capUser(req, res, next) {
  if (req.method === "POST" || req.method === "PUT") {
    console.log("You are using capUser ok");
    let upperCaseArray = [];
    const nameArray = req.body.name.split(" ");
    console.log(nameArray);

    for (name of nameArray) {
      upperCaseArray.push(name.charAt(0).toUpperCase() + name.slice(1));
    }

    req.body.name = upperCaseArray.join(" ");
  }
  next(); //calling next signals that the middleware has finished and should call the next middleware function.
}

//Get a list of all users
router.get("/", async (req, res) => {
  try {
    const users = await db.get();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: "Error getting all of the users" });
  }
});

//Get a user with a specific user id
router.get("/:id", async (req, res) => {
  console.log(req.params);
  console.log(req.body);
  try {
    const user = await db.getById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ errorMessage: "Error getting user with specific id" });
  }
});

//Get all posts by specific user ID
router.get("/:id/posts", async (req, res) => {
  console.log(req.params);
  console.log(req.body);
  try {
    const userPosts = await db.getUserPosts(req.params.id);
    console.log(userPosts);
    if (userPosts.length) {
      res.status(200).json(userPosts);
    } else {
      res
        .status(404)
        .json({ message: "The specified user does not have any posts" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "The user's posts could not be retrieved" });
  }
});

//Add a new user to user list
router.post("/", capUser, async (req, res) => {
  console.log(req.params);
  console.log(req.body);
  if (!req.body.name) {
    res.status(404).json({ errorMessage: "Please provide name for user" });
  } else {
    try {
      const user = await db.insert(req.body);
      res.status(201).json(user); //201 = created
    } catch (error) {
      console.log(error);
      res.status(500).json({ errorMessage: "Error adding the post" });
    }
  }
});

//Delete user from user list
router.delete("/:id", async (req, res) => {
  console.log(req.params);
  try {
    const count = await db.remove(req.params.id);
    console.log(count);
    if (count > 0) {
      res.status(200).json({ message: "The user has been removed" });
    } else {
      res.status(404).json({ errorMessage: "The user could not be found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: "Error removing this user" });
  }
});

//Update user
router.put("/:id", capUser, async (req, res) => {
  console.log(req.body);
  if (!req.body.name) {
    res.status(404).json({ errorMessage: "Please provide name for user" });
  } else {
    try {
      const user = await db.update(req.params.id, req.body);
      console.log(user);
      if (user) {
        res.status(200).json({ user });
      } else {
        res.status(204).json({ message: "The user could not be found" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ errorMessage: "Error updating this user" });
    }
  }
});

module.exports = router;

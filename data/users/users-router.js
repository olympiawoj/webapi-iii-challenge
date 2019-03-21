const express = require("express");

const db = require("./userDb.js");

const router = express.Router();

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
router.post("/", async (req, res) => {
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
router.put("/:id", async (req, res) => {
  console.log(req.body);
  if (!req.body.name) {
    res.status(404).json({ errorMessage: "Please provide name for user" });
  } else {
    try {
      const user = await db.update(req.params.id, req.body);
      console.log(user);
      if (user.length) {
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

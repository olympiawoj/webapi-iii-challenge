const express = require("express");

const db = require("./userDb.js");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await db.get();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: "Error getting all of the users" });
  }
});

router.get("/:id", async (req, res) => {
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

module.exports = router;

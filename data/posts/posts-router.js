const express = require("express");

const db = require("./postDb.js");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const posts = await db.get();
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "The posts could not be retrieved" });
  }
});

router.get("/:id", async (req, res) => {
  console.log(req.params);
  console.log(req.body);
  const { id } = req.params;

  try {
    const post = await db.getById(id);
    console.log(post);
    if (post) {
      res.status(200).json(post);
    } else {
      res
        .status(404)
        .json({ message: "The post with the specified id does not exist" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "The post information could not be retrieved" });
  }
});

router.post("/", async (req, res) => {
  console.log(req.params);
  console.log(req.body);
  try {
    const post = await db.insert(req.body);
    res.status(201).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error adding the post" });
  }
});

router.delete("/:id", async (req, res) => {
  console.log(req.params);
  console.log(req.body);
  try {
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

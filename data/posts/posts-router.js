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

  if (req.body.text && req.body.user_id) {
    try {
      const post = await db.insert(req.body);
      res.status(201).json(post);
    } catch (error) {
      console.log(error);
      res.status(500).json({ errorMessage: "Error adding the post" });
    }
  } else {
    res
      .status(404)
      .json({ errorMessage: "Please provide text and user id for the post" });
  }
});

router.delete("/:id", async (req, res) => {
  console.log(req.params);
  console.log(req.body);
  try {
    const count = await db.remove(req.params.id);
    console.log(count);
    if (count > 0) {
      res.status(200).json({ message: "The post has been removed" });
    } else {
      res.status(404).json({ errorMessage: "The post could not be found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: "Error removing the post" });
  }
});

router.put("/:id", async (req, res) => {
  console.log(req.params);
  console.log(req.body);
  if (req.body.text && req.body.user_id) {
    try {
      const post = await db.update(req.params.id, req.body);
      console.log(post);
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(204).json({ message: "The post could not be found" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error updating the post" });
    }
  } else {
    res
      .status(404)
      .json({ errorMessage: "Please provide text and user id for the post" });
  }
});

module.exports = router;

//first send function to asynchronous
//then pull in await, which will wait for promise resolve
//get it sdata, and from there do w/e u want for data...

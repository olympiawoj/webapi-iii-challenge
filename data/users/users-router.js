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

module.exports = router;

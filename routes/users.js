const express = require("express");
const { createUser, validate, newUsers } = require("../models/user");
const users = require("../data/users.json");
const router = express.Router();
const fs = require("fs");

router.get("/", (req, res) => {
  res.json(users);
});

router.get("/:id", (req, res) => {
  res.json(req.params);
});

const writeUsers = (json) => {
  fs.writeFile("data/users.json", JSON.stringify(json), (err) =>
    console.log(err)
  );
};

router.post("/", (req, res) => {
  const { name, email } = req.body;

  const { error } = validate(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  res.setHeader("Content-Type", "application/json");

  const user_id = users.map((user) => user.id);

  const new_user = users.concat({
    id: (user_id.length > 0 ? Math.max(...user_id) : 0) + 1,
    name,
    email,
  });

  writeUsers(new_user);
  res.json(new_user);

  const user = new newUsers({
    name: name,
    email: email,
  });

  createUser(user);
});

module.exports = router;

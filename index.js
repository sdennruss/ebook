const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");
const users = require("./data/users.json");
const departure = require("./data/departuresTable.json");
const app = express();
const port = 5000;

app.use(bodyParser.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/tse", (req, res) => {
  res.json(departure);
});

app.post("/users", (req, res) => {
  const { name, email } = req.body;

  const user_id = users.map((user) => user.id);

  const user = {
    id: (user_id.length > 0 ? Math.max(...user_id) : 0) + 1,
    name,
    email,
  };

  res.setHeader("Content-Type", "application/json");
  const new_user = users.concat(user);
  fs.writeFile("./data/users.json", JSON.stringify(new_user), (err) =>
    console.log(err)
  );

  res.json(new_user);
});

app.listen(port, () => {
  console.log(`Listening for port: ${port}`);
});

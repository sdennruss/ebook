const express = require("express");
const { logger, authenticate } = require("./middleware/logger");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const morgan = require("morgan");
const config = require("config");
const users = require("./routes/users");
const tse = require("./routes/tse");

const app = express();

app.use(bodyParser.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(logger);
app.use(authenticate);
app.use("/users", users);
app.use("/tse", tse);

mongoose
  .connect("mongodb://localhost:27017/users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));
mongoose.set("useCreateIndex", true);

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  console.log("Morgan enabled...");
}

console.log("Application Name: " + config.get("name"));

module.exports = app;

// app.post("/users", (req, res) => {
//   const { name, email } = req.body;

//   const user_id = users.map((user) => user.id);

//   const token = jwt.sign(
//     {
//       sub: (user_id.length > 0 ? Math.max(...user_id) : 0) + 1,
//       name: name,
//       email: email,
//     },
//     "mykey",
//     { expiresIn: "3 hours" }
//   );

//   res.setHeader("Content-Type", "application/json");
//   const new_user = users.concat(token);
//   fs.writeFile("./data/users.json", JSON.stringify(new_user), (err) =>
//     console.log(err)
//   );
//   res.status(200).send({ access_token: new_user });
// });

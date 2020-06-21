const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const Cors = require("cors");
const travels = require("./data/travels.json");

const app = express();
const port = 5000;

app.use(Cors());
app.options("*", Cors());

app.use(bodyParser.json());

app.get("/travels/savings", (req, res) => {
  res.json(travels);
});

const writeTravels = (json) => {
  fs.writeFile("./data/travels.json", JSON.stringify(json), (err) =>
    console.log(err)
  );
};

app.post("/travels/savings", (req, res) => {
  const {
    payWeek,
    income1,
    income2,
    fixedExpenses,
    variableExpenses,
    travelSavings,
    travelSavingsTotal,
  } = req.body;

  const travel_ids = travels.map((travel) => travel.id);

  const new_travels = travels.concat({
    id: (travel_ids.length > 0 ? Math.max(...travel_ids) : 0) + 1,
    payWeek,
    income1,
    income2,
    fixedExpenses,
    variableExpenses,
    travelSavings,
    travelSavingsTotal,
  });

  writeTravels(new_travels);

  res.json(new_travels);
});

app.put("/travels/savings/:id", (req, res) => {
  const { id } = req.params;

  const old_travels = travels.find((travel) => travel.id === parseInt(id));

  [
    "payWeek",
    "income1",
    "income2",
    "fixedExpenses",
    "variableExpenses",
    "travelSavings",
    "travelSavingsTotal",
  ].forEach((key) => {
    if (req.body[key]) old_travels[key] = req.body[key];
  });

  writeTravels(travels);

  res.json(travels);
});

app.delete("/travels/savings/:id", (req, res) => {
  const { id } = req.params;
  const new_travels = travels.filter((travel) => travel.id !== parseInt(id));

  writeTravels(new_travels);

  res.json(new_travels);
});
app.listen(port, () => {
  console.log(`Listening for port: ${port}`);
});

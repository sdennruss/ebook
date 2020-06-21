const mongoose = require("mongoose");
const Joi = require("joi");
const users = require("../data/users.json");

async function createUser(user) {
  try {
    if (user.email !== users.email) return await user.save();
  } catch (ex) {
    for (field in ex.errors) console.log(ex.errors[field].message);
  }
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 200,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    maxlength: 250,
    required: true,
    trim: true,
    unique: true,
  },
});

const newUsers = mongoose.model("newUsers", userSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(5).max(250).required().email({ minDomainAtoms: 2 }),
  };

  return Joi.validate(user, schema);
}

exports.createUser = createUser;
exports.newUsers = newUsers;
exports.validate = validateUser;

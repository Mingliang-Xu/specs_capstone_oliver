const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { SECRET } = process.env;
const { User } = require("../models/user");

const createToken = (username, id) => {
  return jwt.sign(
    {
      username,
      id,
    },
    SECRET,
    { expiresIn: "2 days" }
  );
};

module.exports = {
  register: async (req, res) => {
    try {
      const { username, password } = req.body;
      let foundUser = await User.findOne({ where: { username } });
      if (foundUser) {
        res.status(400).send("User already exists!");
      } else {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const newUser = await User.create({ username, hashedPass: hash });
        const token = createToken(newUser.username, newUser.id);
        const exp = Date.now() + 1000 * 360 * 48;
        res.status(200).send({
          username: newUser.username,
          userId: newUser.id,
          token,
          exp,
        });
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send("Something went wrong registering. Try again later!");
    }
  },
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      let foundUser = await User.findOne({ where: { username } });
      if (!foundUser) {
        res.status(400).send("User not found, please register first!");
      } else {
        const isAuthenticated = bcrypt.compareSync(
          password,
          foundUser.hashedPass
        );
        if (!isAuthenticated) {
          res.status(401).send("Please enter the correct password!");
        } else {
          const token = createToken(foundUser.username, foundUser.id);
          const exp = Date.now() + 1000 * 360 * 48;
          res.status(200).send({
            username: foundUser.username,
            userId: foundUser.id,
            token,
            exp,
          });
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Something went wrong logging in. Try again!");
    }
  },
};

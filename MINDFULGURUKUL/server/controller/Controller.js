const User = require("../models/User");
const PropUser = require("../models/PropUser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    console.log("entered");
    const { name, email, pass, gender, phone, state, city } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(401).send({ exists: 1 });
    }

    const encPass = await bcrypt.hash(pass, 10);

    const user = await User.create({
      email,
      pass: encPass,
      name,
      state,
      city,

      gender,
      phone,
    });

    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.JWT_SECRET,
      {
        expiresIn: "5h",
      }
    );
    user.token = token;
    res.status(201).json({ userD: user, success: true });
    console.log("did success");
  } catch (error) {
    console.log(error);
    res.send(500).send({ success: false });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, pass } = req.body;
    console.log(req.body);
    if (!(email && pass)) {
      res.status(400).send("Field is missing");
    }

    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(pass, user.pass))) {
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.JWT_SECRET,
        {
          expiresIn: "5h",
        }
      );
      const userid = user._id;
      const name = user.name;
      const age = user.age;

      res.status(200).json({ success: true, email, userid, name, age });
    } else {
      res.status(400).json({ resp: "Incorrect Email or Password" });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.fetchProps = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.find({ _id: id });
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: true });
  }
};

exports.addUser = async (req, res) => {
  const id = req.params.id;
  const { name, email, phone } = req.body;

  try {
    const newuser = {
      name,
      email,
      phone,
    };
    await User.findOneAndUpdate(
      { _id: id },
      { $push: { propsUsers: newuser } },
      { new: true }
    );
    res.send({ ok: true });
  } catch (error) {
    console.log(eror);
    res.send({ ok: false });
  }
};

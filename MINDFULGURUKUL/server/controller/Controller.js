const User = require("../models/User");

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
  const { id, filter } = req.params;

  try {
    if (filter === "atoz") {
      const user = await User.find({ _id: id }).sort({ "propsUsers.name": 1 });
      res.status(200).send(user);
    } else {
      const user = await User.find({ _id: id }).sort({ "propsUsers.name": -1 });
      res.status(200).send(user);
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: true });
  }
};
exports.findNested = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findOne({
      "propsUsers._id": id,
    });
    if (!user) {
      return res.status(404).json({ message: "Nested object not found" });
    }

    // Access details within the nested object
    const nestedObject = await user.propsUsers.find(
      (item) => item._id.toString() === id
    );
    if (!nestedObject) {
      return res
        .status(404)
        .json({ message: "Object not found in propsUsers" });
    }
    res.send(nestedObject);
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
exports.editProps = async (req, res) => {
  const pid = req.params.pid;
  const uid = req.params.uid;
  const { name, phone, email } = req.body;
  console.log(uid, pid);
  console.log(req.body);

  // Data to update the object
  console.log("fired");

  try {
    console.log("et try");
    const user = await User.findOne({
      _id: uid,
    });
    console.log("et try2");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the index of the object within the nested by its ID
    const objectIndex = user.propsUsers.findIndex(
      (obj) => obj._id.toString() === pid
    );
    console.log("et try3");
    if (objectIndex === -1) {
      return res
        .status(404)
        .json({ message: "Object not found in propsUsers" });
    }

    // Update the specific object within the nested array
    if (name) {
      user.propsUsers[objectIndex].name = name;
    }
    if (email) {
      user.propsUsers[objectIndex].email = email;
    }
    if (phone) {
      user.propsUsers[objectIndex].phone = phone;
    }

    await user.save(); // Save the updated User object

    res.status(200).json({
      message: "Object updated successfully",
      updatedObject: user.propsUsers[objectIndex],
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

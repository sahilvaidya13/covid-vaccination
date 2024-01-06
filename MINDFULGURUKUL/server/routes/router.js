const express = require("express");
const router = express.Router();

const {
  register,
  login,
  fetchProps,
  addUser,
  findNested,
  editProps,
} = require("../controller/Controller");

// router.post("/in", signin);
// router.post("/up", signup);

router.post("/signup", register);
router.post("/login", login);
router.get("/fetchProps/:id", fetchProps);
router.post("/addUser/:id", addUser);
router.get("/findNested/:id", findNested);
router.post("/editProps/:uid/:pid", editProps);

module.exports = router;

const express = require("express");
const router = express.Router();
const path = require("path");

router.use(express.static(path.join(__dirname, "../react-project/build")));

router.get("/test", function (req, res) {
  console.log(req.isAuthenticated());
  console.log("fdafas");
  res.json("dddd");
});

router.get("/user/authentication", (req, res) => {
  console.log(req.isAuthenticated());
  if (req.isAuthenticated()) {
    res.send(true);
  } else {
    res.send(false);
  }
});
router.get("/user/who", (req, res) => {
  if (req.isAuthenticated()) {
    res.send(req.user.id);
  } else {
    res.send(null);
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const path = require("path");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const bcrypt = require("bcrypt");

const { User } = require("../models");
const { status } = require("express/lib/response");

router.use(express.json());

// router.use(express.static(path.join(__dirname, "../react-project/build")));

router.post("/signup", async (req, res) => {
  const { id, pwd, name } = req.body;
  try {
    const hash = await bcrypt.hash(req.body.pwd, 12);
    const user = await User.create({
      id: req.body.id,
      pw: hash,
      name: req.body.name,
    });
    console.log("계정 추가 성공");
    res.send({ id: 1, message: "확인" });
  } catch (error) {
    console.log("4");
    const message = "중복된 아이디 입니다.";
    console.log(message);
    res.send({ id: 2, message });
  }
});

router.post("/user/login", passport.authenticate("local"), (req, res) => {
  res.send("dd");
});

router.get("/user/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = router;

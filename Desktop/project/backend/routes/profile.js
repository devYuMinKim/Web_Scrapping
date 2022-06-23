const express = require("express");
const router = express.Router();
const { Image, Introduction } = require("../models");

router.get("/data/photo", async (req, res) => {
  console.log("/data/photo");
  try {
    //DB에서 이미지 경로, 이름 등을 받아서 프론트에서 요청한곳으로 이 데이터들을 보내는 코드
    const imgData = await Image.findAll({
      attributes: ["imgName", "imgLocate"],
      where: {
        imgLocate: "profileImg",
      },
    });
    res.json(imgData);
  } catch (err) {
    console.log(err);
  }
});

router.get("/data/profile", async (req, res) => {
  console.log("/data/photo");

  try {
    const profileData = await Introduction.findAll({
      attributes: ["name", "introduction"],
    });
    res.json(profileData);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;

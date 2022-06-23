const express = require("express");
const router = express.Router();
const path = require("path");
const { Image, User } = require("../models");
const multer = require("multer");
const fs = require("fs");

router.use("/", express.static(path.join(__dirname, "../public")));

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "public/img/album");
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      console.log(ext);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  resourceLimits: { fileSize: 5 * 1024 * 1024 }, // 용량제한(바이트 단위) , 5mb
});

router.get("/data/photo", async (req, res) => {
  try {
    const imgData = await Image.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
      attributes: [
        "id",
        "imgName",
        "imgLocate",
        "imgDescription",
        "imgTitle",
        "user_id",
      ],
      where: {
        imgLocate: "album",
      },
    });
    console.log(imgData);
    res.json(imgData);
  } catch (err) {
    console.log(err);
  }
});

router.post("/img/delete", async (req, res) => {
  try {
    await Image.destroy({
      where: {
        id: req.body.imgNum,
      },
    });
  } catch (error) {}
  try {
    fs.unlinkSync("public/img/album/" + req.body.imgName);
  } catch (error) {
    console.log(error);
  }

  res.send("받음");
});

router.post("/img", upload.array("img"), async (req, res) => {
  try {
    await Image.create({
      imgName: req.files[0].filename,
      imgLocate: req.files[0].destination.slice(11),
      imgTitle: req.body.img_title,
      imgDescription: req.body.img_des,
      user_id: req.body.user_id,
    });
    res.json('전송완료')
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;

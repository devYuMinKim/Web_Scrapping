const express = require("express");
const router = express.Router();
const { Cal } = require("../models");

router.post("/data", async (req, res) => {
  console.log(req.body);

  try {
    await Cal.create({
      title: req.body.title,
      start: req.body.start,
      end: req.body.end,
      user_id: req.body.id,
    });
    return res.send("succsess");
  } catch (err) {
    console.log(err);
  }
});

router.get("/data", async (req, res) => {
  try {
    const data = await Cal.findAll({
      attributes: ["id", "title", "start", "end"],
    });
    return res.json(data);
  } catch (error) {}
});

router.delete("/delete", async (req, res) => {
  console.log(req.body);
  try {
    await Cal.destroy({
      where: {
        id: req.body.id,
        user_id: req.body.user,
      },
    });
    return res.send("succsess");
  } catch (err) {
    console.log(err);
    return res.send({ message: "user is not defined" });
  }
});

module.exports = router;

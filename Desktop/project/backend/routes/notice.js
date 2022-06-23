const express = require("express");
const router = express.Router();
const { Notice, User, Reply } = require("../models");
const sequelize = require("sequelize");
const Op = sequelize.Op;

router.post("/upload", async (req, res) => {
  try {
    await Notice.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.body.user,
    });
    res.send("gg");
  } catch (err) {
    console.log(err);
  }
});

router.get("/search/data/:search/:page", async (req, res) => {
  console.log(req.params);
  try {
    const data = await Notice.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
      attributes: [
        "id",
        "title",
        [
          sequelize.fn("date_format", sequelize.col("createdAT"), "%Y-%m-%d"),
          "createdAt",
        ],
        "user_id",
      ],
      where: {
        title: {
          [Op.like]: "%" + req.params.search + "%",
        },
      },
      limit: 10,
    });
    res.json(data);
  } catch (err) {
    console.log(err);
  }
});

router.get("/data/:id", async (req, res) => {
  console.log("1");
  console.log(req.params);
  if (req.params)
    try {
      const data = await Notice.findAll({
        include: [
          {
            model: User,
            attributes: ["name"],
          },
        ],
        attributes: [
          "id",
          "title",
          [
            sequelize.fn("date_format", sequelize.col("createdAT"), "%Y-%m-%d"),
            "createdAt",
          ],
          "user_id",
        ],
        limit: 10,
        offset: (req.params.id - 1) * 10,
      });
      res.json(data);
    } catch (err) {
      console.log(err);
    }
});

router.get("/page/cnt", async (req, res) => {
  console.log;
  const { count, rows } = await Notice.findAndCountAll({});
  res.json(count);
});

router.get("/search/page/cnt/:search", async (req, res) => {
  console.log("들어옴");
  const { count, rows } = await Notice.findAndCountAll({
    where: {
      title: {
        [Op.like]: "%" + req.params.search + "%",
      },
    },
  });
  console.log(count);
  res.json(count);
});

router.get("/detail/data/:id", async (req, res) => {
  console.log("2");
  console.log(req.params);
  try {
    const data = await Notice.findOne({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
      attributes: [
        "id",
        "title",
        "content",
        "user_id",
        [
          sequelize.fn("date_format", sequelize.col("createdAT"), "%Y-%m-%d"),
          "date_col_formed",
        ],
      ],
      where: {
        id: req.params.id,
      },
    });
    // console.log(data)
    res.json(data);
  } catch (err) {
    console.log(err);
  }
});

router.get("/reply/data/:id", async (req, res) => {
  try {
    const data = await Reply.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
      attributes: [
        "content",
        [
          sequelize.fn("date_format", sequelize.col("createdAT"), "%Y-%m-%d"),
          "createdAT",
        ],
        "user_id",
      ],
      where: {
        notice_id: req.params.id,
      },
    });
    console.log(data);
    res.json(data);
  } catch (err) {
    console.log(err);
  }
});

router.post("/reply/upload", async (req, res) => {
  console.log(req.body);
  try {
    const res = await Reply.create({
      content: req.body.content,
      notice_id: req.body.id,
      user_id: req.body.user,
    });
    console.log(res);
  } catch (error) {
    console.log(error);
  }

  res.send("good");
});

router.post("/update", async (req, res) => {
  console.log(req.body);
  try {
    const res = await Notice.update(
      { title: req.body.title, content: req.body.content },
      {
        where: {
          id: req.body.id,
        },
      }
    );
    console.log(res);
  } catch (error) {
    console.log(error);
  }

  res.send("good");
});

router.post("/delete", async (req, res) => {
  console.log(req.body);

  try {
    Notice.destroy({
      where: {
        id: req.body.id,
      },
    });
    res.send("dd");
  } catch (error) {
    {
      console.log(error);
    }
  }
});

module.exports = router;

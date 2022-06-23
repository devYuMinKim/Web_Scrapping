const express = require("express");
const app = express();
const path = require("path");
const logger = require("morgan");
const { sequelize } = require("./models");
const dotenv = require("dotenv");
const indexRouter = require("./routes/index");
const albumRouter = require("./routes/album");
const profileRouter = require("./routes/profile");
const authRouter = require("./routes/auth");
const noticeRouter = require("./routes/notice");
const calRouter = require("./routes/cal");
const bcrypt = require("bcrypt");
const { User } = require("./models");

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");

app.use(
  session({
    secret: "abcdefg!@#",
    secure: false,
    resave: true,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

dotenv.config();
app.set("port", process.env.PORT || 3000);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });
app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());

passport.use(
  new LocalStrategy(
    {
      usernameField: "id",
      passwordField: "pwd",
      session: true,
    },
    async function (inputId, inputPwd, done) {
      try {
        const user = await User.findOne({
          attributes: ["id", "pw"],
          where: {
            id: inputId,
          },
        });
        if (user == null) {
          console.log("test");
          return done(null, false, { message: "존재하지 않는 아이디" });
        }
        if (await bcrypt.compare(inputPwd, user.pw)) {
          return done(null, user);
        } else {
          return done(null, false, { message: "비번틀림" });
        }
      } catch (err) {
        console.log(err);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  console.log("seri");
  console.log(user.id);
  done(null, user.id);
});
/* 이 세션 데이터를 가진 사람을 db에서 찾아주세요/ 어느페이지에서든 발ㅇ */
passport.deserializeUser(async function (user_id, done) {
  try {
    const user = await User.findOne({
      attributes: ["id"],
      where: {
        id: user_id,
      },
    });
    return done(null, user);
  } catch (error) {
    return done(err);
  }
});

app.use("/album", albumRouter);
app.use("/profile", profileRouter);
app.use("/auth", authRouter);
app.use("/notice", noticeRouter);
app.use("/cal", calRouter);
app.use("/", indexRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./react-project/build/index.html"));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404), `${req.method} ${req.url} 라우터가 없습니다.`);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 서버 실행 대기중");
});

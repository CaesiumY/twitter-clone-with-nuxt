const passport = require("passport");
const bcrypt = require("bcrypt");
const { Strategy: LocalStrategy } = require("passport-local");
const db = require("../models");

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          const existUser = await db.User.findOne({ where: { email } });

          if (!existUser) {
            return done(null, false, { reason: "User not found" }); // 1번째는 에러 메시지, 2번째는 성공시 유저 리턴, 3번째는 옵션으로 보내주는 실패 메시지
          }

          const isSamePassword = await bcrypt.compare(
            password,
            existUser.password
          );

          if (isSamePassword) {
            return done(null, existUser); // seiralizeUser로 넘겨줌
          } else {
            return done(null, false, { reason: "Incorrect Password" });
          }
        } catch (error) {
          console.error(error);
          return done(error);
        }
      }
    )
  );
};

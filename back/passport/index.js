const passport = require("passport");
const local = require("./local");
const db = require("../models");

module.exports = () => {
  passport.serializeUser((user, done) => {
    return done(null, user.id); // deserializeUser의 콜백 매개 변수로 보냄
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await db.User.findOne({
        where: { id },
        attributes: ["id", "nickname"],
      });

      return done(null, user);
    } catch (error) {
      console.error(error);
      return done(error);
    }
  });

  local();
};

require("dotenv").config();
import jwt from "jsonwebtoken";
import passport from "passport";
import googlOAuth from "passport-google-oauth20";
import { userModel } from "../database/user";

const GoogleStrategy = googlOAuth.Strategy;

export default (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:4100/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        //creating a new user object

        const newUser = {
          fullname: profile.displayName,
          email: profile.emails[0].value,
          profilePic: profile.photos[0].value,
        };
        try {
          const user = await userModel.findOne({ email: newUser.email });
          //   const { _id, fullname, email } = user;
          if (user) {
            const token = jwt.sign(
              { user: { fullname, email } },
              process.env.JWT_SECRET,
              { expiresIn: "30d" }
            );
            done(null, { user, token });
          } else {
            const user = await userModel.create(newUser);
            const { _id, fullname, email } = user;
            const token = jwt.sign(
              { user: { _id, fullname, email } },
              process.env.JWT_SECRET,
              { expiresIn: "30d" }
            );
            done(null, { user, token });
          }
        } catch (error) {
          done(error, null);
        }
      }
    )
  );
  passport.serializeUser((userData, done) => done(null, { ...userData }));
  passport.deserializeUser((id, done) => done(null, id));
};

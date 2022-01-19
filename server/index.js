require("dotenv").config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import passport from "passport";
import session from "express-session";
import googleAuthConfig from "./config/google.config";
import routerConfig from "./config/route.config";

const port = process.env.PORT || 4100;
const app = express();

//Passport config
googleAuthConfig(passport);

app.use(session({ secret: "SECRET" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use("/auth/", require("./API/Auth"));
app.use("/restaurant/", require("./API/Restaurant"));
app.use("/food/", require("./API/Food"));
app.use("/menu/", require("./API/Menu"));
app.use("/image/", require("./API/Images"));
app.use("/orders/", require("./API/Orders"));
app.use("/reviews/", require("./API/Reviews"));
app.use("/users/", require("./API/User"));

//DB connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successful"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.json("Server is working properly");
});

app.listen(port, () => {
  console.log("Server is running on Port " + port);
});

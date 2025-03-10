require("dotenv").config();
const path = require("path");
const express = require("express");
const userRoute = require("./routes/user.js");
const blogRoute = require("./routes/blog.js");
const blog = require("./models/blog.js");
const connecttomongodb = require("./connection.js");
const cookieparser = require("cookie-parser");
const { checkforauthentication } = require("./middlewares/authentication.js");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 8000;


console.log(`Views directory: ${path.resolve("./views")}`);
console.log(`Serving static files from: ${path.resolve("./public")}`);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use(cookieparser());
app.use(checkforauthentication("token"));
app.use(express.static(path.join(__dirname, "public")));


connecttomongodb(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.get("/", async (req, res) => {
  try {
    const allblogs = await blog.find({});
   return res.render("home", { user: req.user, blogs: allblogs });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.use("/", userRoute);
app.use("/blog", blogRoute);

app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));

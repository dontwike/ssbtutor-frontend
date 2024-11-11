const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const verifyToken = require("./middleware/Authorization");
const dotenv = require("dotenv").config();
const AuthRouter = require("./routes/Auth");
const CloudinaryRouter = require("./routes/Cloudinary");
const PPDTRouter = require("./routes/ppdtRoutes");
const cors = require("cors");

app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Adjust to your frontend's origin
  })
);

app.use("/", AuthRouter);
app.use("/", CloudinaryRouter.router);
app.use("/", PPDTRouter.router)

app.listen(process.env.PORT, () => {
  console.log("listening to port " + process.env.PORT);
});

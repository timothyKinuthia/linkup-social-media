require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

//IMPORTS
const errorHandler = require("./middlewares/error");

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

const URI = process.env.MONGO_URI;

mongoose.connect(
  URI,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("CONNECTED TO MONGODB SUCCESSFULLY");
  }
);

//ROUTES

app.use("/api", require("./routes/authRoute"));
app.use("/api", require("./routes/userRoute"));
app.use("/api", require("./routes/postRoutes"));
app.use("/api", require("./routes/commentRoutes"));
app.use("/api", require("./routes/notifyRoutes"));
app.use("/api", require("./routes/messageRouter"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("there was an error");
  });
}


app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`app is running on port ${port}`));

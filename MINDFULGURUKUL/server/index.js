const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");
const url = process.env.DB_URL;

const cors = require("cors");
const app = express();
app.use(
  cors({
    origin: "*",
  })
);

mongoose.connect(url);
const con = mongoose.connection;

con.on("open", () => {
  console.log("DB Connected");
});

app.use(express.json());

app.use("/api", require("./routes/router"));
app.listen(PORT, () => {
  console.log(`Listening to Port: ${PORT}..`);
});

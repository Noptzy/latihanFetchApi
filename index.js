const express = require("express");
const cors = require("cors");
const sequelize = require("./src/config/db.js");
const userRoutes = require("./src/routes/userRoutes.js");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

app.use(
  cors({
    origins: "*",
  })
);
app.use(express.json());

app.use("/api", userRoutes);

sequelize.sync().then(() => {
  console.log("Database connected");
  app.listen(PORT, () => {
    console.log("Server is running on port 3000");
  });
});

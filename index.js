const express = require("express");
const cors = require("cors");
const Routes = require("./src/routes/api.js");
require("dotenv").config();

const app = express();
const port = process.env.PORT;
const corsOptions = { origin: "*" };

app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", Routes);

app.use((req, res) => {
  return res.status(404).json({ erro: "404 Not Found" });
});

app.listen(port, () => {
  console.log(`server running at port ${port}`);
});

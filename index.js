const express = require("express");
const db = require("./config/connection");
const routes = require("./routes");

const PORT = process.env.PORT || 5555;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}!`);
  });
});
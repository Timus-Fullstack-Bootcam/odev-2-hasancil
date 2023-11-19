const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = 3000;

app.get("/", (req, res) => {
  res.status(200).send("Hi There!");
});

app.use("/api/v1", routes);

app.listen(PORT);
console.log(`Server is running on ${PORT} `);

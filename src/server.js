const express = require("express");
const routes = require("./routes");
const error404 = require("./error-handlers/404");
const error500 = require("./error-handlers/500");

const app = express();

app.use(routes);
app.use(error404);
app.use(error500);

const start = (opts) => {
  const { PORT } = opts;
  app.listen(PORT, () => {
    console.log("Started on port", PORT);
  });
};

module.exports = { start, app };

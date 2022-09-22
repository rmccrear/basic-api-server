const express = require("express");
const routes = require("./routes");

const app = express();

app.use(routes);

const start = (opts) => {
    const {PORT} = opts;
    app.listen(PORT, ()=>{
        console.log("Started on port", PORT);
    });
}

module.exports = {start, app};

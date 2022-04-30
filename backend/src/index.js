const createError = require("http-errors");
const express = require('express');

const apiRouter = require('./routes/api.js');

const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/', apiRouter);

app.use(function (req, res, next) {
    next(createError(404));
});

app.use(function (err, req, res) {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    res.status(err.status || 500);
    res.render("error");
});


app.listen(8080, () => console.log('Listening correctly'));

module.exports = app;
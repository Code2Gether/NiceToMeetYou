"use strict";
exports.__esModule = true;
var express_1 = require("express");
var morgan_1 = require("morgan");
require('./src/config/database');
var app = express_1["default"]();
app.use(morgan_1["default"]('dev'));
app.use(express_1["default"].json());
app.get('/*', function (req, res) {
    res.status(404).json({ message: "Path doesn't exist2" });
});
exports["default"] = app;

"use strict";
exports.__esModule = true;
var app_1 = require("./app");
var port = process.env.PORT || 3001;
app_1["default"].listen(port, function () {
    console.log("Server is running on port " + port);
});

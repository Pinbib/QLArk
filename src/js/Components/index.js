const Import = require("./Import.js");
const Namespace = require("./Namespace.js");
const Field = require("./Field.js");
const Comment = require("./Comment.js");
const Log = require("./Log.js");
const Let = require("./Let.js");
const Func = require("./Function.js");
const ReturnPromise = require("./ReturnPromise.js");

module.exports = {Import, Namespace, Field, Comment, Log, Let, Func, ReturnPromise, reqs: require("./Requests")};
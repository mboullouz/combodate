"use strict;"

var browserify = require("browserify");
var fs = require("fs");
var glob = require("glob");
var mkdirp = require("mkdirp");
var Umd = require("browserify-umdify");
var util = require("util");

mkdirp.sync("./temp");

var packageJson = require("./package.json");
var distOutFileUnversioned = "./dist/umd.js";
var distOutUnversioned = fs.createWriteStream(distOutFileUnversioned, { encoding: "utf-8", flags: "w" })

var bundled = browserify({
	extensions: [".js", ".json"],
	debug: true
})
	.require("./dist/ListboxDatePicker.js", { expose: "ListboxDatePicker" })
	.bundle()
	.pipe(new Umd());

bundled.pipe(distOutUnversioned);

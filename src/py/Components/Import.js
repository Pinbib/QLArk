const {basename, extname} = require("path");

// from {from} import {name};

class Import extends String {
	constructor(name, from) {
		super(`from ${basename(from, extname(from))} import ${name}\n`);
	}
}

module.exports = Import;
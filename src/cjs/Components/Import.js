// const {name} = require(`{from}`);

class Import extends String {
	constructor(name, from) {
		super(`const ${name} = require("${from.replace(/\\/gm, "/")}");\n`);
	}
}

module.exports = Import;
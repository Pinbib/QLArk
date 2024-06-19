// import {name} from `{from}`;

class Import extends String {
	constructor(name, from) {
		super(`import ${name} from "${from.replace(/\\/gm, "/")}";\n`);
	}
}

module.exports = Import;
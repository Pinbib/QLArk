// let {name}: string = {value()};

class Let extends String {
	constructor(name, value) {
		super(`\t\t\tlet ${name}: string = ${value()};\n`);
	}
}

module.exports = Let;
// let {name} = {value()};

class Let extends String {
	constructor(name, value) {
		super(`\t\t\tlet ${name} = ${value()};\n`);
	}
}

module.exports = Let;
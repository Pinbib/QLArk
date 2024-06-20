// {name} = {value()}

class Let extends String {
	constructor(name, value) {
		super(`\t\t\t${name} = ${value()}\n`);
	}
}

module.exports = Let;
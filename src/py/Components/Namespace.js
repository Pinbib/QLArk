// class {name}:
// 	{value()}
//

class Namespace extends String {
	constructor(name, value) {
		super(`class ${name}:\n${value()}\n\n`);
	}
}

module.exports = Namespace;
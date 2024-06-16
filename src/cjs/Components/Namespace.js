// class {name}{
// 	{value()}
// }
//
// module.exports = {name};

class Namespace extends String {
	constructor(name, value) {
		super(`class ${name} {\n${value()}\n}\n\nmodule.exports = ${name};\n`);
	}
}

module.exports = Namespace;
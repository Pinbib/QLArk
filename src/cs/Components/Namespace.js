// class {name}{
// 	{value()}
// }
//
// export default {name};

class Namespace extends String {
	constructor(name, value) {
		super(`class ${name} {\n${value()}\n}\n\nexport default ${name};\n`);
	}
}

module.exports = Namespace;
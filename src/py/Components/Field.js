// @staticmethod
// def {name}({...args}):
// 	{value()}
//

class Field extends String {
	constructor(name, args, value) {
		super(`\t@staticmethod\n\tdef ${name}(${args.toString()}):\n${value()}\n\t`);
	}
}

module.exports = Field;
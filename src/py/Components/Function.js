// def {name}():
//	global {global}
// 	return {value()}
//

class Func extends String {
	constructor(name, value, global) {
		super(`\t\t\tdef ${name}():\n\t\t\t\tglobal ${global}\n\t\t\t\treturn ${value()}\n\t\t\t\n`);
	}
}

module.exports = Func;
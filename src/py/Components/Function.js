// def {name}():
//	nonlocal {global}
// 	return {value()}
//

class Func extends String {
	constructor(name, value, global) {
		super(`\t\t\tdef ${name}():\n\t\t\t\tnonlocal ${global}\n\t\t\t\treturn ${value()}\n\t\t\t\n`);
	}
}

module.exports = Func;
// function {name}(): Promise<string>{
// 	return {value()};
// }

class Func extends String {
	constructor(name, value) {
		super(`\t\t\tfunction ${name}(): Promise<string>{\n\t\t\t\treturn ${value()}\n\t\t\t}\n`);
	}
}

module.exports = Func;
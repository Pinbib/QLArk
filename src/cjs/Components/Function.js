// function {name}(){
// 	return {value()};
// }

class Func extends String {
	constructor(name, value) {
		super(`\t\t\tfunction ${name}(){\n\t\t\t\treturn ${value()}\n\t\t\t}\n`);
	}
}

module.exports = Func;
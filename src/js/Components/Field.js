// static {name}({...args}){
// 	{value()}
// }

class Field extends String {
	constructor(name, args, value) {
		super(`\tstatic ${name}(${args.toString()}){\n${value()}\n\t}`);
	}
}

module.exports = Field;
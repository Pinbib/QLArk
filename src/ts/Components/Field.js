// export function {name}({...args}: string): Promise<string[]>{
// 	{value()}
// }

// TODO: look at that after testing

class Field extends String {
	constructor(name, args, value) {
		super(`\texport function ${name}(${args.join(": string, ")}): Promise<string[]>{\n${value()}\n\t}`);
	}
}

module.exports = Field;
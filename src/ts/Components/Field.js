// export function {name}({...args}: string): Promise<string[]>{
// 	{value()}
// }

// TODO: look at that after testing

class Field extends String {
	constructor(name, args, value) {
		let args_ = "";
		args.forEach((arg, i) => {
			args_ += arg + ": string" + (args.length === (i + 1) ? "" : ", ");
		});
		
		super(`\texport function ${name}(${args_}): Promise<string[]>{\n${value()}\n\t}`);
	}
}

module.exports = Field;
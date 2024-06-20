// console.log({value});

class Log extends String {
	constructor(value) {
		super(`\t\t\tprint(f\"${value}\");\n`);
	}
}

module.exports = Log;
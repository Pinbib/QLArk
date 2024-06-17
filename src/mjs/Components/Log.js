// console.log({value});

class Log extends String {
	constructor(value) {
		super(`\t\t\tconsole.log(\`${value}\`);\n`);
	}
}

module.exports = Log;
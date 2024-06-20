// return [{names}];

class ReturnPromise extends String {
	constructor(names) {
		super(`\n\t\t\treturn [${names}]`);
	}
}

module.exports = ReturnPromise;
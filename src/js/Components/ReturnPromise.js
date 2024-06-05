// return Promise.all([{names}]);

class ReturnPromise extends String {
	constructor(names) {
		super(`\n\t\t\treturn Promise.all([${names}]);`);
	}
}

module.exports = ReturnPromise;
// fetch({url}, {method: "DELETE"});

class DELETE extends String {
	constructor(url) {
		super(`fetch(\`${url}\`, {method: "DELETE"});`);
	}
}

module.exports = DELETE;
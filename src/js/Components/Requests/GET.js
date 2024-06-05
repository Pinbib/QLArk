// fetch({url}, {method: "GET"});

class GET extends String {
	constructor(url) {
		super(`fetch(\`${url}\`, {method: "GET"});`);
	}
}

module.exports = GET;
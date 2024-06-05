// fetch({url}, {method: "HEAD"});

class HEAD extends String {
	constructor(url) {
		super(`fetch(\`${url}\`, {method: "HEAD"});`);
	}
}

module.exports = HEAD;
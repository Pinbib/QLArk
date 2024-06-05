// fetch({url}, {method: "OPTIONS"});

class OPTIONS extends String {
	constructor(url) {
		super(`fetch(\`${url}\`, {method: "OPTIONS"});`);
	}
}

module.exports = OPTIONS;
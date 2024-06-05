// fetch({url}, {method: "PUT", headers: {"Content-Type": "application/json"}, body: {body}});

class PUT extends String {
	constructor(url, body) {
		super(`fetch(\`${url}\`, {method: "PUT", headers: {"Content-Type": "application/json"}, body: \`${body}\`});`);
	}
}

module.exports = PUT;
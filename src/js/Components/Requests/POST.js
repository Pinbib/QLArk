// fetch({url}, {method: "POST", headers: {"Content-Type": "application/json"}, body: {body}});

class POST extends String {
	constructor(url, body) {
		super(`fetch(\`${url}\`, {method: "POST", headers: {"Content-Type": "application/json"}, body: \`${body}\`});`);
	}
}

module.exports = POST;
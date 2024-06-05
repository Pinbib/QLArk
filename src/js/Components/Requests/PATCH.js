// fetch({url}, {method: "PATCH", headers: {"Content-Type": "application/json"}, body: {body}});

class PATCH extends String {
	constructor(url, body) {
		super(`fetch(\`${url}\`, {method: "PATCH", headers: {"Content-Type": "application/json"}, body: ${body}});`);
	}
}

module.exports = PATCH;
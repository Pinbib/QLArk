// axios({url: `{url}`, method: `{method}`});
class Request extends String {
	constructor(url, method) {
		super(`axios({url: \`${url}\`, method: \`${method}\`});`);
	}
}

module.exports = Request;
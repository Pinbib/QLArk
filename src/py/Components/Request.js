// request("{method}", f"{url}")
class Request extends String {
	constructor(url, method) {
		super(`request("${method}", f"${url}")`);
	}
}

module.exports = Request;
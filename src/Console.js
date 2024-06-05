const qp = require("qp-color");

class Console {
	constructor() {
	}

	static log(text) {
		return qp.wb(text);
	}

	static error(text) {
		return qp.rb(text);
	}

	static info(text) {
		return qp.yb(text);
	}

	static confirm(text) {
		return qp.gb(text);
	}

	static glog(title, text) {
		let txt = qp.wb(title);

		if (arguments.length > 1) {
			for (let i = 0; i < text.length; i++) {
				txt += qp.wi("\n    " + text[i]);
			}
		}

		return txt;
	}

	static gerror(title, text) {
		let txt = qp.rb(title);

		if (arguments.length > 1) {
			for (let i = 0; i < text.length; i++) {
				txt += qp.ri("\n    " + text[i]);
			}
		}

		return txt;
	}

	static ginfo(title, text) {
		let txt = qp.yb(title);

		if (arguments.length > 1) {
			for (let i = 0; i < text.length; i++) {
				txt += qp.yi("\n    " + text[i]);
			}
		}

		return txt;
	}

	static gconfirm(title, text) {
		let txt = qp.gb(title);

		if (arguments.length > 1) {
			for (let i = 0; i < text.length; i++) {
				txt += qp.gi("\n    " + text[i]);
			}
		}

		return txt;
	}
}

module.exports = Console;
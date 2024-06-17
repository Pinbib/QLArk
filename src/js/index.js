const fs = require("fs");
const path = require("path");
const qp = require("qp-color");
const reader = require("../reader.js");
const Com = require("./Components");
const {Import, Namespace, Field, Comment, Log, Func, reqs, Let, ReturnPromise} = require("./Components");

function genUrl(url, data = {}) {
	try {
		if (typeof url == "string" && url.trim() !== "") {
			let _url = url.trim();
			if (data) {
				Object.keys(data).forEach((el, i) => {
					if (data[el]) {
						let val = data[el];
						if (typeof val == "string") val = val.trim();
						else if (typeof val == "object") val = JSON.stringify(val).trim();
						if (i === 0) _url += `?${el}=${val}`;
						else _url += `&${el}=${val}`;
					}
				});
				return _url;
			} else return _url;
		} else throw new Error();
	} catch (err) {
		return;
	}
}

function build() {
	return new Promise((resolve, reject) => {
		let files = fs.readdirSync(config.from).filter(val => fs.statSync(path.join(config.from, val)).isFile() && path.extname(path.join(config.from, val)) === ".ql").map(val => path.join(config.from, val));

		try {
			files = files.map((src) => (
				{
					name: path.basename(src, path.extname(src)),
					src: src,
					...reader(src)
				}
			));
		} catch (err) {
			if (err) {
				console.log(qp.rb("An error occurred while reading files."));
				console.log(err.message);
				return;
			}
		}

		let moduleList = {};

		files.forEach(file => moduleList = {...moduleList, ...file.moduleList});

		moduleList = Object.keys(moduleList).map(name => new Import(name, moduleList[name]));

		let namespace = new Namespace(config.name, function () {
			return files.map(file => {
				let args = Object.keys(file.varList).filter(name => file.varList[name] === undefined);
				let funcList = [];

				return new Field(file.name, args, function () {
					let coms = [];
					let com = file.ComList;

					Object.keys(file.varList).filter(name => file.varList[name] !== undefined).forEach(name => {
						coms.push(new Let(name, function () {
							if (typeof file.varList[name] === "object") {
								return file.varList[name].value;
							} else {
								return "`" + file.varList[name] + "`";
							}
						}));
					});

					for (let i = 0; i < com.length; i++) {
						switch (com[i].type) {
							case "COMMENT":
								if (config.comment) {
									coms.push(new Comment(com[i].value));
								}
								break;
							case "LOG":
								coms.push(new Log((() => {
									switch (com[i].settings.color) {
										case "yellow":
											return qp.yb(com[i].value);
										case "green":
											return qp.gb(com[i].value);
										case "red":
											return qp.rb(com[i].value);
										default:
											return qp.wb(com[i].value);
									}
								})()));
								break;
							case "GET":
								coms.push(new Func("func" + funcList.length, () => {
									funcList.push("func" + funcList.length + "()");
									return new reqs.GET(genUrl(com[i].url, com[i].arg));
								}));
								break;
							case "POST":
								coms.push(new Func("func" + funcList.length, () => {
									funcList.push("func" + funcList.length + "()");
									return new reqs.POST(com[i].url, JSON.stringify(com[i].arg));
								}));
								break;
							case "PUT":
								coms.push(new Func("func" + funcList.length, () => {
									funcList.push("func" + funcList.length + "()");
									return new reqs.PUT(com[i].url, JSON.stringify(com[i].arg));
								}));
								break;
							case "PATCH":
								coms.push(new Func("func" + funcList.length, () => {
									funcList.push("func" + funcList.length + "()");
									return new reqs.PATCH(com[i].url, JSON.stringify(com[i].arg));
								}));
								break;
							case "HEAD":
								coms.push(new Func("func" + funcList.length, () => {
									funcList.push("func" + funcList.length + "()");
									return new reqs.HEAD(genUrl(com[i].url, com[i].arg));
								}));
								break;
							case "DELETE":
								coms.push(new Func("func" + funcList.length, () => {
									funcList.push("func" + funcList.length + "()");
									return new reqs.DELETE(genUrl(com[i].url, com[i].arg));
								}));
								break;
							case "OPTIONS":
								coms.push(new Func("func" + funcList.length, () => {
									funcList.push("func" + funcList.length + "()");
									return new reqs.OPTIONS(genUrl(com[i].url, com[i].arg));
								}));
								break;
						}
					}

					coms.push(new ReturnPromise(funcList.toString()));

					return coms.join("");
				});
			}).join("\n");
		});

		resolve(moduleList.join("") + namespace);
	});
}

module.exports = build;
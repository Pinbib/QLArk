const fs = require("fs");
const path = require("path");
const Console = require("./Console.js");

const devNull = require('dev-null');

function mutLog(callback) {

	const originalStdoutWrite = process.stdout.write;
	const originalStderrWrite = process.stderr.write;
	const originalStdinWrite = process.stdin.write;

	process.stdout.write = devNull();
	process.stderr.write = devNull();
	process.stdin.write = devNull();

	callback();

	process.stdout.write = originalStdoutWrite;
	process.stderr.write = originalStderrWrite;
	process.stdin.write = originalStdinWrite;

}

function reader(src) {
	let ComList = [];
	const varList = {
		__version: process.env.VERSION
	};
	const moduleList = {};

	let emit = false;

	const lines = fs.readFileSync(src, "utf-8").split("\n").filter(val => val.trim() !== "");

	let Com = {};
	for (let i = 0; i < lines.length; i++) {
		const stop = () => {
			ComList = undefined;
			Com = {};
			i += lines.length * 2;
		};

		const line = lines[i].trim().replace(/\s+/gm, " ").replace(/@(\S+)\s?/gm, (m, word) => `\${${word.toLowerCase()}}`).split(" ");

		switch (line[0]) {
			case "$":
				if (line[1]) {
					if (line[2]) {
						if (line[2] === "=") {
							if (line[3]) {
								varList[line[1].toLowerCase()] = line.slice(3).join(" ");
							} else {
								throw new Error(Console.error("A variable assignment was started but was set to an empty value."));
								stop();
							}
						} else if (line[2] === "::") {
							if (line[3]) {
								if (moduleList[line[3].toLowerCase()]) {
									varList[line[1].toLowerCase()] = {
										value: `${line[3].toLowerCase()}(${JSON.stringify(line.slice(4))})`
									};
								} else {
									console.log(Console.info("Module " + line[3] + " was not found."));
									Com.arg[line[1]] = undefined;
								}
							} else {
								throw new Error(Console.error("A variable assignment was started but was set to an empty value."));
								stop();
							}
						} else {
							throw new Error(Console.error("The appointment symbol should be equal to \"=\" or \"::\"."));
							stop();
						}
					} else {
						varList[line[1]] = undefined;
					}
				} else {
					throw new Error(Console.error("No variable name was specified."));
					stop();
				}
				break;
			case "?":
				if (Com.url && Com.type) {
					if (!Com.arg) Com.arg = {};
					if (line[1]) {
						if (line[2]) {
							if (line[2] === "=") {
								if (line[3]) {
									Com.arg[line[1]] = line.slice(3).join(" ");
								} else {
									throw new Error(Console.error("The purpose of the argument was launched, but an empty value was set."));
									stop();
								}
							} else if (line[2] === "::") {
								if (line[3]) {
									if (moduleList[line[3].toLowerCase()]) {
										Com.arg[line[1]] = `${line[3].toLowerCase()}(${JSON.stringify(line.slice(4))})`;
									} else {
										Console.info("Module " + line[3] + " was not found.");
										Com.arg[line[1]] = undefined;
									}
								} else {
									throw new Error(Console.error("The purpose of the argument was launched, but an empty value was set."));
									stop();
								}
							} else {
								throw new Error(Console.error("The appointment symbol should be equal to \"= \" or \"::\"."));
								stop();
							}
						} else {
							console.log(Console.info("Empty arguments will not be added to the request."));
						}
					} else {
						console.log(Console.error("The name of the argument was not set."));
					}
				} else {
					throw new Error(Console.error("You can not add arguments without creating a request."));
					stop();
				}
				break;

			case "<<<":
				if (!Com.log) {
					Com.log = true;
					Com.options = {
						ERROR: true,
						SUCCESS: true,
						REQUEST: true,
						REQUEST_END: true
					};
					Com.log.type = "Console";

					if (line.includes("ERROR")) {
						Com.options.ERROR = !Com.options.ERROR;
					}

					if (line.includes("SUCCESS")) {
						Com.options.SUCCESS = !Com.options.SUCCESS;
					}

					if (line.includes("REQUEST")) {
						Com.options.REQUEST = !Com.options.REQUEST;
					}

					if (line.includes("REQUEST_END")) {
						Com.options.REQUEST_END = !Com.options.REQUEST_END;
					}
					Com.close = true;
					ComList.push(Com);
					Com = {};
				} else {
					throw new Error(Console.error("You can not change the type of output after determination."));
					stop();
				}
				break;

			case "!":
				if (line[1]) {
					ComList.push({
						type: "LOG",
						settings: {
							color: (() => {
								if (line.includes("--red")) {
									line.splice(line.indexOf("--red"), 1);
									return "red";
								} else if (line.includes("--green")) {
									line.splice(line.indexOf("--green"), 1);
									return "green";
								} else if (line.includes("--yellow")) {
									line.splice(line.indexOf("--yellow"), 1);
									return "yellow";
								}
							})()
						},
						value: line.slice(1).join(" ")
					});
				}
				break;
			case "#":
				if (line[1]) {
					if (line[2]) {
						if (!moduleList[line[1].toLowerCase()]) {
							let pat = path.resolve(line.slice(2).join(" "));

							if (fs.existsSync(pat) || emit) {
								try {
									if (emit) {
										moduleList[line[1].toLowerCase()] = line.slice(2).join(" ");
										break;
									}

									let mod;

									mutLog(() => {
										mod = require(pat);
									});

									if (typeof mod === "function") {
										moduleList[line[1].toLowerCase()] = line.slice(2).join(" ");
									} else {
										throw new Error(Console.error("A module must be a function."));
										stop();
									}
								} catch (err) {
									if (err) {
										throw new Error(Console.gerror("Error which trying import module.", ["Error: \n" + JSON.stringify(err, null, 2)]));
										stop();
									}
								}
							} else {
								throw new Error(Console.error("The file: " + pat + " does not exist."));
								stop();
							}
						} else {
							throw new Error(Console.error("Modules cannot be overwritten."));
							stop();
						}
					} else {
						throw new Error(Console.error("No module path was specified."));
						stop();
					}
				} else {
					throw new Error(Console.error("No module name was specified."));
					stop();
				}
				break;
			case "//":
				if (line[1]) {
					ComList.push({
						type: "COMMENT",
						value: line.slice(1).join(" ")
					});
				}
				break;
			case "~":
				emit = !emit;
				break;
			default:
				if (["GET", "DELETE", "POST", "PUT", "PATCH", "HEAD", "OPTIONS"].includes(line[0])) {
					if (!Com.type) {
						if (line[1]) {
							Com.url = line.slice(1).join(" ");
							Com.type = line[0];
						} else {
							throw new Error(Console.error("The request path was not introduced."));
							stop();
						}
					} else {
						throw new Error(Console.error("You cannot change the type of request."));
						stop();
					}
				}
				break;
		}
	}

	return {ComList, varList, moduleList};
}

module.exports = reader;
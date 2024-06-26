process.env.VERSION = "0.0.8";

global.QLArk = "\n" + "░██████╗░██╗░░░░░░█████╗░██████╗░██╗░░██╗\n" + "██╔═══██╗██║░░░░░██╔══██╗██╔══██╗██║░██╔╝\n" + "██║██╗██║██║░░░░░███████║██████╔╝█████═╝░\n" + "╚██████╔╝██║░░░░░██╔══██║██╔══██╗██╔═██╗░\n" + "░╚═██╔═╝░███████╗██║░░██║██║░░██║██║░╚██╗\n" + "░░░╚═╝░░░╚══════╝╚═╝░░╚═╝╚═╝░░╚═╝╚═╝░░╚═╝\n\n";

const fs = require("fs");
const path = require("path");

const VCate = require("vcate").default;
const qp = require("qp-color");
const prompt = require("prompts");
const xml = require("xml-js");

const Config = require("./Config.js");

const builders = require("./Builders.js");

const cat = new VCate(process.argv);

cat.add("init", async function () {
	try {
		if (fs.existsSync(path.join("./", "qlark.config.xml"))) {
			let {confirm} = await prompt({
				type: "confirm",
				message: qp.wb("Do you want to overwrite the configuration file?"),
				name: "confirm"
			});

			if (!confirm) {
				return;
			}
		}

		let {name} = await prompt({
			type: "text",
			message: qp.wb("Please enter namespace/name: "),
			name: "name",
			validate: val => val.trim() === "" ? qp.rb("The name/namespace cannot be empty.") : true
		});

		let {lang} = await prompt({
			type: "select",
			message: qp.wb("What language will it be compiled into?"),
			name: "lang",
			choices: [
				{title: "Browser JavaScript", value: "js", disabled: false},
				{title: "NodeJS CommonJS", value: "cjs", disabled: false},
				{title: "NodeJS ESM", value: "mjs", disabled: false},
				{title: "Python", value: "py", disabled: false},
				{title: "TypeScript", value: "ts", disabled: false},
				{title: "CSharp", value: "cs", disabled: true},
				{title: "Go", value: "go", disabled: true}
			]
		});

		let {comment} = await prompt({
			type: "confirm",
			message: qp.wb("Save comments?"),
			name: "comment"
		});

		let {from} = await prompt({
			type: "text",
			message: qp.wb("Specify the directory from which the project will be built: "),
			name: "from",
			validate: src => fs.existsSync(path.resolve(src)) && fs.statSync(path.resolve(src)).isDirectory() ? true : "The path does not exist or does not lead to a directory..."
		});

		let {to} = await prompt({
			type: "text",
			message: qp.wb("Specify the directory to which the project will be built: "),
			name: "to",
			validate: val => val.trim() === "" ? qp.rb("The path cannot be empty.") : true
		});

		fs.writeFile(path.join("./", "qlark.config.xml"), xml.json2xml(JSON.stringify({
			"_declaration": {
				"_attributes": {
					"version": "1.0",
					"encoding": "utf-8"
				}
			},
			QLArk: {
				namespace: name,
				language: {
					"_attributes": {
						id: lang
					}
				},
				comment: {
					"_attributes": {
						save: comment
					}
				},
				from: {
					"_attributes": {
						src: from
					}
				},
				to: {
					"_attributes": {
						src: to
					}
				}
			}
		}), {compact: true, spaces: 4}), (err) => {
			if (!err) {
				console.log(qp.gb("The project has been successfully initialized!"));
			} else {
				console.log(qp.rb("An error occurred while writing the configuration file..."));
			}
		});
	} catch (err) {
		if (err) {
			console.log(qp.rb("An error occurred while initializing..."));
		}
	}
}, {});

cat.add("run", () => {
	if (!fs.existsSync(path.join("./", "qlark.config.xml"))) {
		console.log(qp.yb("No configuration file found. Initialize the project before running."));
		return;
	}

	try {
		global.config = new Config(fs.readFileSync(path.join("./", "qlark.config.xml")));
	} catch (err) {
		if (err) {
			console.log(qp.rb("An error occurred while reading the configuration: ") + qp.ri(err.message));
			return;
		}
	}

	if (builders[config.lang.toLowerCase()]) {
		builders[config.lang.toLowerCase()]().then((value) => {
			fs.mkdirSync(config.to, {recursive: true});
			fs.writeFile(path.join(config.to, config.name + "." + config.lang), value.toString(), {encoding: "utf-8"}, (err) => {
				if (!err) {
					console.log(qp.gb("The project has been successfully built!"));
				} else {
					console.log(qp.rb("An error occurred while building the project..."));
				}
			});
		}).catch((err) => {
			if (err) {
				console.log(qp.rb("An error occurred during construction: ") + qp.ri(err.message));
			}
		});
	} else {
		console.log(qp.yb(`Builder ${config.lang} does not exist or it was incorrectly specified...`));
	}
});

cat.add("inspect", (args, flags, opts) => {
	if (opts.src) {
		if (fs.existsSync(opts.src)) {
			if (path.extname(opts.src) === ".ql") {
				try {
					require("./reader.js")(opts.src);
					console.log(qp.gb("All is well! No errors were found."));
				} catch (err) {
					if (err) {
						console.log(qp.rb("An error was detected: ") + qp.ri(err.message));
					}
				}
			} else {
				console.log(qp.rb("The file has an unsupported extension."));
			}
		} else {
			console.log(qp.rb(`The path ${qp.ri(opts)} does not exist`));
		}
	} else {
		console.log(qp.ri("No path was specified."));
	}
}, {
	src: (args) => {
		if (args[0]) {
			return path.resolve(args.join(" "));
		}
	}
});

cat.alias("inspect", "--i");

cat.add("version", () => {
	console.log(qp.gb("QLArk: ") + qp.yi("v" + process.env.VERSION));
});

cat.alias("version", "v", "--v");

cat.listen();
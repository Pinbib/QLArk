const {exec} = require("child_process");
const fs = require("fs");
const path = require("path");
const Console = require("./src/Console.js");

const VERSION = "0.0.3";

const platforms = ["linux", "macos", "win"];

const file = path.parse(path.basename("./src/QLArk.js")).name;


platforms.forEach(el => {
	if (fs.existsSync(path.join("./", "PKG", el, file)) || fs.existsSync(path.join("./", "PKG", el, file + ".exe"))) {
		if (el === "win") {
			fs.renameSync(path.join("./", "PKG", el, file + ".exe"), path.join("./", "PKG", el, file + VERSION + ".exe"));
		} else {
			fs.renameSync(path.join("./", "PKG", el, file), path.join("./", "PKG", el, file + VERSION));
		}
	}

	exec(`npx pkg ./src/QLArk.js --targets node18-${el} --output ./PKG/${el}/QLArk`, (err) => {
		if (err) {
			Console.error(`Error witch building file in the ${el}.`);
			console.log(err);
		} else {
			Console.confirm(`Building file in the ${el} successful.`);
		}
	});
});
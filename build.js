const {exec} = require("child_process");
const Console = require("./src/Console.js");

const platforms = ["linux", "macos", "win"];
platforms.forEach(el => {
	exec(`npx pkg ./src/QLArk.js --targets node18-${el} --output ./PKG/${el}/QLArk`, (err) => {
		if (err) {
			Console.error(`Error witch building file in the ${el}.`);
			console.log(err);
		} else {
			Console.confirm(`Building file in the ${el} successful.`);
		}
	});
});
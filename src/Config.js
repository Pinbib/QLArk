const xml = require("xml-js");
const {existsSync, statSync} = require("fs");
const {resolve} = require("path");

class Config {
	constructor(config) {
		config = JSON.parse(xml.xml2json(config, {compact: true}));

		if (config.QLArk) {
			let {namespace, language, comment, from, to} = config.QLArk;

			if (!namespace) throw new Error("QLArk.namespace does not exist...");
			if (!language) throw new Error("QLArk.language does not exist...");
			if (!from) throw new Error("QLArk.from does not exist...");
			if (!to) throw new Error("QLArk.to does not exist...");
			if (!comment) this.comment = false;

			if (namespace._text) {
				this.name = namespace._text;
			} else throw new Error("QLArk.namespace cannot be empty...");

			if (language?._attributes?.id) {
				this.lang = language._attributes.id;
			} else throw new Error("QLArk.language[\"id\"] cannot be empty...");

			if (comment?._attributes?.save) {
				try {
					this.comment = comment._attributes.save === "true";
				} catch (err) {
					if (err) throw new Error("QLArk.comment[\"save\"] an incorrect value was specified...");
				}
			} else {
				this.comment = false;
			}

			if (from?._attributes?.src) {
				if (existsSync(from._attributes.src) && statSync(from._attributes.src).isDirectory()) {
					this.from = resolve(from._attributes.src);
				} else throw new Error("QLArk.from[\"src\"] path does not exist or is not a directory...");
			} else throw new Error("QLArk.from[\"src\"] cannot be empty...");

			if (to?._attributes?.src) {
				this.to = resolve(to._attributes.src);
			} else throw new Error("QLArk.to[\"src\"] cannot be empty...");
		} else throw new Error("Config.QLArk does not exist...");
	}
}

module.exports = Config;
// // {value}

class Comment extends String {
	constructor(value) {
		super(`\t\t\t// ${value}\n`);
	}
}

module.exports = Comment;
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = mongoose.model(
	"User",
	new mongoose.Schema({
		username: String,
		password: String,
		role: String,
	})
);

db.card = mongoose.model(
	"Card",
	new mongoose.Schema({
		title: String,
		description: String,
		image_url: String,
		username: String,
		index: String,
	})
);

module.exports = db;

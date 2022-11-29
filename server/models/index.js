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

db.ROLES = ["user", "admin"];

module.exports = db;

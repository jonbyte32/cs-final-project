const express = require("express");
const cors = require("cors");
const crypto = require("crypto-js");
const app = express();

const send = (res, data, code) => {
	res.status(code || 200).send(JSON.stringify(data));
};

var corsOptions = {
	origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("../server/models");
db.mongoose
	.connect(
		`mongodb+srv://admin:3hQFp7bbVBPEYes9@cluster0.vrelktt.mongodb.net/?retryWrites=true&w=majority`,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}
	)
	.then(() => {
		console.log("Successfully connect to MongoDB.");
	})
	.catch((err) => {
		console.error("MongoDB Connection Error", err);
		process.exit();
	});

// set port, listen for requests
const PORT = 8080;
app.listen(PORT, () => {
	db.user
		.findOne({
			username: "admin",
		})
		.exec((err, user) => {
			if (err) {
				console.log(err);
				return;
			}
			if (!user) {
				db.user.create({
					username: "admin",
					password: crypto.AES.encrypt("password", "secret-key"),
					role: "admin",
				});
			}
		});

	console.log(`Server is running on port ${PORT}.`);
});

app.get("/", (req, res) => {
	send(res, {});
});

app.post("/login", (req, res, next) => {
	const body = req.body;
	db.user
		.findOne({
			username: body.username,
		})
		.exec((err, user) => {
			if (err) {
				send(
					res,
					{
						ok: false,
						err: "Internal Server Error",
					},
					500
				);
				return;
			}
			if (!user) {
				send(
					res,
					{
						ok: false,
						err: "User Does Not Exist",
					},
					400
				);
				return;
			}

			send(res, {
				ok: true,
				err: null,
				role: user.role,
			});
			console.log("Logged in as: " + body.username);
		});
});

app.post("/signup", (req, res, next) => {
	const body = req.body;

	db.user
		.findOne({
			username: body.username,
		})
		.exec((err, user) => {
			if (err) {
				send(res, false, 500);
				return;
			}
			if (user) {
				send(res, false, 400);
				return;
			}

			next();
		});
});

app.post("/signup", (req, res) => {
	const body = req.body;
	db.user.create({
		username: body.username,
		password: crypto.AES.encrypt(body.password, "secret-key"),
		role: "user",
	});
	send(res, true);
});

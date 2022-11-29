const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
const app = express();

const send = (res, data, code) => {
	res.status(code || 200).send(JSON.stringify(data));
};

const hash = (string) => {
	return crypto.createHash("sha256").update(string).digest("base64");
};

var corsOptions = {
	origin: "*",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
// app.use(express.urlencoded({ extended: true }));

const test_cards = [
	{
		title: "Card 1",
		description: "Hello World 1",
		image_url:
			"http://thewowstyle.com/wp-content/uploads/2015/01/nature-images..jpg",
		username: "admin",
	},
	{
		title: "Card 2",
		description: "Hello World 2",
		image_url: "http://getwallpapers.com/wallpaper/full/e/2/6/618308.jpg",
		username: "Jon",
	},
];

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
					password: hash("password"),
					role: "admin",
				});
			}
		});

	console.log(`Server is running on port ${PORT}.`);
});

app.get("/", (req, res) => {
	send(res, {});
});

app.post("/login", (req, res) => {
	const body = req.body;
	const token = body.stored ? body.password : hash(body.password);
	console.log(`login : ${body.username} : ${token}`);
	db.user
		.findOne({
			username: body.username,
			password: token,
		})
		.exec((err, user) => {
			if (err) {
				send(
					res,
					{
						ok: false,
						err: "internal server error",
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
						err: "user does not exist",
					},
					400
				);
				return;
			}

			send(res, {
				ok: true,
				err: null,
				username: body.username,
				role: user.role,
				token: token,
			});
		});
});

app.post("/signup", (req, res) => {
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
						err: "internal server error",
					},
					500
				);
				return;
			}
			if (user) {
				send(
					res,
					{
						ok: false,
						err: "user already exists",
					},
					400
				);
				return;
			}

			db.user.create({
				username: body.username,
				password: hash(body.password),
				role: "user",
			});

			send(res, {
				ok: true,
				err: null,
				username: body.username,
				token: hash(body.password),
				role: "user",
			});
		});
});

app.get("/cards", (req, res) => {
	db.card.find({}, (err, cards) => {
		send(res, cards);
	});
});

app.post("/card/create", (req, res) => {
	const body = req.body;
	// const index = await db.card.countDocuments().then((i) => i);
	console.log(body.index);
	db.card
		.create({
			title: body.title,
			description: body.description,
			image_url: body.image_url,
			username: body.username,
			index: body.index,
		})
		.then(() => send(res, { ok: true, err: null }))
		.catch((err) =>
			send(res, { ok: false, err: "internal server error" }, 500)
		);
});

app.post("/card/edit", (req, res) => {
	const body = req.body;
	db.card
		.updateOne(
			{
				index: body.index,
			},
			{
				title: body.title,
				description: body.description,
				image_url: body.image_url,
			}
		)
		.then(() => {
			send(res, { ok: true, err: null });
		})
		.catch((err) => {
			send(
				res,
				{
					ok: false,
					err: err,
				},
				500
			);
		});
});

app.post("/card/delete", (req, res) => {
	const body = req.body;
	db.card.find({}, (err, cards) => {
		db.card
			.deleteOne({
				index: body.index,
			})
			.then(() => {
				send(res, { ok: true, err: null });
			})
			.catch(() => {
				send(res, { ok: false, err: "internal server error" }, 500);
			});
	});
});

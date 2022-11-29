const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");

module.exports = function (app) {
	app.use((req, res, next) => {
		next();
	});

	// app.get("/", (req, res) => {
	// 	res.send("Hello World");
	// });

	// app.get("/login", (req, res) => {
	// 	console.log("login request called");
	// 	res.send(true);
	// });

	// app.post("/login", (req, res) => {
	// 	console.log(req.body);
	// });

	// app.use(function(req, res, next) {
	//   res.header(
	//     "Access-Control-Allow-Headers",
	//     "x-access-token, Origin, Content-Type, Accept"
	//   );
	//   next();
	// });

	// app.post(
	//   "/api/auth/signup",
	//   [
	//     verifySignUp.checkDuplicateUsername,
	//     verifySignUp.checkRolesExisted
	//   ],
	//   controller.signup
	// );

	// app.post("/api/auth/signin", controller.signin);
};

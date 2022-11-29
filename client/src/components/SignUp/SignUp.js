import React, { useContext } from "react";
import "./SignUp.css";

import { ModalContext, AuthContext } from "../App";

const sleep = (s) => new Promise((res) => setTimeout(res, s * 1000));

async function signup(data) {
	return fetch("http://localhost:8080/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	})
		.then((data) => data.json())
		.catch((err) => console.log(err));
}

const error = (msg) => {
	const e = document.getElementById("signup-error");
	e.innerText = msg;
	sleep(1).then(() => {
		e.innerText = "";
	});
};

export default function SignUp() {
	const { closeModal } = useContext(ModalContext);
	const { loginUser } = useContext(AuthContext);

	return (
		<div id="signup-page">
			<h1 className="signup-title">Sign Up</h1>
			<button
				className="signup-exit"
				onClick={() => {
					closeModal();
				}}
			>
				<img src="./images/close-x.png" alt="" />
			</button>
			<form className="signup-LoginInfo">
				<input
					type="text"
					id="signup-username"
					placeholder="username..."
				/>
				<img
					src="./images/username-icon.png"
					className="signup-userpic"
					alt=""
				/>
				<input
					type="text"
					id="signup-password"
					placeholder="password..."
				/>
				<img
					src="./images/password-icon.png"
					className="signup-passpic"
					alt=""
				/>
			</form>
			<button
				className="signup-submit"
				onClick={() => {
					const username = document
						.getElementById("signup-username")
						.value.trim();
					const password = document
						.getElementById("signup-password")
						.value.trim();
					if (username.length === 0) {
						error("username required");
						return;
					}
					if (password.length === 0) {
						error("password required");
						return;
					}
					signup({
						username: username,
						password: password,
					}).then((res) => {
						if (res.ok) {
							loginUser(res.username, res.role, res.token);
							closeModal();
						} else {
							// show modal error message
							error(res.err);
						}
					});
				}}
			>
				SUBMIT
			</button>
			<p id="signup-error"></p>
		</div>
	);
}

import React, { useContext } from "react";
import "./Login.css";

import { AuthContext } from "../App";
import { ModalContext } from "../App";

const sleep = (s) => new Promise((res) => setTimeout(res, s * 1000));

async function login(data) {
	return fetch("http://localhost:8080/login", {
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
	const e = document.getElementById("login-error");
	e.innerText = msg;
	sleep(1).then(() => {
		e.innerText = "";
	});
};

export default function LoginPage() {
	const { closeModal } = useContext(ModalContext);
	const { user, loginUser } = useContext(AuthContext);

	return (
		<div className="login-page">
			<h1 className="login-title">Login</h1>
			<button
				className="login-exit"
				onClick={() => {
					closeModal();
				}}
			>
				<img src="./images/close-x.png" alt="" />
			</button>
			<form className="login-LoginInfo">
				<input
					type="text"
					id="login-username"
					placeholder="username..."
				/>
				<img
					src="./images/username-icon.png"
					className="login-userpic"
					alt=""
				/>
				<input
					type="text"
					id="login-password"
					placeholder="password..."
				/>
				<img
					src="./images/password-icon.png"
					className="login-passpic"
					alt=""
				/>
			</form>
			<button
				className="login-submit"
				onClick={() => {
					const username = document
						.getElementById("login-username")
						.value.trim();
					const password = document
						.getElementById("login-password")
						.value.trim();
					if (username.length === 0) {
						error("username required");
						return;
					}
					if (password.length === 0) {
						error("password required");
						return;
					}
					login({
						username: username,
						password: password,
						stored: false,
					}).then((res) => {
						if (res.ok) {
							console.log(res);
							loginUser(username, res.role, res.token);
							closeModal();
						} else {
							error(res.err);
						}
					});
				}}
			>
				SUBMIT
			</button>
			<p id="login-error"></p>
		</div>
	);
}

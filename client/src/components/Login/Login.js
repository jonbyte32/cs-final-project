import React, { useContext } from "react";
import "./Login.css";

import { AuthContext } from "../App";
import { ModalContext } from "../App";

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
					const username =
						document.getElementById("login-username").value;
					const password =
						document.getElementById("login-password").value;
					login({
						username: username,
						password: password,
					}).then((data) => {
						if (data.ok) {
							loginUser(username, data.role);
							closeModal();
						}
					});
				}}
			>
				SUBMIT
			</button>
		</div>
	);
}

import React, { useContext } from "react";
import "./SignUp.css";

import { ModalContext } from "../App";

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

export default function SignUp() {
	const { closeModal } = useContext(ModalContext);

	return (
		<div className="signup-page">
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
					console.log("signup submit");
					signup({
						username:
							document.getElementById("signup-username").value,
						password:
							document.getElementById("signup-password").value,
					}).then((data) => {
						if (data) {
							// close modal and update ui to allow perms related to role
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

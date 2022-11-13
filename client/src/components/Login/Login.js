import React, { useContext } from "react";
import "./Login.css";

import { ModalContext } from "../App";

export default function LoginPage() {
	const { closeModal } = useContext(ModalContext);

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
					closeModal();
				}}
			>
				SUBMIT
			</button>
		</div>
	);
}

import React, { useContext } from "react";
import "./SignUp.css";

import { ModalContext } from "../App";

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
					closeModal();
				}}
			>
				SUBMIT
			</button>
		</div>
	);
}

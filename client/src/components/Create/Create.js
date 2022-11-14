import React, { useContext } from "react";
import "./Create.css";
import { ModalContext } from "../App";

export default function Create() {
	const { closeModal } = useContext(ModalContext);
	return (
		<div className="create-modal">
			<div className="create-top">
				<div className="create-title">Create Card</div>
				<img
					className="create-close"
					src="./images/close-x.png"
					alt="close modal"
					onClick={closeModal}
				/>
			</div>
			<form className="create-form">
				<p>Title</p>
				<input
					className="create-form-title"
					type="text"
					placeholder="..."
				/>
				<p>Description</p>
				<textarea className="create-form-desc" placeholder="..." />
				<p>Image URL</p>
				<input
					className="create-form-image"
					type="text"
					placeholder="..."
				/>
			</form>
			<div className="create-bottom">
				<button
					className="create-submit"
					onClick={() => {
						closeModal();
					}}
				>
					SUBMIT
				</button>
			</div>
		</div>
	);
}

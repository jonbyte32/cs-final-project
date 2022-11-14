import React, { useContext } from "react";
import "./Edit.css";
import { ModalContext } from "../App";

export default function Create() {
	const { closeModal } = useContext(ModalContext);
	return (
		<div className="edit-modal">
			<div className="edit-top">
				<div className="edit-title">Edit Card</div>
				<img
					className="edit-close"
					src="./images/close-x.png"
					alt="close modal"
					onClick={closeModal}
				/>
			</div>
			<form className="edit-form">
				<p>Title</p>
				<input
					className="edit-form-title"
					type="text"
					placeholder="..."
				/>
				<p>Description</p>
				<textarea className="edit-form-desc" placeholder="..." />
				<p>Image URL</p>
				<input
					className="edit-form-image"
					type="text"
					placeholder="..."
				/>
			</form>
			<div className="edit-bottom">
				<button
					className="edit-submit"
					onClick={() => {
						closeModal();
					}}
				>
					SAVE
				</button>
			</div>
		</div>
	);
}

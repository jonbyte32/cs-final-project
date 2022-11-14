import React, { useContext } from "react";
import "./Delete.css";
import { ModalContext } from "../App";

export default function DeletePage(props) {
	const { closeModal } = useContext(ModalContext);
	return (
		<div className="delete-modal">
			<h2 className="delete-title">Delete Card</h2>
			<div className="delete-actions">
				<button className="delete-cancel" onClick={closeModal}>
					CANCEL
				</button>
				<button
					className="delete-submit"
					onClick={() => {
						closeModal();
					}}
				>
					DELETE
				</button>
			</div>
		</div>
	);
}

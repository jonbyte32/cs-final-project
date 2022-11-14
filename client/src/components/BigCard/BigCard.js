import "./BigCard.css";
import React, { useContext } from "react";
import { ModalContext } from "../App";

export default function BigCard() {
	const { openModal } = useContext(ModalContext);

	return (
		<div className="bigcard">
			<div className="bigcard-left-side">
				<p className="bigcard-placeholder">IMAGE</p>
			</div>
			<div className="bigcard-right-side">
				<h2 className="bigcard-card-title">Card Title</h2>
				<p className="bigcard-desc-text">
					Lorem Ipsum is simply dummy text of the printing and
					typesetting industry. Lorem Ipsum has been the industry's
					standard dummy text ever since the 1500s, when an unknown
					printer took a galley of type and scrambled it to make a
					type specimen book. It has survived not only five centuries,
					but also the leap into electronic typesetting, remaining
					essentially unchanged. It was popularised in the 1960s with
					the release of Letraset sheets containing Lorem Ipsum
					passages, and more recently with desktop publishing software
					like Aldus PageMaker including versions of Lorem Ipsum.
				</p>
				<div className="bigcard-bottom-row">
					<img
						className="bigcard-edit-button"
						alt="edit button"
						src="../images/card-edit.png"
						onClick={() => {
							openModal("edit");
						}}
					></img>
					<img
						className="bigcard-delete-button"
						alt="delete button"
						src="../images/card-delete.png"
						onClick={() => {
							openModal("delete");
						}}
					></img>
				</div>
			</div>
		</div>
	);
}

import "./BigCard.css";
import React, { useContext } from "react";
import { ModalContext, AuthContext, CardContext } from "../App";

export default function BigCard() {
	const { openModal } = useContext(ModalContext);
	const { getCard } = useContext(CardContext);
	const card = getCard();
	const owns = card && card.username === localStorage.getItem("USER-NAME");
	return (
		<div className="bigcard">
			<div className="bigcard-left-side">
				<img id="bigcard-image" src={""} alt={""} />
			</div>
			<div className="bigcard-right-side">
				<h2 id="bigcard-card-title">{""}</h2>
				<p id="bigcard-desc-text">{""}</p>
				<div className="bigcard-bottom-row">
					<img
						id="bigcard-edit-button"
						alt="edit button"
						src="../images/card-edit.png"
						onClick={() => {
							if (owns) {
								document.getElementById(
									"burger-menu-dropdown"
								).style.display = "none";
								openModal("edit", {
									title: card.title,
									desc: card.description,
									image: card.image_url,
								});
							}
						}}
					></img>
					<p id="bigcard-author">{""}</p>
					<img
						id="bigcard-delete-button"
						alt="delete button"
						src="../images/card-delete.png"
						onClick={() => {
							if (owns) {
								document.getElementById(
									"burger-menu-dropdown"
								).style.display = "none";
								openModal("delete");
							}
						}}
					></img>
				</div>
			</div>
		</div>
	);
}

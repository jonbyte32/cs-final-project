import "./BigCard.css";
import React, { useContext } from "react";
import { ModalContext, AuthContext, CardContext } from "../App";
import { useParams, useNavigate } from "react-router-dom";

const is_integer = (string) => {
	return /^\d+$/.test(string);
};

export default function BigCard() {
	const { openModal } = useContext(ModalContext);
	const { cards, getCard } = useContext(CardContext);
	const { id } = useParams();
	const nav = useNavigate();

	if (
		typeof id === "undefined" ||
		!is_integer(id) ||
		parseInt(id) > cards.list.length + 1
	) {
		nav("/card/0");
		return null;
	}
	const card = getCard(id, true) || getCard();
	if (card === null || typeof card == "undefined") {
		return null;
	}
	console.log(card);

	document.getElementById("right-button").style.display = "block";
	document.getElementById("util-sep").style.display = "block";
	document.getElementById("left-button").style.display = "block";
	const owns = card && card.username === localStorage.getItem("USER-NAME");
	return (
		<div className="bigcard">
			<div className="bigcard-left-side">
				<img
					id="bigcard-image"
					src={card.image_url}
					alt={card.description}
				/>
			</div>
			<div className="bigcard-right-side">
				<h2 id="bigcard-card-title">{card.title}</h2>
				<p id="bigcard-desc-text">{card.description}</p>
				<div className="bigcard-bottom-row">
					<img
						id="bigcard-edit-button"
						alt="edit button"
						src="/images/card-edit.png"
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
						style={{
							opacity: owns ? "100%" : "0%",
							cursor: owns ? "pointer" : "default",
						}}
					></img>
					<p id="bigcard-author">Uploaded By: {card.username}</p>
					<img
						id="bigcard-delete-button"
						alt="delete button"
						src="/images/card-delete.png"
						onClick={() => {
							if (owns) {
								document.getElementById(
									"burger-menu-dropdown"
								).style.display = "none";
								openModal("delete");
							}
						}}
						style={{
							opacity: owns ? "100%" : "0%",
							cursor: owns ? "pointer" : "default",
						}}
					></img>
				</div>
			</div>
		</div>
	);
}

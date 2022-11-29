import React, { useContext } from "react";
import "./Delete.css";
import { ModalContext, CardContext } from "../App";

async function del(data) {
	return fetch("http://localhost:8080/card/delete", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	})
		.then((data) => data.json())
		.catch((err) => console.log(err));
}

export default function DeletePage(props) {
	const { closeModal } = useContext(ModalContext);
	const { cards, getCard, getCards, cardRight } = useContext(CardContext);
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
						del({
							index: getCard().index,
						}).then((res) => {
							if (res.ok) {
								getCards().then(() => {
									if (cards.list.length === 1) {
										document.getElementById(
											"detailed-view"
										).style.display = "none";
									}
									cardRight();
									closeModal();
								});
							}
						});
					}}
				>
					DELETE
				</button>
			</div>
		</div>
	);
}

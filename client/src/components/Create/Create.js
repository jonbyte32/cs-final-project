import React, { useContext } from "react";
import "./Create.css";
import { ModalContext, CardContext } from "../App";
import { useNavigate } from "react-router-dom";

const sleep = (s) => new Promise((res) => setTimeout(res, s * 1000));

const create = (data) => {
	return fetch("http://localhost:8080/card/create", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	})
		.then((data) => data.json())
		.catch((err) => console.log(err));
};

const imageExists = (url) => {
	return new Promise((resolve) => {
		let image = new Image();
		image.addEventListener("load", () => resolve(true));
		image.addEventListener("error", () => resolve(false));
		image.src = url;
	});
};

const error = (msg) => {
	const e = document.getElementById("create-error");
	e.innerText = msg;
	sleep(1).then(() => {
		e.innerText = "";
	});
};

export default function Create() {
	const { closeModal } = useContext(ModalContext);
	const { cards, getCards, setCard } = useContext(CardContext);
	const nav = useNavigate();
	return (
		<div className="create-modal">
			<div className="create-top">
				<div className="create-title">Create Card</div>
				<img
					className="create-close"
					src="/images/close-x.png"
					alt="close modal"
					onClick={closeModal}
				/>
			</div>
			<form className="create-form">
				<p>Title</p>
				<input id="create-form-title" type="text" placeholder="..." />
				<p>Description</p>
				<textarea id="create-form-desc" placeholder="..." />
				<p>Image URL</p>
				<input id="create-form-image" type="text" placeholder="..." />
			</form>
			<div className="create-bottom">
				<button
					className="create-submit"
					onClick={async () => {
						const title = document
							.getElementById("create-form-title")
							.value.trim();
						const desc = document
							.getElementById("create-form-desc")
							.value.trim();
						const image = document
							.getElementById("create-form-image")
							.value.trim();
						if (title.length === 0) {
							error("title required");
							return;
						}
						if (desc.length === 0) {
							error("description required");
							return;
						}
						if (image.length === 0) {
							error("image url required");
							return;
						}
						const exists = await imageExists(image);
						if (!exists) {
							error("invalid image url");
							return;
						}
						create({
							title: title,
							description: desc,
							image_url: image,
							username: localStorage.getItem("USER-NAME"),
							index: `${localStorage.getItem(
								"USER-NAME"
							)}-${Math.floor(
								Math.random() * Number.MAX_SAFE_INTEGER
							)}`,
						}).then((res) => {
							if (res.ok) {
								getCards().then(() => {
									console.log(cards.list.length);
									setCard(cards.list.length - 1);

									if (
										window.location.href.match(
											/.*(\/card\/.*$)/
										)
									) {
										nav("/card/" + cards.list.length);
									}
									// if (cards.list.length === 0) {
									// 	document.getElementById(
									// 		"detailed-view"
									// 	).style.display = "block";

									// 	const detailed =
									// 		document.getElementById(
									// 			"detailed-view"
									// 		);
									// 	const grid =
									// 		document.getElementById(
									// 			"grid-view"
									// 		);

									// 	detailed.style.display =
									// 		grid.style.display === "none"
									// 			? "block"
									// 			: "none";
									// 	grid.style.display =
									// 		grid.style.display === "grid"
									// 			? "grid"
									// 			: "none";
									// }

									// document.getElementById(
									// 	"bigcard-card-title"
									// ).innerText = title;
									// document.getElementById(
									// 	"bigcard-desc-text"
									// ).innerText = desc;
									// document.getElementById(
									// 	"bigcard-image"
									// ).src = image;
									// document.getElementById(
									// 	"bigcard-image"
									// ).alt = desc;
									// document.getElementById(
									// 	"bigcard-author"
									// ).innerText =
									// 	"Uploaded By: " +
									// 	localStorage.getItem("USER-NAME");

									// const edit = document.getElementById(
									// 	"bigcard-edit-button"
									// );
									// const del = document.getElementById(
									// 	"bigcard-delete-button"
									// );

									// edit.style.opacity = "100%";
									// edit.style.cursor = "pointer";
									// del.style.opacity = "100%";
									// del.style.cursor = "pointer";

									closeModal();
								});
							} else {
								error(res.err);
								return;
							}
						});
					}}
				>
					SUBMIT
				</button>
			</div>
			<p id="create-error"></p>
		</div>
	);
}

import React, { useContext } from "react";
import "./Edit.css";
import { ModalContext, CardContext } from "../App";

const sleep = (s) => new Promise((res) => setTimeout(res, s * 1000));

const edit = (data) => {
	return fetch("http://localhost:8080/card/edit", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	})
		.then((data) => data.json())
		.catch((err) => console.log(err));
};

const error = (msg) => {
	const e = document.getElementById("edit-error");
	e.innerText = msg;
	sleep(1).then(() => {
		e.innerText = "";
	});
};

export default function Edit(props) {
	const { closeModal } = useContext(ModalContext);
	const { getCard, getCards } = useContext(CardContext);
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
					id="edit-form-title"
					type="text"
					placeholder="..."
					defaultValue={props.title}
				/>
				<p>Description</p>
				<textarea
					id="edit-form-desc"
					placeholder="..."
					defaultValue={props.desc}
				/>
				<p>Image URL</p>
				<input
					id="edit-form-image"
					type="text"
					placeholder="..."
					defaultValue={props.image}
				/>
			</form>
			<div className="edit-bottom">
				<button
					className="edit-submit"
					onClick={() => {
						const title = document
							.getElementById("edit-form-title")
							.value.trim();
						const desc = document
							.getElementById("edit-form-desc")
							.value.trim();
						const image = document
							.getElementById("edit-form-image")
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
						edit({
							title: title,
							description: desc,
							image_url: image,
							index: getCard().index,
						}).then((res) => {
							if (res.ok) {
								getCards();

								const card = getCard();
								console.log(card);

								document.getElementById(
									"bigcard-card-title"
								).innerText = title;
								document.getElementById(
									"bigcard-desc-text"
								).innerText = desc;
								document.getElementById("bigcard-image").src =
									image;
								document.getElementById("bigcard-image").alt =
									desc;
								document.getElementById(
									"bigcard-author"
								).innerText =
									"Uploaded By: " +
									localStorage.getItem("USER-NAME");

								closeModal();
							} else {
								error(res.err);
								return;
							}
						});
					}}
				>
					SAVE
				</button>
			</div>
			<p id="edit-error"></p>
		</div>
	);
}

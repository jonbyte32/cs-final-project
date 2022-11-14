import { React, useContext } from "react";
import "./Card.css";
import { ModalContext } from "../App";

export default function Card() {
	const { openModal } = useContext(ModalContext);
	return (
		<div className="card-container">
			<div className="card">
				<div className="card-top-section">
					<p className="card-stock-text">IMAGE</p>
				</div>
				<div className="card-bottom-section">
					<p className="card-title"> Card Title</p>
					<p className="card-desc-text">
						Lorem Ipsum is simply dummy text of the printing and
						typesetting industry. Lorem Ipsum has been the
						industry's standard dummy text ever since the 1500s,
						when an unknown printer took a galley of type and
						scrambled it to make a type specimen book. It has
						survived not only five centuries, but also the leap into
						electronic typesetting, remaining essentially unchanged.
						It was popularised in the 1960s with the release of
						Letraset sheets containing Lorem Ipsum passages, and
						more recently with desktop publishing software like
						Aldus PageMaker including versions of Lorem Ipsum.
					</p>
					<div className="card-bottom-links">
						<img
							className="card-edit"
							alt="edit button"
							src="../images/card-edit.png"
							onClick={() => {
								openModal("edit");
							}}
						></img>
						<p
							className="card-link"
							onClick={() => {
								document.getElementById(
									"grid-view"
								).style.display = "none";
								document.getElementById(
									"detailed-view"
								).style.display = "block";
								document.getElementById(
									"util-sep"
								).style.display = "block";
								document.getElementById(
									"right-button"
								).style.display = "block";
								document.getElementById(
									"left-button"
								).style.display = "block";
							}}
						>
							Read More
						</p>
						<img
							className="card-delete"
							src="../images/card-delete.png"
							alt="delete icon"
							onClick={() => {
								openModal("delete");
							}}
						></img>
					</div>
				</div>
			</div>
		</div>
	);
}

import { React, useContext } from "react";
import "./Card.css";
import { ModalContext, AuthContext, CardContext } from "../App";
import { Link, Navigate } from "react-router-dom";

export default function Card(props) {
	const { openModal } = useContext(ModalContext);
	const { user } = useContext(AuthContext);
	const { cards, getCard, setCard } = useContext(CardContext);
	const owns = props.username === user.username;
	const e = (
		<div className="card-container" id={"card-" + props.index}>
			<div className="card">
				<div className="card-top-section">
					<img
						className="card-image"
						src={props.image}
						alt={props.title}
					/>
				</div>
				<div className="card-bottom-section">
					<p className="card-title">{props.title}</p>
					<p className="card-desc-text">{props.desc}</p>
					<div className="card-bottom-links">
						<img
							className="card-edit"
							alt="edit button"
							src="/images/card-edit.png"
							onClick={(e) => {
								if (user.active && owns) {
									document.getElementById(
										"burger-menu-dropdown"
									).style.display = "none";
									const index =
										e.target.parentElement.parentElement.parentElement.parentElement.id.match(
											/^card-(.+)$/
										)[1];
									const [card, position] = getCard(index);
									console.log(index);
									setCard(position);
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
						<Link to={"/card/" + props.position}>
							<p
								className="card-link"
								onClick={(e) => {
									// document.getElementById(
									// 	"grid-view"
									// ).style.display = "none";
									// document.getElementById(
									// 	"detailed-view"
									// ).style.display = "block";
									document.getElementById(
										"util-sep"
									).style.display = "block";
									document.getElementById(
										"right-button"
									).style.display = "block";
									document.getElementById(
										"left-button"
									).style.display = "block";
									document.getElementById(
										"burger-menu-dropdown"
									).style.display = "none";

									const index =
										e.target.parentElement.parentElement.parentElement.parentElement.parentElement.id.match(
											/^card-(.+)$/
										)[1];
									const [card, position] = getCard(index);
									setCard(position);
								}}
							>
								Read More
							</p>
						</Link>
						<img
							className="card-delete"
							src="/images/card-delete.png"
							alt="delete icon"
							onClick={(e) => {
								if (user.active && owns) {
									document.getElementById(
										"burger-menu-dropdown"
									).style.display = "none";
									const index =
										e.target.parentElement.parentElement.parentElement.parentElement.id.match(
											/^card-(.+)$/
										)[1];
									const [card, position] = getCard(index);
									setCard(position);
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
		</div>
	);

	// if (props.username === user.username) {
	// 	console.log(e);
	// }

	return e;
}

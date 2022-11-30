import React from "react";
import "./UtilButton.css";
import { Link } from "react-router-dom";

export default function UtilButton(props) {
	return (
		<Link to={props.to}>
			<div
				id={props.id}
				data-tooltip={props.alt}
				className="utility"
				onClick={props.onClick}
				style={props.style}
			>
				<img src={props.image} alt={props.alt} />
			</div>
		</Link>
	);
}

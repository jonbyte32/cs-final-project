import React from "react";
import "./UtilButton.css";

export default function UtilButton(props) {
	return (
		<div
			id={props.id}
			data-tooltip={props.alt}
			className="utility"
			onClick={props.onClick}
		>
			<img src={props.image} alt={props.alt} />
		</div>
	);
}

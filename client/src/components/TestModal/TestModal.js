import React, { useContext } from "react";
import { ModalContext } from "../App";

import "./TestModal.css";

export default function TestModal() {
	const { closeModal } = useContext(ModalContext);
	return (
		<div className="test-modal">
			<h1>Test Modal</h1>
			<div className="button" onClick={closeModal}>
				Close
			</div>
		</div>
	);
}

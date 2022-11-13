import { React, useContext } from "react";
import ReactDOM from "react-dom";
import { ModalContext } from "../App";

import TestModal from "../TestModal";
import Login from "../Login";
import SignUp from "../SignUp";
import Delete from "../Delete";

const MODAL_ROOT = document.getElementById("modal-root");
const modals = {
	test: <TestModal style={{ "z-index": "100" }} />,
	login: <Login />,
	signup: <SignUp />,
	delete: <Delete />,
};

export default function Modal() {
	const { modal } = useContext(ModalContext);
	if (!modal) {
		MODAL_ROOT.style.display = "none";
		return null;
	}
	MODAL_ROOT.style.display = "flex";
	return ReactDOM.createPortal(<>{modals[modal]}</>, MODAL_ROOT);
}

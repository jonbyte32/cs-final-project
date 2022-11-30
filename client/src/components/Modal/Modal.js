import { useContext } from "react";
import ReactDOM from "react-dom";
import { ModalContext } from "../App";
import { Routes, Route } from "react-router-dom";

import Login from "../Login";
import SignUp from "../SignUp";
import Create from "../Create";
import Edit from "../Edit";
import Delete from "../Delete";

const MODAL_ROOT = document.getElementById("modal-root");
const modals = {
	login: (props) => {
		return <Login {...props} />;
	},
	signup: (props) => {
		return <SignUp {...props} />;
	},
	create: (props) => {
		return <Create {...props} />;
	},
	edit: (props) => {
		return <Edit {...props} />;
	},
	delete: (props) => {
		return <Delete {...props} />;
	},
};

export default function Modal() {
	const { modal } = useContext(ModalContext);
	// console.log(modal);
	// if (modal.id === null) {
	// 	MODAL_ROOT.style.display = "none";
	// 	return null;
	// }
	// MODAL_ROOT.style.display = "flex";
	// return ReactDOM.createPortal(
	// 	<Routes>modals[modal.id](modal.props)</Routes>,
	// 	MODAL_ROOT
	// );

	if (modal.id) {
		MODAL_ROOT.style.display = "flex";
		return ReactDOM.createPortal(modals[modal.id](modal.props), MODAL_ROOT);
	}
	MODAL_ROOT.style.display = "none";
	return null;
}

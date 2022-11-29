import "./App.css";
import Topbar from "../Topbar";
import UtilButton from "../UtilButton";
import { createContext, useState } from "react";
import Modal from "../Modal";
import Card from "../Card";
import BigCard from "../BigCard/BigCard";

export const ThemeContext = createContext(null);
export const ModalContext = createContext(null);
export const AuthContext = createContext(null);

function App() {
	const MODAL_ROOT = document.getElementById("modal-root");

	const [theme, setTheme] = useState(
		localStorage.getItem("theme") || "light"
	);
	localStorage.setItem("theme", theme);
	MODAL_ROOT.setAttribute("class", theme);

	const toggleTheme = () => {
		setTheme(theme === "light" ? "dark" : "light");
		localStorage.setItem("theme", theme);
		MODAL_ROOT.setAttribute("class", theme);
	};

	const [modal, setModal] = useState(null);

	const openModal = (modal_id) => {
		setModal(modal_id);
	};

	const closeModal = () => {
		setModal(null);
	};

	const [user] = useState({
		active: false,
		username: null,
		role: "user",
	});

	const loginUser = (username, role) => {
		user.active = true;
		user.username = username;
		user.role = role;
	};

	const logoutUser = () => {
		user.active = false;
		user.username = null;
		user.role = "user";
	};

	return (
		<>
			<ThemeContext.Provider value={{ theme, toggleTheme }}>
				<ModalContext.Provider value={{ modal, openModal, closeModal }}>
					<AuthContext.Provider
						value={{ user, loginUser, logoutUser }}
					>
						<div className={theme + " " + user.role} id="main-div">
							<Topbar />
							<span className="sep" />
							<div id="util-bar">
								<div id="util-left">
									<UtilButton
										id="card-create"
										onClick={() => {
											openModal("create");
										}}
										image={"./images/card-create.png"}
										alt="create"
									/>
								</div>
								<div id="util-right">
									<UtilButton
										id="grid-button"
										onClick={() => {
											document.getElementById(
												"detailed-view"
											).style.display = "none";
											document.getElementById(
												"util-sep"
											).style.display = "none";
											document.getElementById(
												"right-button"
											).style.display = "none";
											document.getElementById(
												"left-button"
											).style.display = "none";
											document.getElementById(
												"grid-view"
											).style.display = "grid";
										}}
										image={
											"./images/" +
											theme +
											"/grid-view.png"
										}
										alt="grid view"
									/>
									<UtilButton
										id="detailed-button"
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
										image={
											"./images/" +
											theme +
											"/detail-view.png"
										}
										alt="detailed view"
									/>
									<span id="util-sep" />
									<UtilButton
										id="right-button"
										onClick={() => {
											console.log("go right");
										}}
										image={
											"./images/" +
											theme +
											"/right-arrow.png"
										}
										alt="go right"
									/>
									<UtilButton
										id="left-button"
										onClick={() => {
											console.log("go left");
										}}
										image={
											"./images/" +
											theme +
											"/left-arrow.png"
										}
										alt="go left"
									/>

									<Modal />
								</div>
							</div>
							<div id="view-area">
								<div id="grid-view">
									<Card />
									<Card />
									<Card />
									<Card />
									<Card />
									<Card />
									<Card />
									<Card />
									<Card />
									<Card />
									<Card />
									<Card />
									<Card />
									<Card />
									<Card />
								</div>
								<div id="detailed-view">
									<BigCard />
								</div>
							</div>
						</div>
					</AuthContext.Provider>
				</ModalContext.Provider>
			</ThemeContext.Provider>
		</>
	);
}

export default App;

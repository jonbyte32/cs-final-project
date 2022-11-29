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
export const CardContext = createContext(null);

const array_eq = (arr1, arr2) => {
	return JSON.stringify(arr1) === JSON.stringify(arr2);
};

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

	const [modal, setModal] = useState({
		id: null,
		props: null,
	});

	const openModal = (modal_id, props) => {
		setModal({
			id: modal_id,
			props: props || {},
		});
	};

	const closeModal = () => {
		setModal({
			id: null,
			props: null,
		});
	};

	const [user, setUser] = useState({
		active: false,
		username: null,
		role: "user",
	});

	const [cards, setCards] = useState({
		list: [],
		position: 0,
	});

	const loginUser = (username, role, token) => {
		setUser({
			active: true,
			username: username,
			role: role,
		});

		localStorage.setItem("USER-NAME", username);
		localStorage.setItem("USER-TOKEN", token);
		document.getElementById("profile-action-1").innerText = username;
		document.getElementById("profile-action-2").innerText = "LOGOUT";

		const edit = document.getElementById("bigcard-edit-button");
		const del = document.getElementById("bigcard-delete-button");
		const owns =
			cards.list.length > 0
				? username === cards.list[cards.position].username
				: false;

		edit.style.opacity = owns ? "100%" : "0%";
		edit.style.cursor = owns ? "pointer" : "default";
		del.style.opacity = owns ? "100%" : "0%";
		del.style.cursor = owns ? "pointer" : "default";

		const create = document.getElementById("card-create");

		create.style.opacity = "100%";
		create.style.cursor = "pointer";
	};

	const logoutUser = () => {
		setUser({
			active: false,
			username: "",
			role: "user",
		});

		localStorage.removeItem("USER-NAME");
		localStorage.removeItem("USER-TOKEN");
		document.getElementById("profile-action-1").innerText = "SIGN UP";
		document.getElementById("profile-action-2").innerText = "LOGIN";

		const edit = document.getElementById("bigcard-edit-button");
		const del = document.getElementById("bigcard-delete-button");

		edit.style.opacity = "0%";
		edit.style.cursor = "default";
		del.style.opacity = "0%";
		del.style.cursor = "default";

		const create = document.getElementById("card-create");

		create.style.opacity = "0%";
		create.style.cursor = "default";
	};

	if (user.active === false && localStorage.getItem("USER-TOKEN")) {
		user.active = true;
		fetch("http://localhost:8080/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: localStorage.getItem("USER-NAME"),
				password: localStorage.getItem("USER-TOKEN"),
				stored: true,
			}),
		})
			.then((data) => {
				data.json().then((res) => {
					loginUser(res.username, res.role, res.token);
				});
			})
			.catch((err) => console.log(err));
	}

	const getCards = () => {
		return fetch("http://localhost:8080/cards", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		}).then((data) => {
			data.json().then((res) => {
				if (!array_eq(cards.list, res)) {
					setCards({
						list: res,
						position: cards.position,
					});
				}
			});
		});
	};

	const getCard = (index) => {
		if (index) {
			let object = null;
			let position = null;
			for (let i = 0; i < cards.list.length; i++) {
				const card = cards.list[i];
				if (card.index === index) {
					object = card;
					position = i;
					break;
				}
			}
			return [object, position];
		} else {
			return cards.list[cards.position];
		}
	};

	const setCard = (position) => {
		position = position || 0;
		setCards({
			list: cards.list,
			position: position,
		});
		const card = cards.list[position];
		console.log(cards.list);

		if (cards.list.length > 0) {
			document.getElementById("bigcard-card-title").innerText =
				card.title;
			document.getElementById("bigcard-desc-text").innerText =
				card.description;
			document.getElementById("bigcard-image").src = card.image_url;
			document.getElementById("bigcard-image").alt = card.description;
			document.getElementById("bigcard-author").innerText =
				"Uploaded By: " + card.username;

			const edit = document.getElementById("bigcard-edit-button");
			const del = document.getElementById("bigcard-delete-button");
			const owns = user.username === card.username;

			edit.style.opacity = owns ? "100%" : "0%";
			edit.style.cursor = owns ? "pointer" : "default";
			del.style.opacity = owns ? "100%" : "0%";
			del.style.cursor = owns ? "pointer" : "default";
		} else {
			document.getElementById("bigcard-card-title").innerText = "";
			document.getElementById("bigcard-desc-text").innerText = "";
			document.getElementById("bigcard-image").src = "";
			document.getElementById("bigcard-image").alt = "";
			document.getElementById("bigcard-author").innerText = "";

			const edit = document.getElementById("bigcard-edit-button");
			const del = document.getElementById("bigcard-delete-button");

			edit.style.opacity = "0%";
			edit.style.cursor = "default";
			del.style.opacity = "0%";
			del.style.cursor = "default";
		}
	};

	const cardRight = () => {
		setCard(Math.abs(cards.position + 1) % cards.list.length);
	};

	const cardLeft = () => {
		setCard(Math.abs(cards.position - 1) % cards.list.length);
	};

	getCards();

	return (
		<>
			<ThemeContext.Provider value={{ theme, toggleTheme }}>
				<ModalContext.Provider value={{ modal, openModal, closeModal }}>
					<AuthContext.Provider
						value={{ user, loginUser, logoutUser }}
					>
						<CardContext.Provider
							value={{
								cards,
								getCards,
								getCard,
								setCard,
								cardRight,
								cardLeft,
							}}
						>
							<div
								className={
									theme +
									" " +
									(user.active ? "in" : "out") +
									" " +
									user.role
								}
								id="main-div"
							>
								<Topbar />
								<span className="sep" />
								<div id="util-bar">
									<div id="util-left">
										<UtilButton
											id="card-create"
											onClick={() => {
												if (user.active) {
													document.getElementById(
														"burger-menu-dropdown"
													).style.display = "none";
													openModal("create");
												}
											}}
											image={"./images/card-create.png"}
											alt="create"
											style={{
												opacity: user.active
													? "100%"
													: "0%",
												cursor: user.active
													? "pointer"
													: "default",
											}}
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
												document.getElementById(
													"burger-menu-dropdown"
												).style.display = "none";
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
												setCard(0);
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
												document.getElementById(
													"burger-menu-dropdown"
												).style.display = "none";
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
												document.getElementById(
													"burger-menu-dropdown"
												).style.display = "none";
												cardRight();
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
												document.getElementById(
													"burger-menu-dropdown"
												).style.display = "none";
												cardLeft();
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
										{cards.list.map((card, index) => {
											return (
												<Card
													title={card.title}
													desc={card.description}
													image={card.image_url}
													username={card.username}
													position={index}
													index={card.index}
													key={index}
												/>
											);
										})}
									</div>
									<div id="detailed-view">
										<BigCard />
									</div>
								</div>
							</div>
						</CardContext.Provider>
					</AuthContext.Provider>
				</ModalContext.Provider>
			</ThemeContext.Provider>
		</>
	);
}

export default App;

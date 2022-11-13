import { React, useContext } from "react";
import "./Topbar.css";

import { ThemeContext, ModalContext } from "../App";
import Modal from "../Modal";

export default function Topbar() {
	const { theme, toggleTheme } = useContext(ThemeContext);
	const { openModal } = useContext(ModalContext);

	return (
		<div className="topbar">
			<div id="left">
				<img
					id="site-icon"
					src={"../images/" + theme + "/site-icon.png"}
					alt="site icon"
				/>
				<h2 id="site-title">Gallery</h2>
			</div>
			<div id="right">
				<div>
					<img
						id="theme-button"
						onClick={toggleTheme}
						src={"../images/" + theme + "/theme-toggle.png"}
						alt="theme toggle button"
					/>
				</div>
				<div>
					<img
						id="burger-menu"
						src={"../images/" + theme + "/hamburger-menu.png"}
						alt="hamburger menu button"
						onClick={() => {
							const e = document.getElementById(
								"burger-menu-dropdown"
							);
							const disp = e.style.display;
							e.style.display = disp === "flex" ? "none" : "flex";
						}}
					/>
					<div id="burger-menu-dropdown">
						{/* <div id="menu-profile"></div> */}
						<div
							id="profile-action-1"
							onClick={() => {
								document.getElementById(
									"burger-menu-dropdown"
								).style.display = "none";
								openModal("signup");
							}}
						>
							SIGN UP
						</div>
						<div
							id="profile-action-2"
							onClick={() => {
								document.getElementById(
									"burger-menu-dropdown"
								).style.display = "none";
								openModal("login");
							}}
						>
							LOGIN
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

import { React, useContext } from "react";
import "./Topbar.css";

import { ThemeContext, ModalContext, AuthContext } from "../App";

export default function Topbar() {
	const { theme, toggleTheme } = useContext(ThemeContext);
	const { openModal } = useContext(ModalContext);
	const { user, logoutUser } = useContext(AuthContext);

	return (
		<div className="topbar">
			<div id="left">
				<img
					id="site-icon"
					src={"/images/" + theme + "/site-icon.png"}
					alt="site icon"
				/>
				<h2 id="site-title">Gallery</h2>
			</div>
			<div id="right">
				<div>
					<img
						id="theme-button"
						onClick={() => {
							document.getElementById(
								"burger-menu-dropdown"
							).style.display = "none";
							toggleTheme();
						}}
						src={"/images/" + theme + "/theme-toggle.png"}
						alt="theme toggle button"
					/>
				</div>
				<div>
					<img
						id="burger-menu"
						src={"/images/" + theme + "/hamburger-menu.png"}
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
						<div
							id="profile-action-1"
							onClick={() => {
								if (!user.active) {
									document.getElementById(
										"burger-menu-dropdown"
									).style.display = "none";
									openModal("signup");
								}
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
								if (!user.active) {
									openModal("login");
								} else {
									logoutUser();
								}
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

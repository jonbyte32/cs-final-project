import { React, useContext } from "react";
import "./Topbar.css";

import { ThemeContext } from "../App";

export default function Topbar() {
	const { theme, toggleTheme } = useContext(ThemeContext);

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
				<img
					id="theme-button"
					onClick={toggleTheme}
					src={"../images/" + theme + "/theme-toggle.png"}
					alt="theme toggle button"
				/>
				<img
					id="burger-menu"
					src={"../images/" + theme + "/hamburger-menu.png"}
					alt="hamburger menu button"
				/>
			</div>
		</div>
	);
}

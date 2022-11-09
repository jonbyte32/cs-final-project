import "./App.css";
import Topbar from "../Topbar";
import UtilButton from "../UtilButton";
import { createContext, useState } from "react";

export const ThemeContext = createContext("light");

function App() {
	const [theme, setTheme] = useState(
		localStorage.getItem("theme") || "light"
	);
	localStorage.setItem("theme", theme);

	const toggleTheme = () => {
		setTheme(theme === "light" ? "dark" : "light");
		localStorage.setItem("theme", theme);
	};

	return (
		<>
			<ThemeContext.Provider value={{ theme, toggleTheme }}>
				<div className={theme} id="main-div">
					<Topbar />
					<span className="sep" />
					<div id="util-bar">
						<div id="util-left"></div>
						<div id="util-right">
							<UtilButton
								id="grid-view"
								onClick={() => {
									console.log("grid view");
								}}
								image={"./images/" + theme + "/grid-view.png"}
								alt=""
							/>
							<UtilButton
								id="detail-view"
								onClick={() => {
									console.log("detail view");
								}}
								image={"./images/" + theme + "/detail-view.png"}
								alt=""
							/>
							<span className="util-sep" />
							<UtilButton
								id="right-arrow"
								onClick={() => {
									console.log("right arrow");
								}}
								image={"./images/" + theme + "/right-arrow.png"}
								alt=""
							/>
							<UtilButton
								id="right-arrow"
								onClick={() => {
									console.log("left arrow");
								}}
								image={"./images/" + theme + "/left-arrow.png"}
								alt=""
							/>
						</div>
					</div>
				</div>
			</ThemeContext.Provider>
		</>
	);
}

export default App;

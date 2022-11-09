import "./App.css";
import Topbar from "../Topbar";
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
				</div>
			</ThemeContext.Provider>
		</>
	);
}

export default App;

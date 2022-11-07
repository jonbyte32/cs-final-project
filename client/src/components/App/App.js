import "./App.css";
import Example from "../Example";
import { createContext, useState } from "react";

export const ThemeContext = createContext(null);

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
		<ThemeContext.Provider>
			<div class={theme} id="main-div">
				<Example />
				<button onClick={toggleTheme}>{theme}</button>
			</div>
		</ThemeContext.Provider>
	);
}

export default App;

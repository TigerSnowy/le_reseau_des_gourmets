// composant react :
// capitaliser le nom du composant
// une fonction JS/TS qui renvoie du HTML

// import d'un css global
import "./assets/scss/reset_css.scss";
import "./assets/scss/style.scss";
import { RouterProvider } from "react-router-dom";
import router from "./service/router";
import { useEffect } from "react";
import { UserProvider } from "./provider/UserProvider";

const App = () => {
	// applique immédiatement le thème au body avant le premier rendu
	useEffect(() => {
		// récupére le dernier thème sélectionné dans localStorage
		const savedTheme = localStorage.getItem("selectedTheme") || "theme-default";

		document.body.classList.remove(
			"theme-default",
			"theme-cottonCandy",
			"theme-autumn",
		);
		document.body.classList.add(savedTheme);
	}, []);

	return (
		<UserProvider>
			<RouterProvider router={router} />
		</UserProvider>
	);
};

export default App;

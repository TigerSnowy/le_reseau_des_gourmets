// composant react :
// capitaliser le nom du composant
// une fonction JS/TS qui renvoie du HTML

// import d'un css global
import "./assets/scss/reset_css.scss";
import "./assets/scss/style.scss";
import { RouterProvider } from "react-router-dom";
import router from "./service/router";
import { useContext, useEffect } from "react";
import { UserContext, UserProvider } from "./provider/UserProvider";

const AppContent = () => {
	const { setUser } = useContext(UserContext);

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

		// récupérer l'utilisateur
		const storeUser = localStorage.getItem("user");

		if (storeUser) {
			try {
				const parsedUser = JSON.parse(storeUser);
				setUser(parsedUser);
				console.log("utilisateur récupéré du localStorage");
			} catch (error) {
				console.error("Erreur lors de la récupération de l'utilisateur");
				localStorage.removeItem("user");
				localStorage.removeItem("token");
			}
		}
	}, [setUser]);

	return <RouterProvider router={router} />;
};

const App = () => {
	return (
		<UserProvider>
			<AppContent />
		</UserProvider>
	);
};

export default App;

import { createBrowserRouter, Outlet } from "react-router-dom";
import ContactPage from "../page/ContactPage";
import BaseLayout from "../layout/BasetLayout";
import HomePage from "../page/HomePage";
// import LoginPage from "../page/LoginPage";
// import RegisterPage from "../page/RegisterPage";
// import ProfilePage from "../page/ProfilePage";
// import SettingsPage from "../page/SettingsPage";
// import RecipesPage from "../page/RecipesPage";
// import CreateRecipePage from "../page/CreateRecipePage";

const router = createBrowserRouter([
	{
		path: "/",
		// utilisation d'une mise en page
		element: (
			<BaseLayout>
				<Outlet />
			</BaseLayout>
		),
		// référencer les pages utilisant la mise en page
		children: [
			{
				path: "",
				element: <HomePage />,
			},
			{
				path: "contact",
				element: <ContactPage />,
			},
			{
				path: "connexion",
				element: <div>Connexion</div>,
			},
			{
				path: "inscription",
				element: <div>Inscription</div>,
			},
			{
				path: "profil",
				element: <div>Profil</div>,
			},
			{
				path: "parametres",
				element: <div>Paramètres</div>,
			},
			{
				path: "recettes",
				element: <div>Mes recettes</div>,
			},
			{
				path: "recettes/creation",
				element: <div>Créer une recette</div>,
			},
		],
	},
]);

export default router;

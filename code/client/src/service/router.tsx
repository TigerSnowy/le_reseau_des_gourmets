import { createBrowserRouter, Outlet, Navigate } from "react-router-dom";
import BaseLayout from "../layout/BaseLayout";
import ProfileLayout from "../layout/ProfileLayout";
import HomePage from "../page/HomePage";
import ContactPage from "../page/ContactPage";
import SettingsPage from "../page/SettingsPage";
import ConfidentialityPage from "../page/ConfidentialityPage";
import ThemesPage from "../page/ThemesPage";
import RecipesPage from "../page/RecipesPage";
import CreateRecipePage from "../page/CreateRecipesPage";
import LoginPage from "../page/LoginPage";
import RegisterPage from "../page/RegisterPage";

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
				path: "accueil",
				element: <HomePage />,
			},
			{
				path: "contact",
				element: <ContactPage />,
			},
			{
				path: "connexion",
				element: <LoginPage />,
			},
			{
				path: "inscription",
				element: <RegisterPage />,
			},
			{
				path: "recettes",
				element: <RecipesPage />,
			},
			{
				path: "recettes/creation",
				element: <CreateRecipePage />,
			},
		],
	},

	{
		path: "profil",
		element: <ProfileLayout />,
		children: [
			{ path: "", element: <Navigate to="parametres" replace /> },
			{ path: "parametres", element: <SettingsPage /> },
			{ path: "securite", element: <ConfidentialityPage /> },
			{ path: "themes", element: <ThemesPage /> },
		],
	},
]);

export default router;

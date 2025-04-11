import { createBrowserRouter, Outlet, Navigate } from "react-router-dom";
import BaseLayout from "../layout/BaseLayout";
import ProfileLayout from "../layout/ProfileLayout";
import HomePage from "../page/HomePage";
import ContactPage from "../page/ContactPage";
import SettingsPage from "../page/SettingsPage";
import ConfidentialityPage from "../page/ConfidentialityPage";
import ThemesPage from "../page/ThemesPage";
import RecipesPage from "../page/RecipePage";
import CreateRecipePage from "../page/CreateRecipesPage";
import AllRecipesPage from "../page/AllRecipesPage";
import LoginPage from "../page/LoginPage";
import RegisterPage from "../page/RegisterPage";
import AdminHomePage from "../page/admin/AdminHomePage";
import AdminUserPage from "../page/admin/users/AdminUserPage";
import AdminUserFormPage from "../page/admin/users/AdminUserFormPage";
import AdminUserDeletePage from "../page/admin/users/AdminUserDeletePage";
import LogoutPage from "../page/LogoutPage";
import Guard from "../component/common/guard";
import LegalNoticePage from "../page/LegalNoticePage";
import PrivacyPolicyPage from "../page/PrivacyPolicyPage";

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
				path: "/",
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
				path: "deconnexion",
				element: <LogoutPage />,
			},
			{
				path: "inscription",
				element: <RegisterPage />,
			},
			{
				path: "recettes",
				element: <AllRecipesPage />,
			},
			{
				path: "recettes/:recipe_id",
				element: <RecipesPage />,
			},
			{
				path: "recettes/creation",
				element: <CreateRecipePage />,
			},
			// {
			// 	path: "recettes/creation/recette",
			// 	element: <RecipesPage />,
			// },
			{
				path: "mentions-legales",
				element: <LegalNoticePage />,
			},
			{
				path: "politique-de-confidentialite",
				element: <PrivacyPolicyPage />,
			},
		],
	},

	{
		path: "/admin/",
		element: (
			<Guard roles={["admin"]}>
				<BaseLayout>
					<Outlet />
				</BaseLayout>
			</Guard>
		),
		children: [
			{
				path: "",
				element: <AdminHomePage />,
			},
			{
				path: "utilisateurs",
				element: <AdminUserPage />,
			},
			{
				// on créé une variable optionel (:id?) pour diriger vers le formulaire, mais aussi pour modifier la liste d'utilisateurs
				path: "utilisateurs/formulaire/:id?",
				element: <AdminUserFormPage />,
			},
			{
				path: "utilisateurs/supprimer/:id",
				element: <AdminUserDeletePage />,
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

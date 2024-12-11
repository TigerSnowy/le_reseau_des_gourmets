import { createBrowserRouter } from "react-router-dom";
import ContactPage from "../page/ContactPage";
import BaseLayout from "../layout/BasetLayout";
import HomePage from "../page/HomePage";

const router = createBrowserRouter([
	{
		path: "/",
		// utilisation d'une mise en page
		element: <BaseLayout />,
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
		],
	},

	{
		path: "/contact",
		element: <ContactPage />,
	},
]);

export default router;

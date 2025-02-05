import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const rootElement = document.getElementById("root");

if (!rootElement) {
	throw new Error("L'élément root est introuvable. Vérifie ton index.html !");
}

ReactDOM.createRoot(rootElement).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);

// J'ai supprimé <RouterProvider router={router} /> de App.tsx, et ajouté BrowserRouter ici à la place. Il ne peut y avoir qu'un seul Router à la fois.

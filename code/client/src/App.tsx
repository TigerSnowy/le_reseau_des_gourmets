// composant react :
// capitaliser le nom du composant
// une focntion JS/TS qui renvoie du HTML

// import d'un css global
import "./assets/scss/reset_css.scss";
import "./assets/scss/style.scss";
import { RouterProvider } from "react-router-dom";
import router from "./service/router";

const App = () => {
	return <RouterProvider router={router} />;
};

export default App;

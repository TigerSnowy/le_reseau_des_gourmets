import { Outlet } from "react-router-dom";
import Footer from "../component/common/footer";
import Header from "../component/common/header";

// /les mises en page permettent de définir les composants communs à plusieurs mises en page

const BaseLayout = () => {
	return (
		<>
			<Header />

			{/* Outlet permet de définir l'emplacement du contenu particulier d'une page */}

			<Outlet />

			<Footer />
		</>
	);
};

export default BaseLayout;

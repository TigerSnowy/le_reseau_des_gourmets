// import { Outlet } from "react-router-dom";
// import Footer from "../component/common/footer";
// import Header from "../component/common/header";

import type React from "react";
import type { ReactNode } from "react";
import NavBar from "../component/common/navbar";

type BaseLayoutProps = {
	children: ReactNode; // Définit le type pour 'children'
};

const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
	return (
		<>
			<NavBar />
			<main>{children}</main>
		</>
	);
};

export default BaseLayout;

// // /les mises en page permettent de définir les composants communs à plusieurs mises en page

// const BaseLayout = () => {
// 	return (
// 		<>
// 			<Header />

// 			{/* Outlet permet de définir l'emplacement du contenu particulier d'une page */}

// 			<Outlet />

// 			<Footer />
// 		</>
// 	);
// };

// export default BaseLayout;

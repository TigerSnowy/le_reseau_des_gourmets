import type React from "react";
import type { ReactNode } from "react";
import NavBar from "../component/common/navbar";
import Footer from "../component/common/footer";
import styles from "../assets/scss/baseLayout.module.scss";

type BaseLayoutProps = {
	children: ReactNode;

	// Définit le type pour 'children'. children => contenu unique de chaque page qui sera affiché dans <main>.
};

const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
	return (
		<div className={styles.layout}>
			<NavBar />
			<main className={styles.main}>{children}</main>
			<Footer />
		</div>
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

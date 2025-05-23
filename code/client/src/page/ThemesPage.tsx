import styles from "../assets/scss/profile/themes.module.scss";
import "../assets/css/_themes.css";
import { useState, useEffect } from "react";

const ThemesPage = () => {
	// récupérer le dernier thème enregistré dans localStorage
	const savedTheme = localStorage.getItem("selectedTheme") || "theme-default";
	const [theme, setTheme] = useState(savedTheme);

	// mets à jour le body et sauvegarder le choix
	useEffect(() => {
		document.body.classList.remove(
			"theme-default",
			"theme-cottonCandy",
			"theme-autumn",
		);
		document.body.classList.add(theme);

		// sauvegarde le choix de l'utilisateur
		localStorage.setItem("selectedTheme", theme);
	}, [theme]);

	// Liste des thèmes
	const themes = [
		{
			id: "theme-default",
			name: "Par défaut",
		},
		{
			id: "theme-cottonCandy",
			name: "Cotton Candy",
		},
		{
			id: "theme-autumn",
			name: "Automne",
		},
	];
	return (
		<div className={styles.themesPage}>
			<h2>THÈMES</h2>
			<div className={styles.themesContainer}>
				{themes.map((themeItem) => (
					<button
						type="button"
						key={themeItem.id}
						className={styles.theme}
						onClick={() => setTheme(themeItem.id)}
					>
						<div className={`${themeItem.id} ${styles.themeBox}`}>
							<div className={styles.top} />
							<div className={styles.middle} />
							<div className={styles.bottomRight} />
							<div className={styles.bottom}>
								<div className={styles.button} />
							</div>
						</div>
						<span>{themeItem.name}</span>
					</button>
				))}
			</div>
		</div>
	);
};

export default ThemesPage;

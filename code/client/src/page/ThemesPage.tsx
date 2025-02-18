import styles from "../assets/scss/themes.module.scss";

const ThemesPage = () => {
	return (
		<div className={styles.themesPage}>
			<h2>THÈMES</h2>
			<div className={styles.themesContainer}>
				<div className={styles.theme}>
					<div className={styles.defaultTheme} />
					<span>Par défaut</span>
				</div>
				<div className={styles.theme}>
					<div className={styles.cottonCandyTheme} />
					<span>Cotton Candy</span>
				</div>
				<div className={styles.theme}>
					<div className={styles.autumnTheme} />
					<span>Automne</span>
				</div>
			</div>
		</div>
	);
};

export default ThemesPage;

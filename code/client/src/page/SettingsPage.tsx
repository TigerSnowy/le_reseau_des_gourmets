import styles from "../assets/scss/profile/settings.module.scss";

const SettingsPage = () => {
	return (
		<div className={styles.settingsPage}>
			{/* newletter */}
			<div className={styles.newsletter}>
				<h2>NEWSLETTER</h2>
				<label>
					<input type="checkbox" />
					Activer les notifications par email
				</label>
			</div>
			{/* général */}
			<div className={styles.general}>
				<h2>GÉNÉRAL</h2>
				<input type="text" placeholder="Nom" />
				<input type="text" placeholder="Prénom" />
				<input type="email" placeholder="Email" />
				<button type="button">Enregistrer</button>
			</div>
		</div>
	);
};

export default SettingsPage;

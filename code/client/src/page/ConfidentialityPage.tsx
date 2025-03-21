import styles from "../assets/scss/profile/confidentiality.module.scss";

const ConfidentialityPage = () => {
	return (
		<div className={styles.confidentialityPage}>
			{/* déconnexion et suppression du compte */}
			<div className={styles.accountActions}>
				<button type="button">
					Se déconnecter de <br /> tous les appareils
				</button>
				<button className={styles.deleteAccount} type="button">
					Supprimer mon compte
				</button>
			</div>
			{/* changement de mot de passe */}
			<div className={styles.passwordChange}>
				<h2>
					CHANGER DE <br /> MOT DE PASSE
				</h2>
				<input type="password" placeholder="Mot de passe actuel" />
				<input type="password" placeholder="Nouveau mot de passe" />
				<input
					type="password"
					placeholder="Confirmez le nouveau mot de passe"
				/>
				<button type="button">Enregistrer</button>
			</div>
		</div>
	);
};

export default ConfidentialityPage;

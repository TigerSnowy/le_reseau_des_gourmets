import styles from "../assets/scss/RGPD.module.scss";

const PrivacyPolicyPage = () => {
	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Politique de Confidentialité</h1>

			<h3>1. Données collectées</h3>
			<p>
				Lors de l'utilisation du site <strong>Le Réseau des Gourmets</strong>,
				les données suivantes peuvent être collectées :
			</p>
			<ul>
				<li>
					- Informations d'inscription : pseudo, email, mot de passe (chiffré).
				</li>
				<li>- Contenu des recettes créées par les utilisateurs.</li>
				<li>- Cookies de préférences utilisateur (thème choisi).</li>
			</ul>

			<h3>2. Utilisation des données</h3>
			<p>Les données collectées sont utilisées uniquement pour :</p>
			<ul>
				<li>
					- Gérer les comptes utilisateurs et permettre l'accès aux recettes
					personnalisées.
				</li>
				<li>- Assurer le bon fonctionnement du site.</li>
				<li>
					- Éventuellement envoyer des newsletters (option future, uniquement si
					l'utilisateur a donné son accord).
				</li>
			</ul>

			<h3>3. Partage des données</h3>
			<p>Aucune donnée utilisateur n'est partagée avec des tiers.</p>

			<h3>4. Conservation et sécurité</h3>
			<ul>
				<li>
					- Les comptes inactifs pendant plus d'un an pourront être supprimés
					automatiquement.
				</li>
				<li>- Les mots de passe sont chiffrés pour assurer leur sécurité.</li>
			</ul>

			<h3>5. Droits des utilisateurs</h3>
			<p>
				Conformément au{" "}
				<strong>Règlement Général sur la Protection des Données (RGPD)</strong>,
				les utilisateurs peuvent demander :
			</p>
			<ul>
				<li>- L'accès à leurs données.</li>
				<li>- La rectification ou la suppression de leurs informations.</li>
				<li>- La portabilité de leurs données.</li>
			</ul>
			<p>
				Pour exercer ces droits, un formulaire de contact est mis à disposition.
			</p>

			<h3>6. Cookies</h3>
			<p>
				Les cookies sont utilisés uniquement pour sauvegarder les préférences
				utilisateur (ex : choix du thème).
			</p>
			<p>
				Un bandeau d'acceptation des cookies pourra être mis en place
				ultérieurement si des services de suivi sont ajoutés.
			</p>
		</div>
	);
};

export default PrivacyPolicyPage;

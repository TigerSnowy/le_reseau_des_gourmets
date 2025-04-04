import styles from "../assets/scss/RGPD.module.scss";

const LegalNoticePage = () => {
	return (
		<div className={styles.container}>
			<h1>Mentions Légales</h1>

			<h3>1. Éditeur du site</h3>
			<p>
				Le site Le Réseau des Gourmets est édité par Inès Ferreira, créatrice et
				responsable du projet.
			</p>
			<p>
				Email de contact : lereseaudesgourmets@gmail.com
				<br />
				Adresse postale : [à venir]
			</p>

			<h3>2. Hébergement du site</h3>
			<p>Le site est actuellement hébergé par [à définir].</p>

			<h3>3. Propriété intellectuelle</h3>
			<p>
				Le contenu du site, notamment les textes et les images, sont issus de
				diverses sources culinaires et destinés à être partagés. Les
				utilisateurs sont encouragés à partager les recettes en respectant
				l'esprit de transmission culinaire.
			</p>
			<p>
				Toute reproduction ou utilisation des contenus doit se faire dans le
				respect des droits d’auteurs applicables.
			</p>

			<h3>4. Conditions d'utilisation</h3>
			<p>
				L’utilisation du site Le Réseau des Gourmets est soumise aux conditions
				suivantes : Les utilisateurs s'engagent à utiliser le site de manière
				respectueuse et à ne pas publier de contenus illicites.
			</p>
			<p>
				L’usage abusif du site (spam, harcèlement, faux comptes) peut entraîner
				une suspension ou suppression du compte concerné. L’éditeur se réserve
				le droit de modifier, suspendre ou supprimer tout contenu non conforme
				aux présentes conditions.
			</p>

			<h3>5. Responsabilités</h3>
			<p>
				L’éditeur du site ne peut être tenu responsable des éventuelles erreurs,
				omissions ou inexactitudes présentes sur le site, ni des dommages
				directs ou indirects résultant de l’utilisation du site. L’usage du site
				se fait sous l’entière responsabilité de l’utilisateur.
			</p>

			<h3>6. Droit applicable et juridiction</h3>
			<p>
				Les présentes mentions légales sont soumises au droit français. En cas
				de litige, les tribunaux français seront seuls compétents.
			</p>
		</div>
	);
};

export default LegalNoticePage;

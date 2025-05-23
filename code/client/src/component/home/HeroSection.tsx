import styles from "../../assets/scss/home/sectionHero.module.scss";

const HeroSection: React.FC = () => {
	return (
		<section className={styles.heroSection} aria-labelledby="titre-hero">
			<div className={styles.heroContent}>
				<h1 className={styles.heroTitle} id="titre-hero">
					Le Réseau des Gourmets <br />{" "}
					<span>
						Ta cuisine, ton mood, <br /> tes recettes.
					</span>
				</h1>

				<div className={styles.heroDescription}>
					<p>
						Votre <strong>espace culinaire numérique</strong> où chaque recette
						prend vie selon vos envies.
					</p>

					<p>
						Que vous soyez passionné de cuisine ou simplement en quête d'un
						moyen facile d'organiser vos recettes, notre plateforme est là pour
						vous accompagner.
					</p>

					<p>
						<strong>Créez, personnalisez</strong> et retrouvez toutes vos idées
						en <strong>un clin d'œil</strong>, pour une expérience culinaire
						simple, pratique et inspirante.
					</p>
				</div>
			</div>

			<div className={styles.heroImageContainer}>
				<img
					src="/img/home/carnet.jpg"
					alt="Livre de recettes ouvert avec des ingrédients frais"
					className={styles.heroImage}
				/>
				<div className={styles.decorativeElement}>
					<img
						src="/img/home/grenadine.png"
						alt="Personnage smoothie"
						className={styles.smoothieCharacter}
					/>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;

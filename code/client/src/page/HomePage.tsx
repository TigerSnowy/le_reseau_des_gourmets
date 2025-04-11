import HeroSection from "../component/home/HeroSection";
import FeaturesSection from "../component/home/FeaturesSection";
import CallToAction from "../component/home/CallToAction";
import FeatureCard from "../component/home/FeatureCard";
import styles from "../assets/scss/home/homepage.module.scss";

const HomePage: React.FC = () => {
	return (
		<div className={styles.homepageContainer}>
			{/* section titre et introduction */}
			<HeroSection />

			{/* section fonctionnalités */}
			<FeaturesSection>
				<FeatureCard
					title="DES THÈMES POUR TOUS LES GOÛTS"
					description="Choisissez le design qui vous correspond pour personnaliser vos recettes et créer l'atmosphère qui vous plaît."
					imageUrl="/img/home/card_themes.png"
					altText="Illustration de différents thèmes colorés"
				/>
				<FeatureCard
					title="UNE CUISINE ADAPTÉE À CHAQUE HUMEUR"
					description="Que vous ayez envie de comfort food ou de légèreté, trouvez la recette qui correspond à votre humeur et à votre moment."
					imageUrl="/img/home/buche.jpg"
					altText="Bûche de Noël fruitée"
				/>
			</FeaturesSection>

			{/* section call to action */}
			<CallToAction />
		</div>
	);
};

export default HomePage;

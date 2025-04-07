import { Link } from "react-router-dom";
import styles from "../../assets/scss/recipe/recipeCard.module.scss";
import type Tag from "../../model/tag.js";

type RecipeCardProps = {
	id: number;
	title: string;
	imageUrl: string;
	tags: Tag[];
};

const RecipeCard: React.FC<RecipeCardProps> = ({
	id,
	title,
	imageUrl,
	tags,
}) => {
	// limite l'affichage des tags à 2
	const displayTags = tags.slice(0, 2);

	return (
		<Link to={`/recettes/${id}`} className={styles.recipeCard}>
			<div className={styles.recipeCardInner}>
				<h3 className={styles.recipeTitle}>{title}</h3>
				<div className={styles.imageContainer}>
					<img
						src={
							imageUrl.startsWith("/")
								? `${import.meta.env.VITE_API_URL}${imageUrl}`
								: imageUrl
						}
						alt={title}
						className={styles.recipeImage}
					/>
				</div>
				<div className={styles.tagContainer}>
					{displayTags.map((tag) => (
						<span key={tag.tag_id} className={styles.tag}>
							{tag.name}
						</span>
					))}
				</div>
			</div>
		</Link>
	);
};

export default RecipeCard;

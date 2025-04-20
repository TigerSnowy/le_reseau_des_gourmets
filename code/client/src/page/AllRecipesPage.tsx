import { useState, useEffect, useContext } from "react";
import styles from "../assets/scss/recipe/allRecipes.module.scss";
import RecipeCard from "../component/recipe/recipeCard";
import type Recipe from "../model/recipe";
import { UserContext } from "../provider/UserProvider";
import RecipeAPI from "../service/recipe_api";
import SecurityAPI from "../service/security_api";
import type User from "../model/user";

const AllRecipesPage = () => {
	const [recipes, setRecipes] = useState<Recipe[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const { user } = useContext(UserContext);

	useEffect(() => {
		const fetchRecipes = async () => {
			if (!user) {
				return;
			}

			try {
				setLoading(true);

				if (!user) {
					setError("Veuillez vous connecter pour voir vos recettes.");
					setLoading(false);
					return;
				}

				// récupérer le token d'authentification
				let token = "";
				if (user) {
					const storedToken = localStorage.getItem("token");
					if (storedToken) {
						token = storedToken;
					} else {
						// redemander un nouveau token si pas de token
						const authResponse = await new SecurityAPI().auth(user as User);
						if (authResponse.status === 200) {
							token = authResponse.data.token;
							localStorage.setItem("token", token);
						}
					}
				}

				// récupére toutes les recettes
				const response = await new RecipeAPI().selectAll(token, user?.user_id);

				if (response.success) {
					setRecipes(response.data);
				} else {
					setError(
						response.message || "Erreur lors du chargement des recettes",
					);
				}
			} catch (err) {
				console.error("Error fetching recipes:", err);
				setError("Une erreur est survenue");
			} finally {
				setLoading(false);
			}
		};

		if (user) {
			fetchRecipes();
		} else {
			setLoading(true);
		}
	}, [user]);

	if (loading) {
		return (
			<div className={styles.loadingContainer}>Chargement des recettes...</div>
		);
	}

	if (error) {
		return <div className={styles.errorContainer}>{error}</div>;
	}

	return (
		<div className={styles.allRecipesContainer}>
			<h1 className={styles.pageTitle}>Mon Carnet</h1>

			{recipes.length === 0 ? (
				<div className={styles.emptyState}>
					<p>
						Vous n'avez pas encore de recettes. Créez votre première recette !
					</p>
					<a href="/recettes/creation" className={styles.createRecipeButton}>
						Créer une recette
					</a>
				</div>
			) : (
				<div className={styles.recipesGrid}>
					{recipes.map((recipe) => (
						<RecipeCard
							key={recipe.recipe_id}
							id={recipe.recipe_id}
							title={recipe.title}
							imageUrl={
								recipe.picture?.image
									? recipe.picture.image.startsWith("/")
										? `${import.meta.env.VITE_API_URL}${recipe.picture.image}`
										: `${import.meta.env.VITE_API_URL}/img/${recipe.picture.image}`
									: "/img/default_recipe_img.png"
							}
							tags={recipe.tags || []}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default AllRecipesPage;

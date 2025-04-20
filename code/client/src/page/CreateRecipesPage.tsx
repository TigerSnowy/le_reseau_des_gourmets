import { useContext, useEffect, useState } from "react";
import styles from "../assets/scss/recipe/createRecipe.module.scss";
import SecurityAPI from "../service/security_api";
import type User from "../model/user";
import type Recipe from "../model/recipe";
import RecipeAPI from "../service/recipe_api";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../provider/UserProvider";
import type Tag from "../model/tag";
import type Ingredient from "../model/ingredient";
import type Instruction from "../model/instruction";
import PictureAPI from "../service/picture_api";

const DEFAULT_RECIPE_IMAGE = "/img/default_recipe_img.png";

type PartialTag = Omit<Tag, "tag_id">;

const CreateRecipePage = () => {
	const navigate = useNavigate();

	const { user } = useContext(UserContext);

	const [isSubmitting, setIsSubmitting] = useState(false);

	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!user) {
			navigate("/connexion");
		}
	}, [user, navigate]);

	// stocke le nomde la recette
	const [recipeName, setRecipeName] = useState("");

	const [recipeDescription, setRecipeDescription] = useState("");

	// stocke l'image téléchargée par l'utilisateur
	const [image, setImage] = useState<File | null>(null);

	const [imagePreview, setImagePreview] = useState<string | null>(null);

	// stocke la liste des ingrédients (un id unique pour chaque (crypto.randomUUID))
	const [ingredients, setIngredients] = useState([
		{ id: crypto.randomUUID(), name: "", quantity: "", unit: "" },
	]);

	//stocke la liste des instructions sous forme de texte (id unique)
	const [instructions, setInstructions] = useState([
		{ id: crypto.randomUUID(), text: "" },
	]);

	// stocke les tags associés à la recette
	const [tags, setTags] = useState("");

	// stocke le temps de préparation et de cuisson
	const [preparationTime, setPreparationTime] = useState("");
	const [cookingTime, setCookingTime] = useState("");

	// stocke la difficulté de la recette
	const [difficulty, setDifficulty] = useState<
		"Facile" | "Moyen" | "Difficile"
	>("Facile");

	// formatage du temps
	const formatTimeForDatabase = (minutes: string): string | null => {
		if (!minutes || minutes.trim() === "") return null;

		const numMinutes = Number.parseInt(minutes, 10);
		if (Number.isNaN(numMinutes)) return null;

		const hours = Math.floor(numMinutes / 60);
		const mins = numMinutes % 60;

		return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:00`;
	};

	// INGRÉDIENTS

	// ajoute un nouvel ingrédient à la liste
	const addIngredient = () => {
		setIngredients([
			...ingredients,
			{ id: crypto.randomUUID(), name: "", quantity: "", unit: "" },
		]);
	};

	// met à jour uniquement le champ concerné (ingrédient, quantité ou unité)
	const updateIngredient = (
		id: string,
		field: keyof (typeof ingredients)[0],
		value: string,
	) => {
		setIngredients(
			ingredients.map((ingredient) =>
				ingredient.id === id ? { ...ingredient, [field]: value } : ingredient,
			),
		);
	};

	// supprime un ingrédient
	const removeIngredient = (id: string) => {
		if (ingredients.length > 1) {
			setIngredients(ingredients.filter((ingredient) => ingredient.id !== id));
		}
	};

	// INSTRUCTIONS

	// ajoute une nouvelle instruction à la liste
	const addInstruction = () => {
		setInstructions([...instructions, { id: crypto.randomUUID(), text: "" }]);
	};

	const updateInstruction = (id: string, text: string) => {
		setInstructions(
			instructions.map((instruction) =>
				instruction.id === id ? { ...instruction, text } : instruction,
			),
		);
	};

	// supprimer une instruction
	const removeInstruction = (id: string) => {
		if (instructions.length > 1) {
			setInstructions(
				instructions.filter((instruction) => instruction.id !== id),
			);
		}
	};

	// IMAGE

	// gère le changement d'image
	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files?.[0]) {
			const selectedFile = event.target.files[0];
			setImage(selectedFile);

			// url d'aperçu
			const objectUrl = URL.createObjectURL(selectedFile);
			setImagePreview(objectUrl);

			// nettoyer l'url d'aperçu à la fin
			return () => URL.revokeObjectURL(objectUrl);
		}
	};

	// supprime l'image
	const removeImage = () => {
		setImage(null);
		setImagePreview(null);
	};

	// FORMULAIRE

	// validation

	const validateForm = () => {
		if (!recipeName.trim()) {
			setError("Le nom de la recette est requis.");
			return false;
		}

		if (ingredients.some((ingredient) => !ingredient.name.trim())) {
			setError("Tous les ingrédients doivent avoir un nom.");
			return false;
		}

		if (instructions.some((instruction) => !instruction.text.trim())) {
			setError("Toutes les instructions doivent avoir un texte.");
			return false;
		}

		return true;
	};

	// soumettre le formulaire

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		if (!user) {
			setError("Vous devez être connecté pour créer une recette.");
			return;
		}

		if (!validateForm()) {
			return;
		}

		setIsSubmitting(true);
		setError(null);

		try {
			// récupérer le token
			let token = localStorage.getItem("token");

			if (!token) {
				const authResponse = await new SecurityAPI().auth(user as User);
				if (authResponse.status === 200) {
					const newToken = authResponse.data.token;
					if (newToken) {
						localStorage.setItem("token", newToken);
						token = newToken;
					} else {
						throw new Error("Token d'authentification invalide");
					}
				} else {
					throw new Error("Erreur d'authentification");
				}
			}

			// préparer les données de la recette

			const tagList: PartialTag[] = tags
				.split(",")
				.map((tag) => tag.trim())
				.filter((tag) => tag !== "")
				.map((tag) => ({
					name: tag,
					user_id: user.user_id,
				}));

			const recipeData: Partial<Recipe> = {
				title: recipeName,
				description: recipeDescription,
				preparation_time: formatTimeForDatabase(preparationTime),
				cooking_time: formatTimeForDatabase(cookingTime),
				difficulty,
				user_id: user.user_id,
				ingredients: ingredients.map((ingredient) => ({
					name: ingredient.name,
					quantity: ingredient.quantity,
					unit: ingredient.unit || null,
					recipe_id: 0,
				})) as unknown as Ingredient[],

				instructions: instructions.map((instruction, index) => ({
					step_number: index + 1,
					text: instruction.text,
					recipe_id: 0,
				})) as unknown as Instruction[],

				tags: tagList as unknown as Tag[],
			};

			// envoyer la recette au serveur
			if (token) {
				console.log("Envoi des données de recette:", recipeData);
				const response = await new RecipeAPI().insert(recipeData, token);
				console.log("Réponse de création de recette:", response);

				if (response.success && response.data && response.data.recipe_id) {
					const recipeId = response.data.recipe_id;
					console.log("ID de la recette créée:", recipeId);

					// si une image a été sélectionnée, la télécharger
					if (image) {
						try {
							const formData = new FormData();
							formData.append("image", image);
							formData.append("recipe_id", recipeId.toString());

							const imageResponse = await new PictureAPI().uploadRecipeImage(
								formData,
								token,
							);
							console.log("Réponse de téléchargement d'image:", imageResponse);

							if (!imageResponse.success) {
								console.error(
									"Erreur lors du téléchargement de l'image:",
									imageResponse.message,
								);
							}
						} catch (imgError) {
							console.error(
								"Erreur lors du téléchargement de l'image:",
								imgError,
							);
						}
					}

					// Attendre un court instant avant de naviguer
					// Cela peut aider à résoudre certains problèmes de navigation/timing
					setTimeout(() => {
						console.log("Navigation vers la page de la recette...");
						navigate(`/recettes/${recipeId}`);
					}, 300);
				} else {
					console.error("Données de réponse incorrectes:", response);
					setError(
						"Impossible de créer la recette. Données de réponse incorrectes.",
					);
					navigate("/recettes");
				}
			} else {
				setError("Erreur d'authentification.");
				navigate("/connexion");
			}
		} catch (err) {
			console.error("Erreur lors de la création de la recette:", err);
			setError("Une erreur est survenue lors de la création de la recette.");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className={styles.recipeContainer}>
			{error && <div className={styles.errorMessage}>{error}</div>}

			<form onSubmit={handleSubmit}>
				<div className={styles.left}>
					<h1>Créer une recette</h1>
					{/* nom de la recette */}
					<div className={styles.formGroup}>
						<input
							className={styles.nameInput}
							type="text"
							placeholder="Nom de la recette*"
							value={recipeName}
							onChange={(e) => setRecipeName(e.target.value)}
							required
						/>
					</div>

					{/* description */}
					<div className={styles.formGroup}>
						<textarea
							placeholder="Description de la recette"
							value={recipeDescription}
							onChange={(e) => setRecipeDescription(e.target.value)}
							className={styles.descriptionInput}
						/>
					</div>

					{/* temps de préparation et cuisson */}
					<div className={styles.timeInputs}>
						<input
							type="number"
							placeholder="Temps de préparation (min)"
							value={preparationTime}
							onChange={(e) => setPreparationTime(e.target.value)}
							min="0"
							max="999"
						/>
						<input
							type="number"
							placeholder="Temps de cuisson (min)"
							value={cookingTime}
							onChange={(e) => setCookingTime(e.target.value)}
							min="0"
							max="999"
						/>
					</div>

					{/* difficulté */}
					<div className={styles.formGroup}>
						<select
							value={difficulty}
							onChange={(e) =>
								setDifficulty(
									e.target.value as "Facile" | "Moyen" | "Difficile",
								)
							}
							className={styles.difficultySelect}
						>
							<option value="Facile">Facile</option>
							<option value="Moyen">Moyen</option>
							<option value="Difficile">Difficile</option>
						</select>
					</div>

					{/* image */}
					<label htmlFor="imageUpload" className={styles.customFileUpload}>
						Choisir une image
					</label>
					<input
						id="imageUpload"
						type="file"
						accept="image/*"
						onChange={handleImageChange}
						className={styles.imgInput}
					/>
					{imagePreview && (
						<div>
							<img
								src={imagePreview}
								alt="Aperçu de l'image"
								className={styles.previewImage}
							/>
							<button
								type="button"
								onClick={removeImage}
								className={styles.deleteImage}
							>
								Supprimer
							</button>
						</div>
					)}
				</div>
				<div className={styles.right}>
					{/* ingrédients */}
					<h3>Ingrédients</h3>
					{ingredients.map((ingredient) => (
						<div key={ingredient.id} className={styles.ingredientRow}>
							<input
								type="text"
								placeholder="Nom de l'ingrédient*"
								value={ingredient.name}
								onChange={(e) =>
									updateIngredient(ingredient.id, "name", e.target.value)
								}
								required
							/>
							{/* quantité */}
							<input
								type="text"
								placeholder="Quantité"
								value={ingredient.quantity}
								onChange={(e) =>
									updateIngredient(ingredient.id, "quantity", e.target.value)
								}
							/>
							{/* unité */}
							<select
								value={ingredient.unit}
								onChange={(e) =>
									updateIngredient(ingredient.id, "unit", e.target.value)
								}
							>
								<option value="">Unités</option>
								<option value="mg">mg</option>
								<option value="g">g</option>
								<option value="kg">kg</option>
								<option value="ml">ml</option>
								<option value="cl">cl</option>
								<option value="l">l</option>
								<option value="càc">càc</option>
								<option value="càs">càs</option>
								<option value="pincée">pincée</option>
								<option value="oz">oz</option>
								<option value="lb">lb</option>
								<option value="unité">unité</option>
							</select>

							<button
								type="button"
								onClick={() => removeIngredient(ingredient.id)}
								className={styles.deleteButton}
								disabled={ingredients.length <= 1}
							>
								🗑
							</button>
						</div>
					))}

					<button type="button" onClick={addIngredient}>
						Ajouter un ingrédient
					</button>

					{/* instructions */}
					<h3 className={styles.instructionsMargin}>Instructions</h3>

					{instructions.map((step, index) => (
						<div key={step.id} className={styles.instructionRow}>
							<span className={styles.stepNumber}>{index + 1}.</span>
							<textarea
								placeholder={"Description de l'étape*"}
								value={step.text}
								onChange={(e) => updateInstruction(step.id, e.target.value)}
								required
							/>
							<button
								type="button"
								onClick={() => removeInstruction(step.id)}
								className={styles.deleteButton}
								disabled={instructions.length <= 1}
							>
								🗑
							</button>
						</div>
					))}
					<button type="button" onClick={addInstruction}>
						Ajouter une étape
					</button>

					{/* tags */}
					<input
						type="text"
						placeholder="Tags (ex: dessert,citron) - séparés par des virgules"
						value={tags}
						onChange={(e) => setTags(e.target.value)}
						className={styles.tagsInput}
					/>

					<button
						className={styles.submitButton}
						type="submit"
						disabled={isSubmitting}
					>
						{isSubmitting ? "Création en cours..." : "Créer la recette"}
					</button>
				</div>
			</form>
		</div>
	);
};

export default CreateRecipePage;

import { useContext, useEffect, useState } from "react";
import styles from "../assets/scss/recipe/recipe.module.scss";
import type Recipe from "../model/recipe";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../provider/UserProvider";
import type Ingredient from "../model/ingredient";
import type Instruction from "../model/instruction";
import SecurityAPI from "../service/security_api";
import type User from "../model/user";
import RecipeAPI from "../service/recipe_api";
import type Tag from "../model/tag";

const DEFAULT_RECIPE_IMAGE = "/img/default_recipe_img.png";

const RecipePage = () => {
	const { recipeId } = useParams<{ recipeId: string }>();
	const { user } = useContext(UserContext);
	const navigate = useNavigate();

	// états pour la gestion de recette
	const [recipe, setRecipe] = useState<Recipe | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [isEditing, setIsEditing] = useState(false);
	const [isSaving, setIsSaving] = useState(false);

	// états pour l'édition
	const [editedTitle, setEditedTitle] = useState("");
	const [editedDescription, setEditedDescription] = useState("");
	const [editedPreparationTime, setEditedPreparationTime] = useState("");
	const [editedCookingTime, setEditedCookingTime] = useState("");
	const [editedDifficulty, setEditedDifficulty] = useState("Facile");
	const [editedIngredients, setEditedIngredients] = useState<
		(Ingredient & { id: string })[]
	>([]);
	const [editedInstructions, setEditedInstructions] = useState<
		(Instruction & { id: string })[]
	>([]);
	const [editedTags, setEditedTags] = useState<string>("");
	const [image, setImage] = useState<File | null>(null);
	const [imagePreview, setImagePreview] = useState<string | null>(null);

	const formatTimeForDatabase = (minutes: string): string | null => {
		if (!minutes || minutes.trim() === "") return null;

		const numMinutes = Number.parseInt(minutes, 10);
		if (Number.isNaN(numMinutes)) return null;

		const hours = Math.floor(numMinutes / 60);
		const mins = numMinutes % 60;

		return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:00`;
	};

	// charger les détails de la recette
	useEffect(() => {
		const fetchRecipe = async () => {
			if (!recipeId) return;

			try {
				console.log("Début du chargement de la recette ID:", recipeId);
				setLoading(true);

				// obtenir le token si l'utilisateur est connecté
				let token = "";
				if (user) {
					const storedToken = localStorage.getItem("token");
					if (storedToken) {
						token = storedToken;
					} else {
						const authResponse = await new SecurityAPI().auth(user as User);
						if (authResponse.status === 200) {
							token = authResponse.data.token;
							localStorage.setItem("token", token);
						}
					}
				}

				// on récupère la recette
				console.log(
					"Envoi de la requête pour récupérer la recette ID:",
					recipeId,
				);
				const response = await new RecipeAPI().selectOne(
					Number.parseInt(recipeId),
					token,
				);
				console.log("Réponse de la requête recette:", response);

				if (response.success) {
					console.log("Données de recette reçues:", response.data);
					setRecipe(response.data);

					// états d'édition
					setEditedTitle(response.data.title);
					setEditedDescription(response.data.description || "");

					// convertir les temps en format minutes
					const prepTime = response.data.preparation_time
						? Number.parseInt(response.data.preparation_time.split(":")[1])
						: "";
					const cookTime = response.data.cooking_time
						? Number.parseInt(response.data.cooking_time.split(":")[1])
						: "";

					setEditedPreparationTime(prepTime.toString());
					setEditedCookingTime(cookTime.toString());
					setEditedDifficulty(response.data.difficulty || "Facile");

					// donner des ids aux ingrédients pour l'édition
					if (
						response.data.ingredients &&
						response.data.ingredients.length > 0
					) {
						setEditedIngredients(
							response.data.ingredients.map((ing: Ingredient) => ({
								...ing,
								id: crypto.randomUUID(),
							})),
						);
					} else {
						setEditedIngredients([
							{
								id: crypto.randomUUID(),
								name: "",
								quantity: "",
								unit: null,
								ingredient_id: 0,
								recipe_id: Number.parseInt(recipeId),
							},
						]);
					}

					// donner des ids aux instructions pour l'édition
					if (
						response.data.instructions &&
						response.data.instructions.length > 0
					) {
						setEditedInstructions(
							response.data.instructions.map((instr: Instruction) => ({
								...instr,
								id: crypto.randomUUID(),
							})),
						);
					} else {
						setEditedInstructions([
							{
								id: crypto.randomUUID(),
								text: "",
								instruction_id: 0,
								recipe_id: Number.parseInt(recipeId),
								step_number: 1,
							},
						]);
					}

					// puis les tags
					if (response.data.tags && response.data.tags.length > 0) {
						setEditedTags(
							response.data.tags.map((tag: Tag) => tag.name).join(","),
						);
					}
				} else {
					console.error("Erreur de chargement:", response);
					setError(
						response.message || "Erreur lors du chargement de la recette",
					);
				}
			} catch (err) {
				console.error("Error fetching recipe:", err);
				setError("Une erreur est survenue");
			} finally {
				setLoading(false);
			}
		};

		fetchRecipe();
	}, [recipeId, user]);

	// active/désactive l'édition
	const toggleEdit = () => {
		setIsEditing(!isEditing);
	};

	// A SUPPRIMER

	// pour stocker la recette (sans back pour l'instant)
	// const [recipeName, setRecipeName] = useState("Tarte au citron");
	// // const [image, setImage] = useState<File | null>(null);
	// const [preparationTime, setPreparationTime] = useState("20");
	// const [cookingTime, setCookingTime] = useState("40");
	// const [difficulty, setDifficulty] = useState("Facile");
	// const [ingredients, setIngredients] = useState([
	// 	{ id: crypto.randomUUID(), name: "Farine", quantity: "200", unit: "g" },
	// 	{ id: crypto.randomUUID(), name: "Oeufs", quantity: "2", unit: "" },
	// 	{ id: crypto.randomUUID(), name: "Sucre", quantity: "50", unit: "g" },
	// 	{ id: crypto.randomUUID(), name: "Citron", quantity: "3", unit: "" },
	// 	{ id: crypto.randomUUID(), name: "Lait", quantity: "100", unit: "ml" },
	// ]);

	// const [instructions, setInstructions] = useState([
	// 	{ id: crypto.randomUUID(), text: "Mélanger les ingrédients." },
	// 	{ id: crypto.randomUUID(), text: "Mélanger les ingrédients." },
	// 	{ id: crypto.randomUUID(), text: "Mélanger les ingrédients." },
	// 	{ id: crypto.randomUUID(), text: "Cuire au four à 180°C." },
	// ]);

	const [tags, setTags] = useState<string[]>(["dessert", "facile"]);
	const [newTag, setNewTag] = useState("");

	// TAGS

	// ajoute un tag
	const addTag = () => {
		if (newTag.trim() !== "" && !tags.includes(newTag.trim())) {
			setTags([...tags, newTag.trim()]);
			setNewTag("");
		}
	};

	// supprime un tag
	const removeTag = (tag: string) => {
		setTags(tags.filter((t) => t !== tag));
	};

	// INGREDIENTS

	// ajoute un ingrédient
	const addIngredient = () => {
		if (!recipeId) return;

		setEditedIngredients([
			...editedIngredients,
			{
				id: crypto.randomUUID(),
				name: "",
				quantity: "",
				unit: null,
				ingredient_id: 0,
				recipe_id: Number.parseInt(recipeId),
			},
		]);
	};

	// modifie un ingrédient
	const updateIngredient = (
		id: string,
		field: keyof Omit<
			(typeof editedIngredients)[0],
			"id" | "ingredient_id" | "recipe_id"
		>,
		value: string,
	) => {
		setEditedIngredients(
			editedIngredients.map((i) =>
				i.id === id ? { ...i, [field]: value } : i,
			),
		);
	};

	// supprime un ingrédient
	const removeIngredient = (id: string) => {
		if (editedIngredients.length > 1) {
			setEditedIngredients(editedIngredients.filter((i) => i.id !== id));
		}
	};

	// INSTRUCTIONS

	// Ajoute une instruction
	const addInstruction = () => {
		if (!recipeId) return;

		const newStepNumber = editedInstructions.length + 1;

		setEditedInstructions([
			...editedInstructions,
			{
				id: crypto.randomUUID(),
				text: "",
				instruction_id: 0,
				recipe_id: Number.parseInt(recipeId),
				step_number: newStepNumber,
			},
		]);
	};

	// Modifie une instruction
	const updateInstruction = (id: string, text: string) => {
		setEditedInstructions(
			editedInstructions.map((i) => (i.id === id ? { ...i, text } : i)),
		);
	};

	// Supprime une instruction
	const removeInstruction = (id: string) => {
		if (editedInstructions.length > 1) {
			const filteredInstructions = editedInstructions.filter(
				(i) => i.id !== id,
			);

			// numéros d'étapes
			const updatedInstructions = filteredInstructions.map((instr, index) => ({
				...instr,
				step_number: index + 1,
			}));

			setEditedInstructions(updatedInstructions);
		}
	};

	// IMAGE

	// gère le changement d'image
	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files?.[0]) {
			const selectedFile = event.target.files[0];
			setImage(selectedFile);

			// URL d'aperçu
			const objectUrl = URL.createObjectURL(selectedFile);
			setImagePreview(objectUrl);

			// supprimer l'URL d'aperçu à la fin
			return () => URL.revokeObjectURL(objectUrl);
		}
	};

	// SAUVEGARDE

	// sauvegarde les modifications
	const saveChanges = async () => {
		if (!recipe || !user || !recipeId) return;

		try {
			setIsSaving(true);

			// récupérer le token
			let token = localStorage.getItem("token");

			// si pas de token,, tenter d'en obtenir un nouveau
			if (!token) {
				const authResponse = await new SecurityAPI().auth(user as User);
				if (authResponse.status === 200) {
					token = authResponse.data.token;
					localStorage.setItem("token", token as string);
				} else {
					throw new Error("Echec d'authentification");
				}
			}

			// tags
			const tagList = editedTags
				.split(",")
				.map((tag) => tag.trim())
				.filter((tag) => tag !== "")
				.map((tag) => ({ name: tag, user_id: user.user_id }));

			// données de mise à jour
			const updatedRecipe: Partial<Recipe> = {
				recipe_id: Number.parseInt(recipeId),
				title: editedTitle,
				description: editedDescription || null,
				preparation_time: formatTimeForDatabase(editedPreparationTime),
				cooking_time: formatTimeForDatabase(editedCookingTime),
				difficulty: editedDifficulty as "Facile" | "Moyen" | "Difficile" | null,
				user_id: user.user_id,
				ingredients: editedIngredients.map(({ id, ...rest }) => rest),
				instructions: editedInstructions.map(({ id, ...rest }) => rest),
				tags: tagList as unknown as Tag[],
			};

			// envoyer la mise à jour
			const saveResponse = await new RecipeAPI().update(
				updatedRecipe,
				token as string,
			);

			if (saveResponse.success) {
				// Utiliser navigate plutôt que reload pour une meilleure expérience
				navigate(`/recettes/${recipeId}`, { replace: true });
			} else {
				setError(saveResponse.message);
				setIsEditing(false);
			}
		} catch (err) {
			console.error("Error updating recipe:", err);
			setError("Une erreur est survenue lors de la mise à jour");
		} finally {
			setIsSaving(false);
		}
	};

	// gérer la suppression de la recette
	const handleDelete = async () => {
		if (!recipe || !user || !recipeId) return;

		if (window.confirm("Êtes-vous sûr de vouloir supprimer cette recette ?")) {
			try {
				// récupérer le token
				let token = localStorage.getItem("token");

				if (!token) {
					const authResponse = await new SecurityAPI().auth(user as User);
					if (authResponse.status === 200) {
						token = authResponse.data.token;
						localStorage.setItem("token", token as string);
					} else {
						throw new Error("Echec d'authentification");
					}
				}

				// supprimer la recette
				const response = await new RecipeAPI().delete(
					Number.parseInt(recipeId),
					user.user_id,
					token as string,
				);

				if (response.success) {
					navigate("/recettes");
				} else {
					setError(response.message);
				}
			} catch (err) {
				console.error("Error deleting recipe:", err);
				setError("Une erreur est survenue lors de la suppresion");
			}
		}
	};

	if (loading) {
		return (
			<div className={styles.loadingContainer}>Chargement de la recette...</div>
		);
	}

	if (error) {
		return <div className={styles.errorContainer}>{error}</div>;
	}

	if (!recipe) {
		return <div className={styles.errorContainer}>Recette non trouvée</div>;
	}

	// calculer l'URL de l'image
	const recipeImage = recipe.picture?.image
		? recipe.picture.image.startsWith("/")
			? `${import.meta.env.VITE_API_URL}${recipe.picture.image}`
			: `${import.meta.env.VITE_API_URL}/img/${recipe.picture.image}`
		: DEFAULT_RECIPE_IMAGE;

	// vérifier si la recette appartient à l'utilisateur
	const isOwner = user && recipe.user_id === user.user_id;

	return (
		<div className={styles.recipeContainer}>
			<div className={styles.card}>
				{/* Partie gauche */}
				<div className={styles.left}>
					{/* Nom de la recette */}
					<h1>
						{isEditing ? (
							<input
								type="text"
								value={editedTitle}
								onChange={(e) => setEditedTitle(e.target.value)}
								required
								className={styles.titleInput}
							/>
						) : (
							recipe.title
						)}
					</h1>

					{/* Temps de préparation et cuisson côte à côte */}
					<h3>Temps</h3>
					<div className={styles.timeContainer}>
						<div className={styles.timeBlock}>
							<p className={styles.timeTitle}>Préparation :</p>
							<p className={styles.time}>
								{isEditing ? (
									<input
										type="number"
										value={editedPreparationTime}
										onChange={(e) => setEditedPreparationTime(e.target.value)}
									/>
								) : (
									`${editedPreparationTime} min`
								)}
							</p>
						</div>

						<div className={styles.timeBlock}>
							<p className={styles.timeTitle}>Cuisson :</p>
							<p className={styles.time}>
								{isEditing ? (
									<input
										type="number"
										value={editedCookingTime}
										onChange={(e) => setEditedCookingTime(e.target.value)}
									/>
								) : (
									`${editedCookingTime} min`
								)}
							</p>
						</div>
					</div>

					{/* Difficulté */}
					<div className={styles.difficultyContainer}>
						<h3>Difficulté</h3>
						<div className={styles.difficulty}>
							{isEditing ? (
								<select
									value={editedDifficulty}
									onChange={(e) => setEditedDifficulty(e.target.value)}
									className={styles.difficultySelect}
								>
									<option value="Facile">Facile</option>
									<option value="Moyen">Moyen</option>
									<option value="Difficile">Difficile</option>
								</select>
							) : (
								<p className={styles.difficulty}>
									{recipe.difficulty || "Non spécifiée"}
								</p>
							)}
						</div>
					</div>

					{/* Tags */}
					<h3>Tags</h3>
					{isEditing ? (
						<div className={styles.addTag}>
							<input
								type="text"
								value={editedTags}
								onChange={(e) => setEditedTags(e.target.value)}
								placeholder="Tags séparas par des virgules"
								className={styles.tagsInput}
							/>
							{/* <button type="button" onClick={addTag}>
								Ajouter
							</button> */}
						</div>
					) : (
						<div className={styles.tagsContainer}>
							{recipe.tags && recipe.tags.length > 0 ? (
								recipe.tags.map((tag) => (
									<span key={tag.tag_id} className={styles.tag}>
										{tag.name}
									</span>
								))
							) : (
								<p>Aucun tag</p>
							)}
						</div>
					)}

					{/* Gestion de l'image */}
					{isEditing ? (
						<div className={styles.imageUploadContainer}>
							<label htmlFor="imageUpload" className={styles.customFileUpload}>
								Changer l'image
							</label>
							<input
								id="imageUpload"
								type="file"
								accept="image/*"
								onChange={handleImageChange}
								className={styles.imgInput}
							/>
							{imagePreview ? (
								<img
									src={imagePreview}
									alt="Aperçu de l'image"
									className={styles.previewImage}
								/>
							) : (
								<img
									src={recipeImage}
									alt={recipe.title}
									className={styles.recipeImage}
								/>
							)}
						</div>
					) : (
						<img
							src={recipeImage}
							alt={recipe.title}
							className={styles.recipeImage}
						/>
					)}
				</div>
			</div>

			{/* Partie droite */}
			<div className={styles.card}>
				<div className={styles.right}>
					{/* Description */}
					<h3>Description</h3>
					{isEditing ? (
						<textarea
							value={editedDescription}
							onChange={(e) => setEditedDescription(e.target.value)}
							className={styles.descriptionInput}
							placeholder="Description de la recette"
						/>
					) : (
						<p className={styles.description}>
							{recipe.description || "Aucune description"}
						</p>
					)}

					{/* Ingrédients */}
					<h3>Ingrédients</h3>
					{isEditing ? (
						<div className={styles.ingredientsEditContainer}>
							{editedIngredients.map((ingredient) => (
								<div key={ingredient.id} className={styles.ingredientRow}>
									<input
										type="text"
										value={ingredient.name}
										onChange={(e) =>
											updateIngredient(ingredient.id, "name", e.target.value)
										}
										placeholder="Ingrédient"
										required
										className={styles.ingredientNameInput}
									/>
									<input
										type="text"
										value={ingredient.quantity || ""}
										onChange={(e) =>
											updateIngredient(
												ingredient.id,
												"quantity",
												e.target.value,
											)
										}
										placeholder="Quantité"
										className={styles.ingredientQuantityInput}
									/>
									<select
										value={ingredient.unit || ""}
										onChange={(e) =>
											updateIngredient(ingredient.id, "unit", e.target.value)
										}
										className={styles.ingredientUnitSelect}
									>
										<option value="">Unité</option>
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
										disabled={editedIngredients.length <= 1}
									>
										🗑
									</button>
								</div>
							))}
							<button
								type="button"
								onClick={addIngredient}
								className={styles.addButton}
							>
								Ajouter un ingrédient
							</button>
						</div>
					) : (
						<ul className={styles.ingredientsList}>
							{recipe.ingredients && recipe.ingredients.length > 0 ? (
								recipe.ingredients.map((ingredient) => (
									<li
										key={ingredient.ingredient_id}
										className={styles.ingredientItem}
									>
										<span className={styles.ingredientName}>
											{ingredient.name}
										</span>
										{ingredient.quantity && (
											<span className={styles.ingredientQuantity}>
												{ingredient.quantity} {ingredient.unit || ""}
											</span>
										)}
									</li>
								))
							) : (
								<li>Aucun ingrédient</li>
							)}
						</ul>
					)}

					{/* Instructions */}
					<h3>Instructions</h3>
					{isEditing ? (
						<div className={styles.instructionsEditContainer}>
							{editedInstructions.map((instruction, index) => (
								<div key={instruction.id} className={styles.instructionRow}>
									<span className={styles.stepNumber}>{index + 1}.</span>
									<textarea
										value={instruction.text}
										onChange={(e) =>
											updateInstruction(instruction.id, e.target.value)
										}
										placeholder="Étape de préparation"
										required
										className={styles.instructionTextInput}
									/>
									<button
										type="button"
										onClick={() => removeInstruction(instruction.id)}
										className={styles.deleteButton}
										disabled={editedInstructions.length <= 1}
									>
										🗑
									</button>
								</div>
							))}
							<button
								type="button"
								onClick={addInstruction}
								className={styles.addButton}
							>
								Ajouter une étape
							</button>
						</div>
					) : (
						<ol className={styles.instructionsList}>
							{recipe.instructions && recipe.instructions.length > 0 ? (
								recipe.instructions
									.sort((a, b) => (a.step_number || 0) - (b.step_number || 0))
									.map((instruction) => (
										<li
											key={instruction.instruction_id}
											className={styles.instructionItem}
										>
											{instruction.text}
										</li>
									))
							) : (
								<li>Aucune instruction</li>
							)}
						</ol>
					)}

					{/* Boutons d'action */}
					<div className={styles.actionButtons}>
						{/* Buttons for recipe owner */}
						{isOwner && isEditing && (
							<button
								type="button"
								onClick={saveChanges}
								className={styles.saveButton}
								disabled={isSaving}
							>
								{isSaving ? "Enregistrement..." : "Enregistrer"}
							</button>
						)}

						{isOwner && isEditing && (
							<button
								type="button"
								onClick={toggleEdit}
								className={styles.cancelButton}
								disabled={isSaving}
							>
								Annuler
							</button>
						)}

						{isOwner && !isEditing && (
							<button
								type="button"
								onClick={toggleEdit}
								className={styles.editButton}
							>
								Modifier
							</button>
						)}

						{isOwner && !isEditing && (
							<button
								type="button"
								onClick={handleDelete}
								className={styles.deleteRecipeButton}
							>
								Supprimer
							</button>
						)}

						{/* Back button always visible */}
						<button
							type="button"
							onClick={() => navigate("/recettes")}
							className={styles.backButton}
						>
							Retour au carnet
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RecipePage;

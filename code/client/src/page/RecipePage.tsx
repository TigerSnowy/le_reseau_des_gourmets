import { useState } from "react";
import styles from "../assets/scss/recipe/recipe.module.scss";

const RecipePage = () => {
	// Pour activer/désactiver l'édition
	const [isEditing, setIsEditing] = useState(false);

	// Pour stocker la recette (sans back pour l'instant)
	const [recipeName, setRecipeName] = useState("Tarte au citron");
	const [image, setImage] = useState<File | null>(null);
	const [preparationTime, setPreparationTime] = useState("20");
	const [cookingTime, setCookingTime] = useState("40");
	const [difficulty, setDifficulty] = useState("Facile");
	const [ingredients, setIngredients] = useState([
		{ id: crypto.randomUUID(), name: "Farine", quantity: "200", unit: "g" },
		{ id: crypto.randomUUID(), name: "Oeufs", quantity: "2", unit: "" },
		{ id: crypto.randomUUID(), name: "Sucre", quantity: "50", unit: "g" },
		{ id: crypto.randomUUID(), name: "Citron", quantity: "3", unit: "" },
		{ id: crypto.randomUUID(), name: "Lait", quantity: "100", unit: "ml" },
	]);

	const [instructions, setInstructions] = useState([
		{ id: crypto.randomUUID(), text: "Mélanger les ingrédients." },
		{ id: crypto.randomUUID(), text: "Mélanger les ingrédients." },
		{ id: crypto.randomUUID(), text: "Mélanger les ingrédients." },
		{ id: crypto.randomUUID(), text: "Cuire au four à 180°C." },
	]);

	const [tags, setTags] = useState<string[]>(["dessert", "facile"]);
	const [newTag, setNewTag] = useState("");

	// Gère le changement d'image
	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			setImage(event.target.files[0]);
		}
	};

	// Ajoute un tag
	const addTag = () => {
		if (newTag.trim() !== "" && !tags.includes(newTag.trim())) {
			setTags([...tags, newTag.trim()]);
			setNewTag("");
		}
	};

	// Supprime un tag
	const removeTag = (tag: string) => {
		setTags(tags.filter((t) => t !== tag));
	};

	// Ajoute un ingrédient
	const addIngredient = () => {
		setIngredients([
			...ingredients,
			{ id: crypto.randomUUID(), name: "", quantity: "", unit: "" },
		]);
	};

	// Modifie un ingrédient
	const updateIngredient = (
		id: string,
		field: keyof (typeof ingredients)[0],
		value: string,
	) => {
		setIngredients(
			ingredients.map((i) => (i.id === id ? { ...i, [field]: value } : i)),
		);
	};

	// Supprime un ingrédient
	const removeIngredient = (id: string) => {
		setIngredients(ingredients.filter((i) => i.id !== id));
	};

	// Ajoute une instruction
	const addInstruction = () => {
		setInstructions([...instructions, { id: crypto.randomUUID(), text: "" }]);
	};

	// Modifie une instruction
	const updateInstruction = (id: string, value: string) => {
		setInstructions(
			instructions.map((s) => (s.id === id ? { ...s, text: value } : s)),
		);
	};

	// Supprime une instruction
	const removeInstruction = (id: string) => {
		setInstructions(instructions.filter((step) => step.id !== id));
	};

	// Active/désactive l'édition
	const toggleEdit = () => {
		setIsEditing(!isEditing);
	};

	return (
		<div className={styles.recipeContainer}>
			{/* Partie gauche */}
			<div className={styles.left}>
				{/* Nom de la recette */}
				<h1>
					{isEditing ? (
						<input
							type="text"
							value={recipeName}
							onChange={(e) => setRecipeName(e.target.value)}
						/>
					) : (
						recipeName
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
									value={preparationTime}
									onChange={(e) => setPreparationTime(e.target.value)}
								/>
							) : (
								`${preparationTime} min`
							)}
						</p>
					</div>

					<div className={styles.timeBlock}>
						<p className={styles.timeTitle}>Cuisson :</p>
						<p className={styles.time}>
							{isEditing ? (
								<input
									type="number"
									value={cookingTime}
									onChange={(e) => setCookingTime(e.target.value)}
								/>
							) : (
								`${cookingTime} min`
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
								value={difficulty}
								onChange={(e) => setDifficulty(e.target.value)}
							>
								<option value="Facile">Facile</option>
								<option value="Moyen">Moyen</option>
								<option value="Difficile">Difficile</option>
							</select>
						) : (
							difficulty
						)}
					</div>
				</div>

				{/* Tags */}
				<h3>Tags</h3>
				<div className={styles.tagsContainer}>
					{tags.map((tag) => (
						<span key={tag} className={styles.tag}>
							{tag}
							{isEditing && (
								<button type="button" onClick={() => removeTag(tag)}>
									×
								</button>
							)}
						</span>
					))}
				</div>
				{isEditing && (
					<div className={styles.addTag}>
						<input
							type="text"
							value={newTag}
							onChange={(e) => setNewTag(e.target.value)}
							placeholder="Nouveau tag"
						/>
						<button type="button" onClick={addTag}>
							Ajouter
						</button>
					</div>
				)}

				{/* Gestion de l'image */}
				{isEditing ? (
					<>
						<label htmlFor="imageUpload" className={styles.customFileUpload}>
							{image ? "Changer l'image" : "Ajouter une image"}
						</label>
						<input
							id="imageUpload"
							type="file"
							accept="image/*"
							onChange={handleImageChange}
							className={styles.imgInput}
						/>
						{image && (
							<>
								<img
									src={URL.createObjectURL(image)}
									alt="Aperçu de l'image"
									className={styles.previewImage}
								/>
								<button
									type="button"
									onClick={() => setImage(null)}
									className={styles.deleteImage}
								>
									Supprimer
								</button>
							</>
						)}
					</>
				) : (
					<img
						src={
							image
								? URL.createObjectURL(image)
								: "/img/tarte-au-citron-meringuee.jpeg"
						}
						alt="Recette"
						className={styles.previewImage}
					/>
				)}
			</div>

			{/* Partie droite */}
			<div className={styles.right}>
				{/* Ingrédients */}
				<h3>Ingrédients</h3>
				<div className={styles.ingredientsContainer}>
					{ingredients.map((ingredient) => (
						<div
							key={ingredient.id}
							className={`${styles.ingredientItem} ${isEditing ? styles.editing : ""}`}
						>
							{isEditing ? (
								<>
									<input
										type="text"
										placeholder="Nom"
										value={ingredient.name}
										onChange={(e) =>
											updateIngredient(ingredient.id, "name", e.target.value)
										}
									/>
									<input
										type="text"
										placeholder="Quantité"
										value={ingredient.quantity}
										onChange={(e) =>
											updateIngredient(
												ingredient.id,
												"quantity",
												e.target.value,
											)
										}
									/>
									<select
										value={ingredient.unit}
										onChange={(e) =>
											updateIngredient(ingredient.id, "unit", e.target.value)
										}
									>
										<option value="">Unité</option>
										<option value="mg">mg</option>
										<option value="g">g</option>
										<option value="kg">kg</option>
										<option value="ml">ml</option>
										<option value="cl">cl</option>
										<option value="l">l</option>
										<option value="càc">c. à café</option>
										<option value="càs">c. à soupe</option>
										<option value="pincée">pincée</option>
										<option value="unité">unité</option>
									</select>
									<button
										type="button"
										className={styles.deleteButton}
										onClick={() => removeIngredient(ingredient.id)}
									>
										🗑
									</button>
								</>
							) : (
								<>
									<p className={styles.ingredientName}>{ingredient.name}</p>
									<p className={styles.ingredientQuantity}>
										{ingredient.quantity}
									</p>
									<p className={styles.ingredientUnit}>{ingredient.unit}</p>
								</>
							)}
						</div>
					))}
				</div>
				{isEditing && (
					<button
						type="button"
						onClick={addIngredient}
						className={styles.addIngredientButton}
					>
						Ajouter un ingrédient
					</button>
				)}

				{/* Instructions */}
				<h3>Instructions</h3>
				<ol className={styles.instructionsContainer}>
					{instructions.map((step) => (
						<li
							key={step.id}
							className={`${styles.instructionItem} ${isEditing ? styles.editing : ""}`}
						>
							{isEditing ? (
								<>
									<textarea
										placeholder="Étape"
										value={step.text}
										onChange={(e) => updateInstruction(step.id, e.target.value)}
									/>
									<button
										type="button"
										className={styles.deleteButton}
										onClick={() => removeInstruction(step.id)}
									>
										🗑
									</button>
								</>
							) : (
								step.text
							)}
						</li>
					))}
				</ol>
				{isEditing && (
					<button
						type="button"
						onClick={addInstruction}
						className={styles.addInstructionButton}
					>
						Ajouter une étape
					</button>
				)}

				{/* Bouton pour activer l'édition */}
				<button
					type="button"
					className={styles.editButton}
					onClick={toggleEdit}
				>
					{isEditing ? "Sauvegarder" : "Modifier"}
				</button>
			</div>
		</div>
	);
};

export default RecipePage;

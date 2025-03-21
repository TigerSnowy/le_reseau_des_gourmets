import { useState } from "react";
import styles from "../assets/scss/recipe/recipe.module.scss";

const RecipePage = () => {
	// pour activer/désactiver l'édition
	// const [isEditing, setIsEditing] = useState(false);

	// pour stocker la recette (sans back pour l'instant)
	const [isEditing, setIsEditing] = useState(false);
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

	// gère le changement d'image
	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			setImage(event.target.files[0]);
		}
	};

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

	// modifie un ingrédient
	const updateIngredient = (
		id: string,
		field: keyof (typeof ingredients)[0],
		value: string,
	) => {
		setIngredients(
			ingredients.map((i) => (i.id === id ? { ...i, [field]: value } : i)),
		);
	};

	// supprime un ingrédient
	const removeIngredient = (id: string) => {
		setIngredients(ingredients.filter((i) => i.id !== id));
	};

	// modifie une instruction
	const updateInstruction = (id: string, value: string) => {
		setInstructions(
			instructions.map((s) => (s.id === id ? { ...s, text: value } : s)),
		);
	};

	// supprime une instruction
	const removeInstruction = (id: string) => {
		setInstructions(instructions.filter((step) => step.id !== id));
	};

	// active/désactive l'édition
	const toggleEdit = () => {
		setIsEditing(!isEditing);
	};

	return (
		<div className={styles.recipeContainer}>
			{/* partie gauche */}
			<div className={styles.left}>
				{/* nom de la recette */}

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

				<h3>Temps</h3>

				{/* temps de préparation et cuisson */}
				<div>
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

				{/* difficulté */}
				<h3>Difficulté</h3>

				<p>
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
				</p>

				{/* tags */}
				<h3>Tags</h3>
				<div className={styles.tagsContainer}>
					{tags.map((tag) => (
						<span key={tag} className={styles.tag}>
							{tag}{" "}
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
						/>
						<button type="button" onClick={addTag}>
							Ajouter
						</button>
					</div>
				)}

				{/* gestion de l'image */}

				{isEditing ? (
					<>
						<label htmlFor="imageUpload" className={styles.customFileUpload}>
							Modifier l'image
						</label>
						<input
							id="imageUpload"
							type="file"
							accept="image/*"
							onChange={handleImageChange}
							className={styles.imgInput}
						/>
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

			{/* pqrtie droite */}

			<div className={styles.right}>
				{/* ingrédients */}
				<h3>Ingrédients</h3>
				<div className={styles.ingredientsContainer}>
					{ingredients.map((ingredient) => (
						<div key={ingredient.id} className={styles.ingredientItem}>
							{isEditing ? (
								<>
									<input
										type="text"
										value={ingredient.name}
										onChange={(e) =>
											updateIngredient(ingredient.id, "name", e.target.value)
										}
									/>

									<input
										type="text"
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
										<option value="mg">mg</option>
										<option value="g">g</option>
										<option value="kg">kg</option>
										<option value="ml">ml</option>
										<option value="cl">cl</option>
										<option value="l">l</option>
										<option value="càc">c. à café</option>
										<option value="càs">c. à soupe</option>
										<option value="pincée">pincée</option>
										<option value="Unité">unité</option>
									</select>

									<button
										type="button"
										onClick={() => removeIngredient(ingredient.id)}
									>
										🗑
									</button>
								</>
							) : (
								<>
									<p>{ingredient.name}</p>
									<p>
										{ingredient.quantity} {ingredient.unit}
									</p>
								</>
							)}
						</div>
					))}
				</div>

				{/* instructions */}
				<h3>Instructions</h3>
				<ol className={styles.instructionsContainer}>
					{instructions.map((step) => (
						<li key={step.id} className={styles.instructionItem}>
							{isEditing ? (
								<textarea
									value={step.text}
									onChange={(e) => updateInstruction(step.id, e.target.value)}
								/>
							) : (
								step.text
							)}
							{isEditing && (
								<button
									type="button"
									onClick={() => removeInstruction(step.id)}
								>
									🗑
								</button>
							)}
						</li>
					))}
				</ol>

				{/* bouton pour qctiver l'edition */}
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

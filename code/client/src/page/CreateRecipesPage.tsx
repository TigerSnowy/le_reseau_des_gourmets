import { useState } from "react";
import styles from "../assets/scss/recipe/createRecipe.module.scss";

const CreateRecipePage = () => {
	// stocke le nomde la recette
	const [recipeName, setRecipeName] = useState("");

	// stocke l'image téléchargée par l'utilisateur
	const [image, setImage] = useState<File | null>(null);

	// stocke la liste des ingrédients (un id unique pour chaque (crypto.randomUUID))
	const [ingredients, setIngredients] = useState([
		{ id: crypto.randomUUID(), name: "", quantity: "", unit: "" },
	]);

	// met à jour uniquement le champ concerné (ingrédient, quantité ou unité)
	const updateIngredient = (
		id: string,
		field: keyof (typeof ingredients)[0],
		value: string,
	) => {
		setIngredients(
			ingredients.map((i) => (i.id === id ? { ...i, [field]: value } : i)),
		);
	};

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
	const [difficulty, setDifficulty] = useState("Facile");

	// gère le changement d'image et stock le fichier séléctionné
	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			setImage(event.target.files[0]);
		}
	};

	// supprime l'image téléchargée
	const removeImage = () => {
		setImage(null);
	};

	// ajoute un nouvel ingrédient à la liste
	const addIngredient = () => {
		setIngredients([
			...ingredients,
			{ id: crypto.randomUUID(), name: "", quantity: "", unit: "" },
		]);
	};

	// supprime un ingrédient
	const removeIngredient = (id: string) => {
		setIngredients(ingredients.filter((ingredient) => ingredient.id !== id));
	};

	// ajoute une nouvelle instruction à la liste
	const addInstruction = () => {
		setInstructions([...instructions, { id: crypto.randomUUID(), text: "" }]);
	};

	// supprimer une instruction
	const removeInstruction = (id: string) => {
		setInstructions(instructions.filter((step) => step.id !== id));
	};

	return (
		<div className={styles.recipeContainer}>
			<div className={styles.left}>
				<h1>Créer une recette</h1>
				<form>
					{/* nom de la recette */}
					<input
						className={styles.nameInput}
						type="text"
						placeholder="Nom de la recette*"
						value={recipeName}
						onChange={(e) => setRecipeName(e.target.value)}
						required
					/>
					{/* temps de préparation et cuisson */}
					<div className={styles.timeInputs}>
						<input
							type="number"
							placeholder="Temps de préparation (min)"
							value={preparationTime}
							onChange={(e) => setPreparationTime(e.target.value)}
						/>
						<input
							type="number"
							placeholder="Temps de cuisson (min)"
							value={cookingTime}
							onChange={(e) => setCookingTime(e.target.value)}
						/>
					</div>

					{/* difficulté */}
					<select
						value={difficulty}
						onChange={(e) => setDifficulty(e.target.value)}
						className={styles.difficultySelect}
					>
						<option value="Facile">Facile</option>
						<option value="Moyen">Moyen</option>
						<option value="Difficile">Difficile</option>
					</select>

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
					{image && (
						<div>
							<img
								src={URL.createObjectURL(image)}
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
				</form>
			</div>
			<div className={styles.right}>
				<form>
					{/* ingrédients */}
					<h3>Ingrédients</h3>
					{ingredients.map((ingredient) => (
						<div key={ingredient.id} className={styles.ingredientRow}>
							<input
								type="text"
								placeholder="Nom"
								value={ingredient.name}
								onChange={(e) =>
									updateIngredient(ingredient.id, "name", e.target.value)
								}
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
							<input
								type="text"
								placeholder="Unité"
								value={ingredient.unit}
								onChange={(e) =>
									updateIngredient(ingredient.id, "unit", e.target.value)
								}
							/>

							<button
								type="button"
								onClick={() => removeIngredient(ingredient.id)}
								className={styles.deleteButton}
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
					{instructions.map((step) => (
						<div key={step.id} className={styles.instructionRow}>
							<textarea
								key={step.id}
								placeholder={"Étape"}
								value={step.text}
								onChange={(e) => {
									const newInstructions = instructions.map((s) =>
										s.id === step.id ? { ...s, text: e.target.value } : s,
									);
									setInstructions(newInstructions);
								}}
							/>
							<button
								type="button"
								onClick={() => removeInstruction(step.id)}
								className={styles.deleteButton}
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
						placeholder="Tags (ex: dessert, rapide)"
						value={tags}
						onChange={(e) => setTags(e.target.value)}
						className={styles.tagsInput}
					/>

					<button className={styles.submitButton} type="submit">
						Créer la recette
					</button>
				</form>
			</div>
		</div>
	);
};

export default CreateRecipePage;

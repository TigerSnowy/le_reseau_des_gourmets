import { useState } from "react";
import styles from "../assets/scss/createRecipe.module.scss";

const CreateRecipePage = () => {
	// stocke le nomde la recette
	const [recipeName, setRecipeName] = useState("");

	// stocke l'image téléchargée par l'utilisateur
	const [image, setImage] = useState<File | null>(null);

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

	// gère le changement d'image et stock le fichier séléctionné
	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			setImage(event.target.files[0]);
		}
	};

	// ajoute un nouvel ingrédient à la liste
	const addIngredient = () => {
		setIngredients([
			...ingredients,
			{ id: crypto.randomUUID(), name: "", quantity: "", unit: "" },
		]);
	};

	// ajoute une nouvelle instruction à la liste
	const addInstruction = () => {
		setInstructions([...instructions, { id: crypto.randomUUID(), text: "" }]);
	};

	return (
		<div className={styles.recipeContainer}>
			<div className={styles.left}>
				<h1>Créer une recette</h1>
				<form>
					{/* nom de la recette */}
					<input
						type="text"
						placeholder="Nom de la recette"
						value={recipeName}
						onChange={(e) => setRecipeName(e.target.value)}
						required
					/>

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
						<img
							src={URL.createObjectURL(image)}
							alt="Aperçu de l'image"
							className={styles.previewImage}
						/>
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
								onChange={(e) => {
									const newIngredients = ingredients.map((i) =>
										i.id === ingredient.id ? { ...i, name: e.target.value } : i,
									);
									setIngredients(newIngredients);
								}}
								required
							/>
							{/* quantité */}
							<input
								type="text"
								placeholder="Quantité"
								value={ingredient.quantity}
								onChange={(e) => {
									const newIngredients = ingredients.map((i) =>
										i.id === ingredient.id
											? { ...i, quantity: e.target.value }
											: i,
									);
									setIngredients(newIngredients);
								}}
								required
							/>
							{/* unité */}
							<input
								type="text"
								placeholder="Unité"
								value={ingredient.unit}
								onChange={(e) => {
									const newIngredients = ingredients.map((i) =>
										i.id === ingredient.id ? { ...i, unit: e.target.value } : i,
									);
									setIngredients(newIngredients);
								}}
							/>
						</div>
					))}
					<button type="button" onClick={addIngredient}>
						Ajouter un ingrédient
					</button>

					{/* instructions */}
					<h3 className={styles.instructionsMargin}>Instructions</h3>
					{instructions.map((step) => (
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
							required
						/>
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

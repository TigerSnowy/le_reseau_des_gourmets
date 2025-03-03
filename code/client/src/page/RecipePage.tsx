import { useState } from "react";
import styles from "../assets/scss/recipe.module.scss";

const RecipePage = () => {
	// pour activer/désactiver l'édition
	const [isEditing, setIsEditing] = useState(false);

	// pour stocker la recette (sans back pour l'instant)
	const [recipeName, setRecipeName] = useState("Tarte au citron");
	const [image, setImage] = useState<File | null>(null);
	const [preparationTime, setPreparationTime] = useState("20");
	const [cookingTime, setCookingTime] = useState("40");
	const [difficulty, setDifficulty] = useState("Facile");
	const [ingredients, setIngredients] = useState([
		{ id: crypto.randomUUID(), name: "Farine", quantity: "200", unit: "g" },
		{ id: crypto.randomUUID(), name: "Oeufs", quantity: "2", unit: "" },
	]);
	const [instructions, setInstructions] = useState([
		{ id: crypto.randomUUID(), text: "Mélanger les ingrédients." },
		{ id: crypto.randomUUID(), text: "Cuire au four à 180°C." },
	]);
	const [tags, setTags] = useState("dessert, facile");

	// gère le changement d'image
	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			setImage(event.target.files[0]);
		}
	};

	// pour basculer en mode édition
	const toggleEdit = () => {
		setIsEditing(!isEditing);
	};

	return (
		<div className={styles.recipeContainer}>
			<div className={styles.left}>
				{/* nom de la recette */}
				{isEditing ? (
					<input
						type="text"
						value={recipeName}
						onChange={(e) => setRecipeName(e.target.value)}
					/>
				) : (
					<h1>{recipeName}</h1>
				)}

				<h3>Temps</h3>

				{/* temps de préparation et cuisson */}
				<p>
					Préparation :{" "}
					{isEditing ? (
						<input
							type="number"
							value={preparationTime}
							onChange={(e) => setPreparationTime(e.target.value)}
						/>
					) : (
						`${preparationTime} min`
					)}{" "}
					| Cuisson :{" "}
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

				{/* difficulté */}
				<h3>Difficulté</h3>
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
					<p>{difficulty}</p>
				)}

				{/* gestion de l'image */}
				{isEditing ? (
					<>
						<label htmlFor="imageUpload" className={styles.customFileUpload}>
							Modifier l’image
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
								: "../../public/img/tarte-au-citron-meringuee.jpeg"
						}
						alt="Recette"
						className={styles.previewImage}
					/>
				)}
			</div>

			<div className={styles.right}>
				<h3>Ingrédients</h3>
				{ingredients.map((ingredient) => (
					<p key={ingredient.id}>
						{isEditing ? (
							<>
								<input
									type="text"
									value={ingredient.name}
									onChange={(e) =>
										setIngredients(
											ingredients.map((i) =>
												i.id === ingredient.id
													? { ...i, name: e.target.value }
													: i,
											),
										)
									}
								/>
								<input
									type="text"
									value={ingredient.quantity}
									onChange={(e) =>
										setIngredients(
											ingredients.map((i) =>
												i.id === ingredient.id
													? { ...i, quantity: e.target.value }
													: i,
											),
										)
									}
								/>
								<input
									type="text"
									value={ingredient.unit}
									onChange={(e) =>
										setIngredients(
											ingredients.map((i) =>
												i.id === ingredient.id
													? { ...i, unit: e.target.value }
													: i,
											),
										)
									}
								/>
							</>
						) : (
							`${ingredient.quantity} ${ingredient.unit} ${ingredient.name}`
						)}
					</p>
				))}

				<h3>Instructions</h3>
				{instructions.map((step) => (
					<p key={step.id}>
						{isEditing ? (
							<textarea
								value={step.text}
								onChange={(e) =>
									setInstructions(
										instructions.map((s) =>
											s.id === step.id ? { ...s, text: e.target.value } : s,
										),
									)
								}
							/>
						) : (
							step.text
						)}
					</p>
				))}

				<h3>Tags</h3>
				{isEditing ? (
					<input
						type="text"
						value={tags}
						onChange={(e) => setTags(e.target.value)}
					/>
				) : (
					<p>{tags}</p>
				)}

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

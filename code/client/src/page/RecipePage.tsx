import { useState } from "react";
import styles from "../assets/scss/recipe.module.scss";
import { Pencil } from "lucide-react";

const RecipePage = () => {
	// pour activer/désactiver l'édition
	// const [isEditing, setIsEditing] = useState(false);

	// pour stocker la recette (sans back pour l'instant)
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

	const [editingField, setEditingField] = useState<string | null>(null);

	//supprime un tag
	const removeTag = (tag: string) => {
		setTags(tags.filter((t) => t !== tag));
	};

	// gère le changement d'image
	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			setImage(event.target.files[0]);
		}
	};

	// pour basculer en mode édition
	const toggleEdit = (field: string) => {
		setEditingField(editingField === field ? null : field);
	};

	return (
		<div className={styles.recipeContainer}>
			{/* partie gauche */}
			<div className={styles.left}>
				{/* nom de la recette */}

				<h1>
					{recipeName} <Pencil className={styles.editIcon} />
				</h1>

				<h3>Temps</h3>

				{/* temps de préparation et cuisson */}
				<p>
					Préparation : {preparationTime} min | Cuisson : {cookingTime} min
					<Pencil className={styles.editIcon} />
				</p>

				{/* difficulté */}
				<h3>Difficulté</h3>

				<p>
					{difficulty} <Pencil className={styles.editIcon} />{" "}
				</p>

				{/* gestion de l'image */}
				<img
					src={
						image
							? URL.createObjectURL(image)
							: "../../public/img/tarte-au-citron-meringuee.jpeg"
					}
					alt="Recette"
					className={styles.previewImage}
				/>

				{/* tags */}
				<h3>Tags</h3>
				<div className={styles.tagsContainer}>
					{tags.map((tag) => (
						<span key={tag} className={styles.tag}>
							{tag}{" "}
							<button type="button" onClick={() => removeTag(tag)}>
								×
							</button>
						</span>
					))}
				</div>
			</div>

			{/* pqrtie droite */}
			{/* ingrédients */}

			<div className={styles.right}>
				<h3>Ingrédients</h3>
				<div className={styles.ingredientsContainer}>
					{ingredients.map((ingredient) => (
						<div key={ingredient.id} className={styles.ingredientItem}>
							<p>{ingredient.name}</p>
							<p>
								{ingredient.quantity} {ingredient.unit}
							</p>
							<Pencil className={styles.editIcon} />
						</div>
					))}
				</div>

				<h3>Instructions</h3>
				<ol>
					{instructions.map((step) => (
						<li key={step.id} className={styles.instructionItem}>
							{step.text} <Pencil className={styles.editIcon} />
						</li>
					))}
				</ol>
			</div>
		</div>
	);
};

export default RecipePage;

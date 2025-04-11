import type Ingredient from "../model/ingredient";

class IngredientAPI {
	private route = "ingredient";

	// récuperer tous les ingrédients
	public selectAll = async (token?: string) => {
		const headers: HeadersInit = {
			"Content-Type": "application/json",
		};

		if (token) {
			headers.Authorization = `Bearer ${token}`;
		}

		const request = new Request(
			`${import.meta.env.VITE_API_URL}/${this.route}`,
			{
				headers,
			},
		);

		const response = await fetch(request);
		return response.json();
	};

	// récuperer un ingrédient par son id
	public selectOne = async (ingredientId: number, token?: string) => {
		const headers: HeadersInit = {
			"Content-Type": "application/json",
		};

		if (token) {
			headers.Authorization = `Bearer ${token}`;
		}

		const request = new Request(
			`${import.meta.env.VITE_API_URL}/${this.route}/${ingredientId}`,
			{
				headers,
			},
		);

		const response = await fetch(request);
		return response.json();
	};

	// récupérer tous les ingrédients d'une recette
	public selectAllByRecipe = async (recipeId: number, token?: string) => {
		const headers: HeadersInit = {
			"Content-Type": "application/json",
		};

		if (token) {
			headers.Authorization = `Bearer ${token}`;
		}

		const request = new Request(
			`${import.meta.env.VITE_API_URL}/${this.route}/recipe/${recipeId}`,
			{
				headers,
			},
		);

		const response = await fetch(request);
		return response.json();
	};

	// créer un nouvel ingrédient
	public insert = async (data: Partial<Ingredient>, token?: string) => {
		const request = new Request(`${import.meta.env.VITE_API_URL}/${this.route}`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        const response = await fetch(request);
        return response.json();
	};

    // mettre à jour un ingrédient
    public update = async (data: Partial<Ingredient>, token?: string) => {
        const request = new Request(`${import.meta.env.VITE_API_URL}/${this.route}`, {
            method: "PUT",
            headers: {
                'Content-Type': "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        const response = await fetch(request);
        return response.json();
    };

    // supprimer un ingrédient
    public delete = async (ingredientId: number, token: string) => {
        const request = new Request(`${import.meta.env.VITE_API_URL}/${this.route}`, {
            method: "DELETE",
            headers: {
                'Content-Type': "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ ingredient_id: ingredientId }),
        });

        const response = await fetch(request);
        return response.json();
    };
}

export default IngredientAPI;

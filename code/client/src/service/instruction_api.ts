import type Instruction from "../model/instruction";

class InstructionAPI {
	private route = "instruction";

	// récuperer toutes les instructions
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

	// récuperer une instruction par son id
	public selectOne = async (instructionId: number, token?: string) => {
		const headers: HeadersInit = {
			"Content-Type": "application/json",
		};

		if (token) {
			headers.Authorization = `Bearer ${token}`;
		}

		const request = new Request(
			`${import.meta.env.VITE_API_URL}/${this.route}/${instructionId}`,
			{
				headers,
			},
		);

		const response = await fetch(request);
		return response.json();
	};

	// récupérer toutes les instructions d'une recette
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

	// créer unne nouvelle instruction
	public insert = async (data: Partial<Instruction>, token: string) => {
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

    // mettre à jour une instruction
    public update = async (data: Partial<Instruction>, token: string) => {
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

    // supprimer une instruction
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

export default InstructionAPI;

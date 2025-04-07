import type Recipe from "../model/recipe";

class RecipeAPI {
  private route = "recipe";

  // récupére toutes les recettes
  public selectAll = async (token?: string) => {
    const headers: HeadersInit = {
      'Content-Type': 'application/json'
    };

    // ajoute le token d'autorisation si disponible
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const request = new Request(`${import.meta.env.VITE_API_URL}/${this.route}`, {
      headers
    });

    const response = await fetch(request);
    return response.json();
  };

  // Récupérer une recette par son id
  public selectOne = async (recipeId: number, token?: string) => {
    const headers: HeadersInit = {
      'Content-Type': 'application/json'
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const request = new Request(`${import.meta.env.VITE_API_URL}/${this.route}/${recipeId}`, {
      headers
    });

    const response = await fetch(request);
    return response.json();
  };

  // crée une nouvelle recette
  public insert = async (data: Partial<Recipe>, token: string) => {
    const request = new Request(`${import.meta.env.VITE_API_URL}/${this.route}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });

    const response = await fetch(request);
    return response.json();
  };

  // mets à jour une recette existante
  public update = async (data: Partial<Recipe>, token: string) => {
    const request = new Request(`${import.meta.env.VITE_API_URL}/${this.route}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });

    const response = await fetch(request);
    return response.json();
  };

  // supprime une recette
  public delete = async (recipeId: number, userId: number, token: string) => {
    const request = new Request(`${import.meta.env.VITE_API_URL}/${this.route}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        recipe_id: recipeId,
        user_id: userId
      })
    });

    const response = await fetch(request);
    return response.json();
  };
}

export default RecipeAPI;
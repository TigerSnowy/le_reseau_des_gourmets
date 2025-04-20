import type Recipe from "../model/recipe";
import { handleApiResponse } from "./helpers_api";

class RecipeAPI {
  private route = "recipe";

  // récupére toutes les recettes
  public selectAll = async (token?: string, userId?: number) => {
    const headers: HeadersInit = {
      'Content-Type': 'application/json'
    };

    // ajoute le token d'autorisation si disponible
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    // ajoute les paramètres de requête si userId est fourni
    const queryParams = userId ? `?user_id=${userId}` : '';

    const response = await fetch(`${import.meta.env.VITE_API_URL}/${this.route}${queryParams}`, {
      headers
    });

    return handleApiResponse(response);
  };

  // Récupérer une recette par son id
  public selectOne = async (recipeId: number, token?: string) => {
    console.log(`Récupération recette ID ${recipeId} avec token:`, token ? "présent" : "absent");

    const headers: HeadersInit = {
      'Content-Type': 'application/json'
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${import.meta.env.VITE_API_URL}/${this.route}/${recipeId}`, {
      headers
    });

    console.log(`Réponse pour recette ${recipeId}:`, response.status, response.statusText);

    return handleApiResponse(response);
  };

  // crée une nouvelle recette
  public insert = async (data: Partial<Recipe>, token: string) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/${this.route}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });

    return handleApiResponse(response);
  };

  // mets à jour une recette existante
  public update = async (data: Partial<Recipe>, token: string) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/${this.route}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });

    return handleApiResponse(response);
  };

  // supprime une recette
  public delete = async (recipeId: number, userId: number, token: string) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/${this.route}`, {
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

    return handleApiResponse(response);
  };
}

export default RecipeAPI;
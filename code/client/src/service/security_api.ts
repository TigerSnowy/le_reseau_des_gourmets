import type User from "../model/user";

class SecurityAPI {

	public register = async (data: Partial<User>) => {
		const request = new Request(`${import.meta.env.VITE_API_URL}/register`, {
            // - sans fichier
			    // - la propriété body de la requête HTTP peut être en JSON : JSON.stringify
			    // - dans la requête HTTP, utiliser l'en-tête(header) HTTP : Content-Type : application/json
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });

		const response = await fetch(request);

		return response.json();
	};

    public login = async (data: Partial<User>) => {
		const request = new Request(`${import.meta.env.VITE_API_URL}/login`, {
            // - sans fichier
			    // - la propriété body de la requête HTTP peut être en JSON : JSON.stringify
			    // - dans la requête HTTP, utiliser l'en-tête(header) HTTP : Content-Type : application/json
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });

		const response = await fetch(request);

		return response.json();
	};

    // autoriser un utilisateur
    public auth = async (data: Partial<User>) => {
		const request = new Request(`${import.meta.env.VITE_API_URL}/auth`, {
            // - sans fichier
			    // - la propriété body de la requête HTTP peut être en JSON : JSON.stringify
			    // - dans la requête HTTP, utiliser l'en-tête(header) HTTP : Content-Type : application/json
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });

		const response = await fetch(request);

		return response.json();
	};

}

export default SecurityAPI;

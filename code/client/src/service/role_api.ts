class RoleAPI {

    // récupération de tous les enregistrements
    public selectAll = async () => {
        // configurer la requête HTTP / GET par défaut
        const request = new Request(`${import.meta.env.VITE_API_URL}/role`);
        
        // exécuter la requête et récupérer la réponse brut
        const response = await fetch(request);

        // // renvoyer les résultats JSON de la réponse 
        return response.json();
    };

}

export default RoleAPI; 
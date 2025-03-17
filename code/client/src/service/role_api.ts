class RoleAPI {

    private route = "role";

    // récupération de tous les enregistrements
    public selectAll = async () => {
        // configurer la requête HTTP / GET par défaut
        // import.meta.env permet d'accéder aux variables d'environnement
        const request = new Request(`${import.meta.env.VITE_API_URL}/${this.route}`);
        
        // exécuter la requête et récupérer la réponse brut
        const response = await fetch(request);

        // // renvoyer les résultats JSON de la réponse 
        return response.json();
    };

}

export default RoleAPI; 
class UserAPI {

    // route de l'API 

    private route = 'user';

    public selectAll = async () => {

        const request = new Request(`${import.meta.env.VITE_API_URL}/${this.route}`);

        const response = await fetch(request);

        return response.json();
    };

    // créer un enregistrement

    // si le formulaire contient un fichier, il doit absolument être en FormData

    public insert = async (data:FormData) => {

        const request = new Request(`${import.meta.env.VITE_API_URL}/${this.route}`, {
            method: 'POST',
            body: data
        });

        const response = await fetch(request);

        return response.json();
    };

}

export default UserAPI;
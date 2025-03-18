class UserAPI {

    // route de l'API 

    private route = 'user';

    public selectAll = async () => {

        const request = new Request(`${import.meta.env.VITE_API_URL}/${this.route}`);

        const response = await fetch(request);

        return response.json();
    };

    // récupération d'un enregistrement

    public selectOne = async (user_id: number) => {

        const request = new Request(`${import.meta.env.VITE_API_URL}/${this.route}/${user_id}`,
            
        );

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

    // modifier un enregistrement

    public update = async (data:FormData) => {

        const request = new Request(`${import.meta.env.VITE_API_URL}/${this.route}`, {
            method: 'PUT',
            body: data
        },
    );

        const response = await fetch(request);

        return response.json();
    };

    public delete = async (data:FormData) => {

        const request = new Request(`${import.meta.env.VITE_API_URL}/${this.route}`, {
            method: 'DELETE',
            body: data
        },
    );

        const response = await fetch(request);

        return response.json();
    };

}

export default UserAPI;
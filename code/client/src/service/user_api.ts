class UserAPI {

    public selectAll = async () => {

        const request = new Request(`${import.meta.env.VITE_API_URL}/user`);

        const response = await fetch(request);

        return response.json();
    };

}

export default UserAPI;
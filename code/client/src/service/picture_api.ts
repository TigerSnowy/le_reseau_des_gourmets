class PictureAPI {
    private route = "recipe_picture";
  
    public uploadRecipeImage = async (data: FormData, token: string) => {
      try {
        const request = new Request(`${import.meta.env.VITE_API_URL}/${this.route}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: data
        });
  
        const response = await fetch(request);
        return await response.json();
      } catch (error) {
        console.error("Erreur lors de l'upload de l'image:", error);
        return { success: false, message: "Erreur lors de l'upload de l'image" };
      }
    };
  }
  
  export default PictureAPI;
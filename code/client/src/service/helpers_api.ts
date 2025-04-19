
export const handleApiResponse = async (response: Response) => {
        const data = await response.json();
        
        if (response.ok && (data.status >= 200 && data.status < 300)) {
          return { success: true, data: data.data, message: data.message };
        }
        return { 
          success: false, 
          message: data.message || "Une erreur est survenue", 
          status: data.status || response.status 
        };
      };
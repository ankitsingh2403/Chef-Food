const SwiggyMenuApi = async (restaurantId, lat, lng) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/swiggy-menu?restaurantId=${restaurantId}&lat=${lat}&lng=${lng}`
      );
  
      if (!response.ok) {
        throw new Error("Failed to fetch menu");
      }
  
      const data = await response.json();
      return data; // Return the JSON response
    } catch (error) {
      console.error("Error fetching from SwiggyMenuApi:", error.message);
      throw new Error("Failed to fetch data from Swiggy");
    }
  };
  
  export default SwiggyMenuApi;
  
export const fetchSwiggyRestaurants = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://chef-food-1-vqlr.onrender.com/api/swiggy/restaurants?lat=${lat}&lng=${lng}`
      );
  
      if (!response.ok) throw new Error("Failed to fetch");
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching from proxy Swiggy API:", error);
      return null;
    }
  };
  
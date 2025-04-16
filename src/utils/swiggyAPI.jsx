export const fetchSwiggyRestaurants = async (lat, lng) => {
    try {
      // Construct the URL with dynamic lat and lng values
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/swiggy-restaurants?lat=${lat}&lng=${lng}`
      );
  
      // Check if the response status is OK
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      // Parse the JSON response
      const data = await response.json();
  
      // Check if the response contains the expected data
      if (!data || !data.restaurants) {
        throw new Error('Invalid data structure');
      }
  
      return data.restaurants; // Return the restaurant data
    } catch (error) {
      console.error("Error fetching from Swiggy proxy API:", error.message);
      return null; // Return null or an empty array based on your needs
    }
  };
  
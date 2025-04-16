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
  
      // Check if the response is in JSON format
      const contentType = response.headers.get('Content-Type');
      if (!contentType || !contentType.includes('application/json')) {
        const rawResponse = await response.text(); // Get raw response if it's not JSON
        throw new Error('Expected JSON response, but received HTML or another format: ' + rawResponse);
      }
  
      // Parse the JSON response
      const data = await response.json();
  
      // Check if the response contains the expected data
      if (!data || !Array.isArray(data.restaurants) || data.restaurants.length === 0) {
        throw new Error('Invalid or empty restaurant data');
      }
  
      return data.restaurants; // Return the restaurant data
    } catch (error) {
      // Enhanced error logging for more context
      console.error("Error fetching from Swiggy proxy API:", error);
      return null; // Return null or an empty array based on your needs
    }
  };
  
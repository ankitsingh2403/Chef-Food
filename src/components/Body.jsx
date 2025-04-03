import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Body = () => {
  // State to manage restaurant list
  const [listOfRestaurants, setListOfRestaurants] = useState([]);

  const [filteredRestaurant,setFilteredRestaurant] = useState([]);

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=26.449923&lng=80.3318736&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );

    const json = await data.json();

    // console.log(json);
    // setListOfRestaurants(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants || []);
    const restaurants = json?.data?.cards
      ?.map(
        (card) => card?.card?.card?.gridElements?.infoWithStyle?.restaurants
      )
      ?.filter(Boolean) // Remove undefined/null values
      ?.flat(); // Flatten the array to get all restaurants in one list

    const uniqueRestaurants = []; //Extra code written to get Unique restaurants it iterates and check if restaurant id is not seen than it add it in
    // set and the push it in uniquerestaurant array then it updates usestate
    const seenIds = new Set();

    restaurants.forEach((restaurant) => {
      if (!seenIds.has(restaurant.info.id)) {
        seenIds.add(restaurant.info.id);
        uniqueRestaurants.push(restaurant);
      }
    });

    setListOfRestaurants(uniqueRestaurants);
    setFilteredRestaurant(uniqueRestaurants);
    console.log(uniqueRestaurants);
  };

  if (listOfRestaurants.length === 0) {
    return <Shimmer />;
  }

  return (
    <div className="body">
      <h1>Top Restaurants In Kanpur</h1>
      <div className="filter">
        <div className="filter">
          <div className="adj">
            <div className="search">
              <input
                type="text"
                className="search-box"
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
              />
              <button
                className="search-btn"
                onClick={() => {
                  //filter the restaurant cards and update the UI
                  //Search text

                  const filteredRestaurant = listOfRestaurants.filter((res) =>
                    res.info.name
                      .toLowerCase()
                      .includes(searchText.toLowerCase())
                  );
                  setFilteredRestaurant(filteredRestaurant);
                }}
              >
                Search
              </button>
            </div>
            <button
              className="filter-btn"
              onClick={() => {
                const filteredList = listOfRestaurants.filter(
                  (res) => res.info.avgRating > 4
                );
                setListOfRestaurants(filteredList);
              }}
            >
              Top Rated Restaurants ⭐
            </button>
          </div>

          {/* <button
            className="reset-btn"
            onClick={() => setListOfRestaurants(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [])}
          >
            Reset 🔄
          </button> */}
        </div>
      </div>

      <div className="res-container">
        {filteredRestaurant.map((restaurant) => (
         <Link key={restaurant.info.id} to={"/restaurants/" + restaurant.info.id}> <RestaurantCard  resData={restaurant} /> </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;

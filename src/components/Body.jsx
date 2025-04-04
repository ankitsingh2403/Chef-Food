import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles

const Body = () => {
  // State to manage restaurant list
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=26.449923&lng=80.3318736&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );

    const json = await data.json();

    const restaurants = json?.data?.cards
      ?.map((card) => card?.card?.card?.gridElements?.infoWithStyle?.restaurants)
      ?.filter(Boolean)
      ?.flat();

    const uniqueRestaurants = [];
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
      {/* 🏆 Carousel Section */}
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        interval={3000}
        showStatus={false}
        showArrows={false}
        className="carousel"
      >
        <div>
          <img src="\src\assets\7967011.jpg" alt="Delicious Food" />
        </div>
        <div>
          <img src="\src\assets\food_web_banner_36.jpg" alt="Fine Dining" />
        </div>
        <div>
          <img src="\src\assets\Food-Facebook-Cover-Banner-05.jpg" alt="Top Chefs" />
        </div>
        <div>
          <img src="\src\assets\food_facebook_cover_31.jpg" alt="Top Chef1" />
        </div>
        <div>
          <img src="\src\assets\Food-Facebook-Cover-Banner-05.jpg" alt="Top Chef2" />
        </div>
        <div>
          <img src="\src\assets\6220339.jpg" alt="Top Chef2" />
        </div>
        <div>
          <img src="\src\assets\7460859.jpg" alt="Top Chef2" />
        </div>
      </Carousel>

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
                  const filteredRestaurant = listOfRestaurants.filter((res) =>
                    res.info.name.toLowerCase().includes(searchText.toLowerCase())
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
        </div>
      </div>

      <div className="res-container">
        {filteredRestaurant.map((restaurant) => (
          <Link key={restaurant.info.id} to={"/restaurants/" + restaurant.info.id}>
            <RestaurantCard resData={restaurant} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;

import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import useOnlineStatus from "../utils/useOnlineStatus";
import img4 from "../assets/img4.jpg";
import img6 from "../assets/img6.jpg";
import img7 from "../assets/img7.jpg";
import img10 from "../assets/img10.jpg";
import img2 from "../assets/img2.jpg";
import img11 from "../assets/img11.jpg";
import img1 from "../assets/img1.jpg";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchData(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.warn("Geolocation denied, using Kanpur coords.");
          fetchData(26.449923, 80.3318736); // fallback to Kanpur
        }
      );
    } else {
      fetchData(26.449923, 80.3318736); // no support, fallback
    }
  }, []);

  const fetchData = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://chef-food-1-vqlr.onrender.com/api/swiggy-restaurants?lat=${lat}&lng=${lng}`
      );
      const json = await response.json();

      const restaurants = json?.data?.cards
        ?.map(
          (card) => card?.card?.card?.gridElements?.infoWithStyle?.restaurants
        )
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
    } catch (err) {
      console.error("Error fetching Swiggy data:", err);
    }
  };

  const onlineStatus = useOnlineStatus();

  if (onlineStatus === false) {
    return <h1>Looks Like You are Offline! Please check your Internet.</h1>;
  }

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
        <div><img src={img4} alt="Delicious Food" /></div>
        <div><img src={img6} alt="Fine Dining" /></div>
        <div><img src={img7} alt="Top Chefs" /></div>
        <div><img src={img10} alt="Top Chef1" /></div>
        <div><img src={img2} alt="Top Chef2" /></div>
        <div><img src={img11} alt="Top Chef2" /></div>
        <div><img src={img1} alt="Top Chef2" /></div>
      </Carousel>

      <h1>Top Restaurants In Kanpur</h1>

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

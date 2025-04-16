import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";
import Shimmer from "./Shimmer";
import SwiggyMenuApi from "../utils/SwiggyMenuApi"; // Import SwiggyMenuApi utility

const RestaurantMenu = () => {
  const { resId } = useParams(); // Extract restaurant ID from URL params
  const dispatch = useDispatch(); // Get dispatch function from Redux

  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [menuData, setMenuData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get user geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
        },
        (error) => {
          console.warn("Geolocation denied, using fallback coords.");
          setLat(26.449923); // Fallback to Kanpur coordinates
          setLng(80.3318736);
        }
      );
    } else {
      setLat(26.449923); // Fallback if geolocation is not supported
      setLng(80.3318736);
    }
  }, []);

  useEffect(() => {
    // Fetch the menu data once lat and lng are available
    if (lat && lng) {
      const fetchMenu = async () => {
        try {
          const data = await SwiggyMenuApi(resId, lat, lng); // Call the SwiggyMenuApi
          setMenuData(data); // Store the menu data in the state
        } catch (err) {
          setError(err.message); // Handle errors
        } finally {
          setLoading(false); // Stop loading after the request
        }
      };

      fetchMenu();
    }
  }, [lat, lng, resId]);

  // If loading, show a shimmer effect
  if (loading) return <Shimmer />;
  
  // If there's an error, show the error message
  if (error) return <h1>Error: {error}</h1>;

  // Extract restaurant details safely from the data
  const restaurantCard = menuData?.cards?.find(
    (card) => card?.card?.card?.info
  );

  if (!restaurantCard) return <h1>Restaurant data not available</h1>;

  const { name, cuisines, costForTwoMessage } = restaurantCard.card.card.info;

  // Extract menu categories
  const menuCategories = menuData?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards;

  // Extract all menu items from categories
  const menuItems = menuCategories?.flatMap(category =>
    category?.card?.card?.itemCards?.map(item => item.card.info) || []
  );

  return (
    <div className="menu-container">
      <h1 className="restaurant-name">{name || "Loading..."}</h1>
      <h2 className="restaurant-details">{cuisines?.join(", ")} - {costForTwoMessage}</h2>

      <div className="menu-items">
        {menuItems?.map((dish, index) => (
          <div className="menu-card" key={`${dish.id}-${index}`}>
            <div className="menu-info">
              <h3>{dish.name}</h3>
              <p className="menu-description">{dish.description}</p>
              <h4 className="menu-price">₹{dish.price ? dish.price / 100 : "N/A"}</h4>
              {dish.ratings && (
                <p className="menu-rating">
                  ⭐ {dish.ratings.aggregatedRating.rating} ({dish.ratings.aggregatedRating.ratingCount} ratings)
                </p>
              )}
              <button className="add-btn" onClick={() => dispatch(addItem(dish))}>ADD</button>
            </div>
            {dish.imageId && (
              <img
                className="menu-image"
                src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_200/${dish.imageId}`}
                alt={dish.name}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantMenu;

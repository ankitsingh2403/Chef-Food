import React, { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { MENU_API } from "../utils/constants";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import { addItem } from "../utils/cartSlice";
import { useDispatch } from "react-redux";



const RestaurantMenu = () => {
  // const [resInfo, setResInfo] = useState(null);

  const {resId} = useParams();

  const resInfo = useRestaurantMenu(resId);   //custom hook

  const dispatch = useDispatch();


  // const addFoodItem = (dish) => {
      
  // }

  // const handleAddItem= () => {
  //     dispatch(addItem("Grapes"));
  // }
  
  //This Logic is written in custom hook as utility functiion
  // useEffect(() => {
  //   fetchMenu();
  // }, []);

  // const fetchMenu = async () => {
  //   try {
  //     const response = await fetch(MENU_API + resId);
  //     const json = await response.json();
  //     console.log(json);
  //     setResInfo(json?.data || null);
  //   } catch (error) {
  //     console.error("Error fetching menu:", error);
  //   }
  // };

  if (!resInfo) return <Shimmer />;

  // Extract restaurant details safely
  const restaurantCard = resInfo?.cards?.find(
    (card) => card?.card?.card?.info
  );

  if (!restaurantCard) return <h1>Restaurant data not available</h1>;

  const { name, cuisines, costForTwoMessage } = restaurantCard.card.card.info;

  // Extract menu categories
  const menuCategories = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards;

  // Extract all menu items
  const menuItems = menuCategories?.flatMap(category =>
    category?.card?.card?.itemCards?.map(item => item.card.info) || []
  );

  return (
    <div className="menu-container">
      <h1 className="restaurant-name">{name || "Loading..."}</h1>
      <h2 className="restaurant-details">{cuisines?.join(", ")} - {costForTwoMessage}</h2>

      <div className="menu-items">
        {menuItems?.map((dish,index) => (
          <div className="menu-card" key={`${dish.id}-${index}`}>
            <div className="menu-info">
              <h3>{dish.name}</h3>
              <p className="menu-description">{dish.description}</p>
              <h4 className="menu-price">₹{dish.price ? dish.price / 100 : "N/A"}</h4>
              {dish.ratings && (
                <p className="menu-rating">⭐ {dish.ratings.aggregatedRating.rating} ({dish.ratings.aggregatedRating.ratingCount} ratings)</p>
              )}
              <button className="add-btn" onClick={()=>dispatch(addItem(dish))} >ADD</button>
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

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, clearCart } from "../utils/cartSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import "react-toastify/dist/ReactToastify.css";

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
  });

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);
  // const totalPriceInPaise = totalPrice * 100; 

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const saveAddress = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/address`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Address saved successfully!");
        setFormData({
          name: "",
          street: "",
          city: "",
          state: "",
          zip: "",
          phone: "",
        });
        setShowAddressForm(false);
        fetchAddresses();
      } else {
        const data = await res.json();
        toast.error(data.message || "Failed to save address");
      }
    } catch (error) {
      console.error("Save error:", error);
      toast.error("Error saving address");
    }
  };

  const fetchAddresses = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/address`, {
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setSavedAddresses(data);
        toast.info("Fetched saved addresses");
      } else {
        toast.error("Failed to fetch addresses");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Error fetching addresses");
    }
  };

  const deleteAddress = async (addressId) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/address/${addressId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        toast.success("Address deleted successfully!");
        fetchAddresses();
      } else {
        const data = await res.json();
        toast.error(data.message || "Failed to delete address");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Error deleting address");
    }
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty. Please add items.");
      return;
    }
  
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/payment/create-checkout-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ amount: totalPrice }),
      });
  
      const data = await res.json();
  
      if (res.ok) {
        const stripe = await stripePromise; // Ensure Stripe is loaded before using it
        await stripe.redirectToCheckout({ sessionId: data.id });
      } else {
        toast.error(data.message || "Payment initiation failed");
      }
    } catch (error) {
      console.error("Payment initiation failed", error);
      toast.error("An error occurred during payment initiation.");
    }
  };

  return (
    <div className="cart-container">
      <div className="cart-left">
        <h2>🛍️ Secure Checkout</h2>

        {/* Account */}
        <div className="cart-step">
          <h3>🧑 Account</h3>
          <p>Please login or register to continue.</p>
          <div className="cart-buttons">
            <Link to="/login"><button className="btn">Login</button></Link>
            <Link to="/register"><button className="btn">Register</button></Link>
          </div>
        </div>

        {/* Address */}
        <div className="step-section">
          <h3>📍 Delivery Address</h3>
          {!showAddressForm ? (
            <button className="btn" onClick={() => setShowAddressForm(true)}>➕ Add Address</button>
          ) : (
            <div className="address-form animated fadeIn">
              <input name="name" placeholder="Full Name" value={formData.name} onChange={handleInput} />
              <input name="street" placeholder="Street" value={formData.street} onChange={handleInput} />
              <input name="city" placeholder="City" value={formData.city} onChange={handleInput} />
              <input name="state" placeholder="State" value={formData.state} onChange={handleInput} />
              <input name="zip" placeholder="ZIP Code" value={formData.zip} onChange={handleInput} />
              <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleInput} />
              <button className="btn" onClick={saveAddress}>💾 Save</button>
              <button className="btn" onClick={() => setShowAddressForm(false)}>❌ Cancel</button>
            </div>
          )}

          <button className="btn" onClick={fetchAddresses}>📂 View Saved Addresses</button>
          <div className="saved-addresses">
            {savedAddresses.map((addr, i) => (
              <div key={i} className="address-card animated fadeIn">
                <p><strong>{addr.name}</strong></p>
                <p>{addr.street}, {addr.city}, {addr.state} - {addr.zip}</p>
                <p>📞 {addr.phone}</p>
                <button className="btn" onClick={() => deleteAddress(addr._id)}>🗑️ Delete</button>
              </div>
            ))}
          </div>
        </div>

        {/* Payment */}
        <div className="cart-step">
          <h3>💳 Payment</h3>
          <button className="btn" onClick={handleCheckout}>Proceed to Payment</button>
        </div>
      </div>

      {/* Order Summary */}
      <div className="cart-right">
        <h3>Your Order</h3>
        {cartItems.length === 0 ? (
          <p>No items in cart</p>
        ) : (
          cartItems.map((item, index) => (
            <div key={index} className="cart-item">
              <p>{item.name} - ₹{item.price / 100}</p>
              <button className="btn" onClick={() => {
                dispatch(removeItem(index));
                toast.info("Item removed");
              }}>❌</button>
            </div>
          ))
        )}
        <button className="btn" onClick={() => {
          dispatch(clearCart());
          toast.info("Cart cleared");
        }}>
          Clear Cart
        </button>

        <div className="bill-details">
          <p>Subtotal: ₹{totalPrice / 100}</p>
          <p>Delivery: ₹0</p>
          <p>GST: ₹0</p>
          <hr />
          <h3>Total: ₹{totalPrice / 100}</h3>
          <button className="btn" onClick={handleCheckout} disabled={cartItems.length === 0}>
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, clearCart } from "../utils/cartSlice"; // adjust path if needed

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="cart-container">
      {/* LEFT SIDE - Checkout Steps */}
      <div className="cart-left">
        <h2>Secure Checkout</h2>
        <div className="cart-step">
          <h3>🧑 Account</h3>
          <p>
            To place your order, log in to your existing account or sign up.
          </p>
          <div className="cart-buttons">
            <button className="btn-outline">Log In</button>
            <button className="btn-primary">Sign Up</button>
          </div>
        </div>

        <div className="step-section">
          <h2>📍 Delivery Address</h2>
          <textarea
            className="address-textarea"
            placeholder="Enter your full address here..."
          />
          <div className="address-buttons">
            <button className="save-btn">💾 Save Address</button>
            <button className="check-btn">📂 Check Saved Addresses</button>
          </div>
        </div>

        <div className="cart-step">
          <h3>💳 Payment</h3>
          <button className="payment-btn">Payment</button>
        </div>
      </div>

      {/* RIGHT SIDE - Order Summary */}
      <div className="cart-right">
        <h3>Your Order</h3>

        <div className="cart-items">
          {cartItems.length === 0 ? (
            <p>No items in cart</p>
          ) : (
            cartItems.map((item, index) => (
              <div key={index} className="cart-item">
                <div>
                  <p>{item.name}</p>
                  <p>₹{item.price / 100}</p>
                </div>
                <button
                  className="remove-btn"
                  onClick={() => dispatch(removeItem(index))}
                >
                  ❌ Remove
                </button>
                
              </div>
            ))
            
          )}
          <div className="clear-btn-container">
                  <button
                    className="clear-btn"
                    onClick={() => dispatch(clearCart())}
                  >
                    Clear
                  </button>
                </div>
        </div>

        <div className="bill-details">
          <p>Item Total: ₹{totalPrice / 100}</p>
          <p>Delivery Fee: ₹0</p>
          <p>GST & Other Charges: ₹0</p>
          <hr />
          <h3>Total: ₹{totalPrice / 100}</h3>
          <button className="btn-order">Order Now</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;

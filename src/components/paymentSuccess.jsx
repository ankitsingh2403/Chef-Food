import React from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";


const PaymentSuccess = () => {
  return (
    <div className="success-container">
      <div className="success-card animated fadeInUp">
        <FaCheckCircle className="success-icon" />
        <h2>Payment Successful!</h2>
        <p>Thank you for your order. We've received your payment.</p>

        <div className="order-summary">
          <p><strong>Order ID:</strong> #{Math.floor(Math.random() * 1000000)}</p>
          <p><strong>Status:</strong> Confirmed ✅</p>
        </div>

        <Link to="/">
          <button className="btn success-btn">Back to Home</button>
        </Link>
        {/* <Link to="/orders">
          <button className="btn view-orders-btn">View My Orders</button>
        </Link> */}
      </div>
    </div>
  );
};

export default PaymentSuccess;

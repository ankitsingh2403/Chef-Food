const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    phone: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Address", addressSchema);

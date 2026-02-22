import { useState } from "react";
import { supabase } from "./supabaseclient";

export default function OrderPage() {
  const [customerName, setCustomerName] = useState("");
  const [orderText, setOrderText] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccessMessage("");

    const { error } = await supabase.from("orders").insert([
      {
        customer_name: customerName,
        order_details: orderText,
      },
    ]);

    if (error) {
      console.error("Error saving order:", error);
      alert("Something went wrong. Please try again.");
      return;
    }

    alert("Success! Your order was saved.");

    setCustomerName("");
    setOrderText("");
    setSuccessMessage("Success! Your order was saved.");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Order Now</h1>

      {successMessage && <p>{successMessage}</p>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label>Customer Name:</label>
          <br />
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Order Text:</label>
          <br />
          <textarea
            value={orderText}
            onChange={(e) => setOrderText(e.target.value)}
            rows="5"
            cols="30"
            required
          />
        </div>

        <button type="submit">Submit Order</button>
      </form>
    </div>
  );
}
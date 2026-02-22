import { useEffect, useState } from "react";
import { supabase } from "./supabaseclient";

export default function Menu() {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    const { data, error } = await supabase.from("menu_items").select("*");

    if (error) {
      console.error("Error fetching menu items:", error);
      return;
    }

    setMenuItems(data || []);
  };

  const breakfastItems = menuItems.filter((item) => item.category === "Breakfast");
  const lunchItems = menuItems.filter((item) => item.category === "Lunch");
  const dinnerItems = menuItems.filter((item) => item.category === "Dinner");
  const drinkItems = menuItems.filter((item) => item.category === "Drinks");

  const renderSection = (title, items) => (
    <section style={{ marginBottom: "30px" }}>
      <h2>{title}</h2>

      {items.length === 0 ? (
        <p>No items found.</p>
      ) : (
        items.map((item) => (
          <div key={item.id} style={{ marginBottom: "20px" }}>
            <h3>{item.name}</h3>
            <p>${Number(item.price).toFixed(2)}</p>

            {item.image_url ? (
              <img
                src={item.image_url}
                alt={item.name}
                width="150"
                style={{ borderRadius: "10px" }}
              />
            ) : (
              <p>No image available</p>
            )}
          </div>
        ))
      )}
    </section>
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>Our Menu</h1>

      {renderSection("Breakfast", breakfastItems)}
      {renderSection("Lunch", lunchItems)}
      {renderSection("Dinner", dinnerItems)}
      {renderSection("Beverages & Drinks", drinkItems)}
    </div>
  );
}
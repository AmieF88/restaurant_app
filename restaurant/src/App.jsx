import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Menu from "./menu.jsx";
import OrderPage from "./orderPage.jsx";
import Chatbot from "./Chatbot";

function App() {
  return (
    <BrowserRouter>
      <nav style={{ display: "flex", gap: "15px", padding: "15px" }}>
        <Link to="/menu">Menu</Link>
        <Link to="/order">
          <button>Order Now</button>
        </Link>
        <Link to="/chat"><button>Chat</button>
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/chat" element={<Chatbot />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
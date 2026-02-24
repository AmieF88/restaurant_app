import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Menu from "./menu.jsx";
import OrderPage from "./orderPage.jsx";
import Chatbot from "./Chatbot";
import Home from "./home.jsx";
import { HashRouter } from "react-router-dom";

function App() {
  return (
    <HashRouter>
      <nav style={{ display: "flex", gap: "15px", padding: "15px" }}>
        <Link to="/"><button>Home</button></Link>
        <Link to="/menu"><button>Menu</button></Link>
        <Link to="/order">
          <button>Order Now</button>
        </Link>
        <Link to="/chat"><button>Chat</button>
        </Link>

      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/chat" element={<Chatbot />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
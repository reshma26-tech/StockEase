import { useState } from "react";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const [currentPage, setCurrentPage] = useState("login");

  // Show Login page without sidebar
  if (currentPage === "login") {
    return (
      <Login
        onLogin={() => setCurrentPage("dashboard")}
        onRegister={() => setCurrentPage("register")}
      />
    );
  }

  // Show Register page without sidebar
  if (currentPage === "register") {
    return (
      <Register
        onRegister={() => setCurrentPage("login")}
        onLogin={() => setCurrentPage("login")}
      />
    );
  }

  // Main StockEase application
  return (
    <div className="app">

      {/* Sidebar */}
      <aside className="sidebar">

        <h2>StockEase</h2>

        <nav>

          <button
            onClick={() => setCurrentPage("dashboard")}
          >
            Dashboard
          </button>

          <button
            onClick={() => setCurrentPage("products")}
          >
            Products
          </button>

          <button
            onClick={() => setCurrentPage("add-product")}
          >
            Add Product
          </button>

        </nav>

        {/* Logout */}
        <button
          className="logout"
          onClick={() => setCurrentPage("login")}
        >
          Logout
        </button>

      </aside>

      {/* Main Content */}
      <main className="main-content">

        {currentPage === "dashboard" && (
          <Dashboard />
        )}

        {currentPage === "products" && (
          <Products
            onAddProduct={() => setCurrentPage("add-product")}
          />
        )}

        {currentPage === "add-product" && (
          <AddProduct
            onProductAdded={() => setCurrentPage("products")}
          />
        )}

      </main>

    </div>
  );
}

export default App;
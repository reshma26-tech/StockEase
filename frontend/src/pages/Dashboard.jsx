import { useEffect, useState } from "react";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to fetch products");
        return;
      }

      setProducts(data);

    } catch (error) {
      alert("Unable to connect to the backend.");
      console.error(error);

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const totalProducts = products.length;

  const totalStock = products.reduce(
    (total, product) => total + product.quantity,
    0
  );

  const lowStock = products.filter(
    (product) =>
      product.quantity > 0 &&
      product.quantity <= product.minimumStock
  ).length;

  const outOfStock = products.filter(
    (product) => product.quantity === 0
  ).length;

  return (
    <div className="dashboard">

      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Overview of your product stock</p>
      </div>

      {loading ? (
        <p>Loading dashboard...</p>
      ) : (
        <>
          <div className="dashboard-cards">

            <div className="dashboard-card">
              <h3>Total Products</h3>
              <h2>{totalProducts}</h2>
            </div>

            <div className="dashboard-card">
              <h3>Total Stock</h3>
              <h2>{totalStock}</h2>
            </div>

            <div className="dashboard-card">
              <h3>Low Stock</h3>
              <h2>{lowStock}</h2>
            </div>

            <div className="dashboard-card">
              <h3>Out of Stock</h3>
              <h2>{outOfStock}</h2>
            </div>

          </div>

          {/* Recent Products */}

          <div className="dashboard-section">

            <h2>Recent Products</h2>

            {products.length === 0 ? (
              <p>No products available.</p>
            ) : (
              products
                .slice()
                .reverse()
                .slice(0, 5)
                .map((product) => (
                  <div
                    className="recent-product"
                    key={product._id}
                  >

                    <div>
                      <strong>{product.productName}</strong>

                      <p>
                        {product.productId} • {product.category}
                      </p>
                    </div>

                    <span>
                      {product.quantity} units
                    </span>

                  </div>
                ))
            )}

          </div>

          {/* Low Stock Products */}

          <div className="dashboard-section">

            <h2>Low Stock Products</h2>

            {products.filter(
              (product) =>
                product.quantity <= product.minimumStock
            ).length === 0 ? (
              <p>No low stock products.</p>
            ) : (
              products
                .filter(
                  (product) =>
                    product.quantity <= product.minimumStock
                )
                .map((product) => (
                  <div
                    className="recent-product"
                    key={product._id}
                  >

                    <div>
                      <strong>{product.productName}</strong>

                      <p>
                        {product.productId} • {product.category}
                      </p>
                    </div>

                    <span>
                      {product.quantity} units
                    </span>

                  </div>
                ))
            )}

          </div>

        </>
      )}

    </div>
  );
}

export default Dashboard;
import { useEffect, useState } from "react";

function Products({ onAddProduct }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingProduct, setEditingProduct] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

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

  // Edit product
  const handleEdit = (product) => {
    setEditingProduct({
      ...product
    });
  };

  // Delete product
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE"
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to delete product");
        return;
      }

      alert("Product deleted successfully!");

      fetchProducts();

    } catch (error) {
      alert("Unable to connect to the backend.");
      console.error(error);
    }
  };

  // Increase or decrease stock
  const handleStockChange = async (product, change) => {
    const newQuantity = product.quantity + change;

    if (newQuantity < 0) {
      alert("Stock cannot be less than 0.");
      return;
    }

    try {
      const response = await fetch(
        `/api/products/${product._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            quantity: newQuantity
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to update stock");
        return;
      }

      fetchProducts();

    } catch (error) {
      alert("Unable to connect to the backend.");
      console.error(error);
    }
  };

  // Edit form changes
  const handleEditChange = (event) => {
    const { name, value } = event.target;

    setEditingProduct({
      ...editingProduct,
      [name]: value
    });
  };

  // Update product
  const handleUpdate = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `/api/products/${editingProduct._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            productName: editingProduct.productName,
            category: editingProduct.category,
            supplier: editingProduct.supplier,
            price: Number(editingProduct.price),
            minimumStock: Number(editingProduct.minimumStock)
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to update product");
        return;
      }

      alert("Product updated successfully!");

      setEditingProduct(null);

      fetchProducts();

    } catch (error) {
      alert("Unable to connect to the backend.");
      console.error(error);
    }
  };

  return (
    <div className="products-page">

      <div className="products-header">

        <div>
          <h1>Products</h1>
          <p>Manage your products and stock</p>
        </div>

        <button
          className="add-product-button"
          onClick={onAddProduct}
        >
          + Add Product
        </button>

      </div>

      {/* Search and Filters */}

      <div className="product-search">

        <input
          type="text"
          placeholder="Search by product name or ID"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />

        <select
          value={categoryFilter}
          onChange={(event) =>
            setCategoryFilter(event.target.value)
          }
        >
          <option value="All">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Stationery">Stationery</option>
          <option value="Grocery">Grocery</option>
          <option value="Clothing">Clothing</option>
        </select>

        <select
          value={statusFilter}
          onChange={(event) =>
            setStatusFilter(event.target.value)
          }
        >
          <option value="All">All Status</option>
          <option value="In Stock">In Stock</option>
          <option value="Low Stock">Low Stock</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>

      </div>

      <div className="products-table-container">

        {loading ? (
          <p>Loading products...</p>
        ) : products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <table className="products-table">

            <thead>

              <tr>
                <th>Product Name</th>
                <th>Product ID</th>
                <th>Category</th>
                <th>Supplier</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Status</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>

            </thead>

            <tbody>

              {products
                .filter((product) =>
                  product.productName
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                  product.productId
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                )
                .filter((product) =>
                  categoryFilter === "All"
                    ? true
                    : product.category === categoryFilter
                )
                .filter((product) => {

                  let status = "In Stock";

                  if (product.quantity === 0) {
                    status = "Out of Stock";
                  } else if (
                    product.quantity <= product.minimumStock
                  ) {
                    status = "Low Stock";
                  }

                  return statusFilter === "All"
                    ? true
                    : status === statusFilter;
                })
                .map((product) => {

                  let status = "In Stock";

                  if (product.quantity === 0) {
                    status = "Out of Stock";
                  } else if (
                    product.quantity <= product.minimumStock
                  ) {
                    status = "Low Stock";
                  }

                  return (
                    <tr key={product._id}>

                      <td>{product.productName}</td>

                      <td>{product.productId}</td>

                      <td>{product.category}</td>

                      <td>{product.supplier}</td>

                      <td>₹{product.price}</td>

                      <td>{product.quantity}</td>

                      <td>

                        <span
                          className={`status ${
                            status === "In Stock"
                              ? "in-stock"
                              : status === "Low Stock"
                              ? "low-stock"
                              : "out-of-stock"
                          }`}
                        >
                          {status}
                        </span>

                      </td>

                      <td>

                        <button
                          className="action-button"
                          onClick={() =>
                            handleStockChange(product, -1)
                          }
                        >
                          −
                        </button>

                        <button
                          className="action-button"
                          onClick={() =>
                            handleStockChange(product, 1)
                          }
                        >
                          +
                        </button>

                      </td>

                      <td>

                        <button
                          className="action-button edit-button"
                          onClick={() => handleEdit(product)}
                        >
                          Edit
                        </button>

                        <button
                          className="action-button delete-button"
                          onClick={() =>
                            handleDelete(product._id)
                          }
                        >
                          Delete
                        </button>

                      </td>

                    </tr>
                  );
                })}

            </tbody>

          </table>
        )}

      </div>

      {/* Edit Product Form */}

      {editingProduct && (

        <div className="edit-product-box">

          <h2>Edit Product</h2>

          <form onSubmit={handleUpdate}>

            <div className="form-group">

              <label>Product Name</label>

              <input
                type="text"
                name="productName"
                value={editingProduct.productName}
                onChange={handleEditChange}
                required
              />

            </div>

            <div className="form-group">

              <label>Category</label>

              <select
                name="category"
                value={editingProduct.category}
                onChange={handleEditChange}
                required
              >
                <option value="Electronics">
                  Electronics
                </option>

                <option value="Stationery">
                  Stationery
                </option>

                <option value="Grocery">
                  Grocery
                </option>

                <option value="Clothing">
                  Clothing
                </option>

              </select>

            </div>

            <div className="form-group">

              <label>Supplier</label>

              <input
                type="text"
                name="supplier"
                value={editingProduct.supplier}
                onChange={handleEditChange}
                required
              />

            </div>

            <div className="form-group">

              <label>Price</label>

              <input
                type="number"
                name="price"
                value={editingProduct.price}
                onChange={handleEditChange}
                min="0"
                required
              />

            </div>

            <div className="form-group">

              <label>Minimum Stock Level</label>

              <input
                type="number"
                name="minimumStock"
                value={editingProduct.minimumStock}
                onChange={handleEditChange}
                min="0"
                required
              />

            </div>

            <div className="edit-buttons">

              <button
                type="submit"
                className="save-product-button"
              >
                Save Changes
              </button>

              <button
                type="button"
                className="cancel-button"
                onClick={() => setEditingProduct(null)}
              >
                Cancel
              </button>

            </div>

          </form>

        </div>

      )}

    </div>
  );
}

export default Products;
import { useState } from "react";

function AddProduct({ onProductAdded }) {
  const [product, setProduct] = useState({
    productName: "",
    productId: "",
    category: "",
    supplier: "",
    price: "",
    quantity: "",
    minimumStock: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setProduct({
      ...product,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "/api/products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            productName: product.productName,
            productId: product.productId,
            category: product.category,
            supplier: product.supplier,
            price: Number(product.price),
            quantity: Number(product.quantity),
            minimumStock: Number(product.minimumStock)
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to add product");
        return;
      }

      alert("Product added successfully!");

      onProductAdded();

      setProduct({
        productName: "",
        productId: "",
        category: "",
        supplier: "",
        price: "",
        quantity: "",
        minimumStock: ""
      });

    } catch (error) {
      alert("Unable to connect to the backend.");
      console.error(error);
    }
  };

  return (
    <div className="add-product-page">

      <div className="add-product-header">
        <h1>Add Product</h1>
        <p>Add a new product to your stock</p>
      </div>

      <div className="add-product-box">

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Product Name</label>

            <input
              type="text"
              name="productName"
              value={product.productName}
              onChange={handleChange}
              placeholder="Enter product name"
              required
            />
          </div>

          <div className="form-group">
            <label>Product ID</label>

            <input
              type="text"
              name="productId"
              value={product.productId}
              onChange={handleChange}
              placeholder="Enter product ID"
              required
            />
          </div>

          <div className="form-group">
            <label>Category</label>

            <select
              name="category"
              value={product.category}
              onChange={handleChange}
              required
            >
              <option value="">Select category</option>
              <option value="Electronics">Electronics</option>
              <option value="Stationery">Stationery</option>
              <option value="Grocery">Grocery</option>
              <option value="Clothing">Clothing</option>
            </select>
          </div>

          <div className="form-group">
            <label>Supplier</label>

            <input
              type="text"
              name="supplier"
              value={product.supplier}
              onChange={handleChange}
              placeholder="Enter supplier name"
              required
            />
          </div>

          <div className="form-group">
            <label>Price</label>

            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              placeholder="Enter price"
              min="0"
              required
            />
          </div>

          <div className="form-group">
            <label>Quantity</label>

            <input
              type="number"
              name="quantity"
              value={product.quantity}
              onChange={handleChange}
              placeholder="Enter quantity"
              min="0"
              required
            />
          </div>

          <div className="form-group">
            <label>Minimum Stock Level</label>

            <input
              type="number"
              name="minimumStock"
              value={product.minimumStock}
              onChange={handleChange}
              placeholder="Enter minimum stock level"
              min="0"
              required
            />
          </div>

          <button
            type="submit"
            className="save-product-button"
          >
            Add Product
          </button>

        </form>

      </div>

    </div>
  );
}

export default AddProduct;
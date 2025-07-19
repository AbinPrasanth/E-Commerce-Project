import React, { useEffect, useState } from "react";
import axios from "axios";
import NavPanel from "./NavPanel";

const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

const AdminProductsManagement = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    id: "",
    category: "",
    name: "",
    image: "",
    description: "",
    primeColor: "",
    sizes: [],
    price: ""
  });
  const [editMode, setEditMode] = useState(false);
  const [expandedProductId, setExpandedProductId] = useState(null);
  const [productDetails, setProductDetails] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("https://localhost:7072/api/Product");
      setProducts(res.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSizesChange = (e) => {
    const sizes = e.target.value.split(",").map((size) => size.trim());
    setNewProduct((prev) => ({ ...prev, sizes }));
  };

  const resetForm = () => {
    setNewProduct({
      id: "",
      category: "",
      name: "",
      image: "",
      description: "",
      primeColor: "",
      sizes: [],
      price: ""
    });
    setEditMode(false);
  };

  const addProduct = async () => {
    if (
      !newProduct.category ||
      !newProduct.name ||
      !newProduct.description ||
      !newProduct.primeColor ||
      !newProduct.sizes.length ||
      !newProduct.price
    ) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("Category", newProduct.category);
      formData.append("Name", newProduct.name);
      formData.append("Description", newProduct.description);
      formData.append("PrimeColor", newProduct.primeColor);
      newProduct.sizes.forEach((size, index) => {
        formData.append(`Sizes[${index}]`, size);
      });
      formData.append("Price", newProduct.price);
      formData.append("Image", newProduct.image);

      await axios.post("https://localhost:7072/api/Product", formData, {
        headers: {...getAuthHeader().headers, "Content-Type": "multipart/form-data" }
      });

      fetchProducts();
      resetForm();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const updateProduct = async () => {
    try {
      const formData = new FormData();
      formData.append("Category", newProduct.category);
      formData.append("Name", newProduct.name);
      formData.append("Description", newProduct.description);
      formData.append("PrimeColor", newProduct.primeColor);
      newProduct.sizes.forEach((size, index) => {
        formData.append(`Sizes[${index}]`, size);
      });
      formData.append("Price", newProduct.price);
      if (newProduct.image) {
        formData.append("Image", newProduct.image);
      }

      await axios.put(`https://localhost:7072/api/Product/${newProduct.id}`, formData, {
        headers: { ...getAuthHeader().headers, "Content-Type": "multipart/form-data" }
      });

      fetchProducts();
      resetForm();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`https://localhost:7072/api/Product/${id}`,getAuthHeader()
);
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEdit = (product) => {
    setNewProduct({ ...product, image: "" });
    setEditMode(true);
  };

  const toggleDetails = async (id) => {
    if (expandedProductId === id) {
      setExpandedProductId(null);
      setProductDetails(null);
    } else {
      try {
        const res = await axios.get(`https://localhost:7072/api/Product/${id}`);
        setExpandedProductId(id);
        setProductDetails(res.data.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    }
  };

  return (
    <NavPanel>
      <div className="p-4">
        <h1 className="text-xl font-bold mb-6">Admin Products Management</h1>

        {/* Add/Edit Product Form */}
        <div className="mb-6 border p-4 rounded-lg">
          <h2 className="font-semibold mb-2">{editMode ? "Edit Product" : "Add New Product"}</h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={handleInputChange}
              className="border p-2 rounded"
            />
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={newProduct.category}
              onChange={handleInputChange}
              className="border p-2 rounded"
            />
            <input
              type="file"
              name="image"
              onChange={(e) => setNewProduct((prev) => ({ ...prev, image: e.target.files[0] }))}
              className="border p-2 rounded"
            />
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={newProduct.description}
              onChange={handleInputChange}
              className="border p-2 rounded"
            />
            <input
              type="text"
              name="primeColor"
              placeholder="Prime Color"
              value={newProduct.primeColor}
              onChange={handleInputChange}
              className="border p-2 rounded"
            />
            <input
              type="text"
              name="sizes"
              placeholder="Sizes (comma-separated)"
              value={newProduct.sizes.join(", ")}
              onChange={handleSizesChange}
              className="border p-2 rounded"
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={newProduct.price}
              onChange={handleInputChange}
              className="border p-2 rounded"
            />
          </div>
          <div className="mt-4">
            <button
              onClick={editMode ? updateProduct : addProduct}
              className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 mr-2 rounded"
            >
              {editMode ? "Update Product" : "Add Product"}
            </button>
            {editMode && (
              <button onClick={resetForm} className="bg-gray-500 text-white px-4 py-2 rounded">
                Cancel
              </button>
            )}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Products List</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border p-2">Name</th>
                <th className="border p-2">Category</th>
                <th className="border p-2">Price</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <React.Fragment key={product.id}>
                  <tr>
                    <td className="border p-2">{product.name}</td>
                    <td className="border p-2">{product.category}</td>
                    <td className="border p-2">₹{product.price}</td>
                    <td className="border p-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="bg-green-700 hover:bg-green-500 text-white px-2 py-1 mr-2 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="bg-red-700 hover:bg-red-500 text-white px-2 py-1 mr-2 rounded"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => toggleDetails(product.id)}
                        className="bg-indigo-700 hover:bg-indigo-500 text-white px-2 py-1 rounded"
                      >
                        {expandedProductId === product.id ? "Hide" : "View"}
                      </button>
                    </td>
                  </tr>

                  {expandedProductId === product.id && productDetails && (
                    <tr>
                      <td colSpan="4" className="border p-4 bg-gray-100">
                        <div className="flex gap-8">
                          <img
                            src={productDetails.imageUrl}
                            alt={productDetails.name}
                            className="w-40 h-40 object-cover rounded border"
                          />
                          <div>
                            <p><strong>Name:</strong> {productDetails.name}</p>
                            <p><strong>Description:</strong> {productDetails.description}</p>
                            <p><strong>Prime Color:</strong> {productDetails.primeColor}</p>
                            <p><strong>Sizes:</strong> {productDetails.sizes.join(", ")}</p>
                            <p><strong>Price:</strong> ₹{productDetails.price}</p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </NavPanel>
  );
};

export default AdminProductsManagement;

import React, { useEffect, useState } from "react";
import axios from "axios";
import NavPanel from "./NavPanel";

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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/products");
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

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

  const addProduct = async () => {
    if (
      !newProduct.category ||
      !newProduct.name ||
      !newProduct.image ||
      !newProduct.description ||
      !newProduct.primeColor ||
      !newProduct.sizes.length ||
      !newProduct.price
    ) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/products", newProduct);
      setProducts([...products, res.data]);
      resetForm();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const updateProduct = async () => {
    try {
      const res = await axios.put(`http://localhost:5000/products/${newProduct.id}`, newProduct);
      setProducts(
        products.map((product) =>
          product.id === newProduct.id ? { ...product, ...res.data } : product
        )
      );
      resetForm();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/products/${id}`);
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
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

  const handleEdit = (product) => {
    setNewProduct(product);
    setEditMode(true);
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
              type="text"
              name="image"
              placeholder="Image Path"
              value={newProduct.image}
              onChange={handleInputChange}
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
              className="bg-blue-500 text-white px-4 py-2 mr-2 rounded"
            >
              {editMode ? "Update Product" : "Add Product"}
            </button>
            {editMode && (
              <button onClick={resetForm} className="bg-gray-500 text-white px-4 py-2 rounded ">
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
                <tr key={product.id}>
                  <td className="border p-2">{product.name}</td>
                  <td className="border p-2">{product.category}</td>
                  <td className="border p-2">{product.price}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="bg-green-500 text-white px-2 py-1 mr-2 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="bg-red-800 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </NavPanel>
  );
};

export default AdminProductsManagement;

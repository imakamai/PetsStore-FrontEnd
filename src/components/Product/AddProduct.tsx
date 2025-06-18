import React, { useState, useEffect } from "react";
import api from "../../services/api";
import "styles/Form.css";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

interface Productioner {
    id: number;
    name: string;
}

const AddProduct: React.FC = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [brand, setBrand] = useState("");
    const [price, setPrice] = useState<number>(0);
    const [idProductioner, setIdProductioner] = useState<number | null>(null);
    const [productioners, setProductioners] = useState<Productioner[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const navigate = useNavigate(); // Initialize useNavigate hook

    useEffect(() => {
        api
            .get("/Productioner")
            .then((response) => {
                setProductioners(response.data);
                if (response.data.length > 0) {
                    setIdProductioner(response.data[0].id);
                }
            })
            .catch(() => setError("Failed to fetch productioners"));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);

        if (!name || !description || !category || !brand || price <= 0 || idProductioner === null) {
            setError("Please fill in all fields and select a valid price and productioner.");
            return;
        }

        try {
            await api.post("/products", {
                name,
                description,
                category,
                brand,
                price,
                idProductioner,
            });
            setSuccessMessage("Product added successfully!");
            setName("");
            setDescription("");
            setCategory("");
            setBrand("");
            setPrice(0);
            setIdProductioner(productioners.length > 0 ? productioners[0].id : null);
            // Optionally, navigate back to product list after a short delay
            // setTimeout(() => navigate('/'), 2000);
        } catch (err: any) {
            if (axios.isAxiosError(err) && err.response) {
                if (err.response.status === 403) {
                    setError("You are not authorized to add products. Only administrators can perform this action.");
                } else if (err.response.status === 401) {
                    setError("You need to be logged in to perform this action, or your session is invalid.");
                } else {
                    setError(err.response.data.message || "Failed to add product. Please try again.");
                }
            } else {
                setError("An unexpected error occurred. Failed to add product.");
            }
            console.error("Error adding product:", err);
        }
    };

    return (
        <div className="form-container">
            <h1>Add Product</h1>
            {error && <p className="form-message error">{error}</p>}
            {successMessage && <p className="form-message success">{successMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Product Name"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input
                        type="text"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Product Description"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category:</label>
                    <input
                        type="text"
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder="Product Category"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="brand">Brand:</label>
                    <input
                        type="text"
                        id="brand"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        placeholder="Product Brand"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price:</label>
                    <input
                        type="number"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        placeholder="Product Price"
                        min="0.01"
                        step="0.01"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="productioner">Productioner:</label>
                    <select
                        id="productioner"
                        value={idProductioner ?? ""}
                        onChange={(e) => setIdProductioner(Number(e.target.value))}
                        required
                    >
                        <option value="">Select a productioner</option>
                        {productioners.map((prod) => (
                            <option key={prod.id} value={prod.id}>
                                {prod.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-actions"> {/* New div for buttons */}
                    <button type="submit" className="form-submit-button">
                        Add Product
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/products')}
                        className="form-back-button"
                    >
                        Back to Products
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;
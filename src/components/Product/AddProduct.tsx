import React, { useState, useEffect } from "react";
import api from "../../services/api";

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

    useEffect(() => {
        api
            .get("/productioners")
            .then((response) => setProductioners(response.data))
            .catch(() => setError("Failed to fetch productioners"));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            await api.post("/products", {
                name,
                description,
                category,
                brand,
                price,
                idProductioner,
            });
            alert("Product added successfully!");
        } catch {
            setError("Failed to add product");
        }
    };

    return (
        <div>
            <h1>Add Product</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                />
                <input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                />
                <input
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Category"
                />
                <input
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    placeholder="Brand"
                />
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    placeholder="Price"
                />
                {/* <select
          value={idProductioner ?? ""}
          onChange={(e) => setIdProductioner(Number(e.target.value))}
        >
          <option value="">Select a productioner</option>
          {productioners.map((prod) => (
            <option key={prod.id} value={prod.id}>
              {prod.name}
            </option>
          ))}
        </select> */}
                <button type="submit">Add Product</button>
            </form>
        </div>
    );
};

export default AddProduct;

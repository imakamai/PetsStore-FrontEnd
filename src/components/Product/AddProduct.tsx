import React, { useState, useEffect } from "react";
import api from "../../services/api";
import "styles/Form.css";

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
    const [successMessage, setSuccessMessage] = useState<string | null>(null); // Added for success message

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
    }, []); // <--- Empty array here


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null); // Clear previous success message

        // Basic validation
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
            // Optionally, clear the form after successful submission
            setName("");
            setDescription("");
            setCategory("");
            setBrand("");
            setPrice(0);
            // You might want to reset idProductioner or keep it as is
            // setIdProductioner(null);
        } catch (err) {
            setError("Failed to add product. Please try again.");
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
                        min="0.01" // Ensure price is positive
                        step="0.01" // Allow decimal values
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
                <button type="submit" className="form-submit-button">
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default AddProduct;

// import React, { useState, useEffect } from "react";
// import api from "../../services/api";
//
// interface Productioner {
//     id: number;
//     name: string;
// }
//
// const AddProduct: React.FC = () => {
//     const [name, setName] = useState("");
//     const [description, setDescription] = useState("");
//     const [category, setCategory] = useState("");
//     const [brand, setBrand] = useState("");
//     const [price, setPrice] = useState<number>(0);
//     const [idProductioner, setIdProductioner] = useState<number | null>(null);
//     const [productioners, setProductioners] = useState<Productioner[]>([]);
//     const [error, setError] = useState<string | null>(null);
//
//     useEffect(() => {
//         api
//             .get("/productioners")
//             .then((response) => setProductioners(response.data))
//             .catch(() => setError("Failed to fetch productioners"));
//     }, []);
//
//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setError(null);
//
//         try {
//             await api.post("/products", {
//                 name,
//                 description,
//                 category,
//                 brand,
//                 price,
//                 idProductioner,
//             });
//             alert("Product added successfully!");
//         } catch {
//             setError("Failed to add product");
//         }
//     };
//
//     return (
//         <div>
//             <h1>Add Product</h1>
//             {error && <p style={{ color: "red" }}>{error}</p>}
//             <form onSubmit={handleSubmit}>
//                 <input
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     placeholder="Name"
//                 />
//                 <input
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                     placeholder="Description"
//                 />
//                 <input
//                     value={category}
//                     onChange={(e) => setCategory(e.target.value)}
//                     placeholder="Category"
//                 />
//                 <input
//                     value={brand}
//                     onChange={(e) => setBrand(e.target.value)}
//                     placeholder="Brand"
//                 />
//                 <input
//                     type="number"
//                     value={price}
//                     onChange={(e) => setPrice(Number(e.target.value))}
//                     placeholder="Price"
//                 />
//                 {/* <select
//           value={idProductioner ?? ""}
//           onChange={(e) => setIdProductioner(Number(e.target.value))}
//         >
//           <option value="">Select a productioner</option>
//           {productioners.map((prod) => (
//             <option key={prod.id} value={prod.id}>
//               {prod.name}
//             </option>
//           ))}
//         </select> */}
//                 <button type="submit">Add Product</button>
//             </form>
//         </div>
//     );
// };
//
// export default AddProduct;

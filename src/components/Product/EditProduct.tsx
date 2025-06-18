// src/components/Product/EditProduct.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import axios from "axios";
import "styles/Edit.css" // Ensure this CSS file exists and has your form styles

interface Product {
    id: number;
    name: string;
    description: string;
    category: string;
    brand: string;
    price: number;
    productionerName?: string;
    // Add idProductioner here if it's part of the Product interface from the API
    idProductioner?: number;
}

interface Productioner {
    id: number;
    name: string;
}

const EditProduct: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [productioners, setProductioners] = useState<Productioner[]>([]);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    useEffect(() => {
        const fetchProductAndProductioners = async () => {
            setLoading(true);
            setError(null);
            try {
                const productRes = await api.get<Product>(`/Products/${id}`);
                setProduct(productRes.data);

                const productionerRes = await api.get<Productioner[]>("/Productioner");
                setProductioners(productionerRes.data);

            } catch (err) {
                setError("Failed to fetch product or productioners.");
                console.error("Error fetching data for edit:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProductAndProductioners();
    }, [id]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setProduct({ ...product!, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);
        if (!product) {
            setError("Product data is missing.");
            return;
        }

        if (!product.name || !product.description || !product.category || !product.brand || product.price <= 0 || product.idProductioner === null || product.idProductioner === undefined) {
            setError("Please fill in all fields and select a valid price and productioner.");
            return;
        }


        try {
            const productToUpdate = {
                id: product.id,
                name: product.name,
                description: product.description,
                category: product.category,
                brand: product.brand,
                price: product.price,
                idProductioner: product.idProductioner
            };

            await api.put(`/Products/${id}`, productToUpdate);
            setSuccessMessage("Product updated successfully!");
            setTimeout(() => navigate("/"), 1500);
        } catch (err: any) {
            if (axios.isAxiosError(err) && err.response) {
                if (err.response.status === 403) {
                    setError("You are not authorized to update products. Only administrators can perform this action.");
                } else if (err.response.status === 401) {
                    setError("You need to be logged in to perform this action, or your session is invalid.");
                } else {
                    setError(err.response.data.message || "Failed to update product. Please try again.");
                }
            } else {
                setError("An unexpected error occurred. Failed to update product.");
            }
            console.error("Error updating product:", err);
        }
    };

    if (loading) return <p>Loading product...</p>;
    if (error) return <p>{error}</p>;
    if (!product) return <p>Product not found</p>;

    return (
        <div className="form-container">
            <h1>Edit Product</h1>
            {error && <p className="form-message error">{error}</p>}
            {successMessage && <p className="form-message success">{successMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={product.name}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Description:
                        <textarea
                            name="description"
                            value={product.description}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Category:
                        <input
                            type="text"
                            name="category"
                            value={product.category}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Brand:
                        <input
                            type="text"
                            name="brand"
                            value={product.brand}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Price:
                        <input
                            type="number"
                            name="price"
                            value={product.price}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label htmlFor="productioner">Productioner:</label>
                    <select
                        id="productioner"
                        name="idProductioner"
                        value={product.idProductioner ?? ""}
                        onChange={handleChange}
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

                <div className="form-actions">
                    <button type="submit" className="form-submit-button">
                        Save Changes
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

export default EditProduct;

// // src/components/Product/EditProduct.tsx
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import api from "../../services/api";
// import axios from "axios";
// import "styles/Edit.css"
//
// interface Product {
//     id: number;
//     name: string;
//     description: string;
//     category: string;
//     brand: string;
//     price: number;
//     productionerName?: string;
// }
//
// interface Productioner {
//     id: number;
//     name: string;
// }
//
// const EditProduct: React.FC = () => {
//     const { id } = useParams<{ id: string }>();
//     const navigate = useNavigate();
//     const [product, setProduct] = useState<Product | null>(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const [productioners, setProductioners] = useState<Productioner[]>([]);
//     const [successMessage, setSuccessMessage] = useState<string | null>(null);
//
//     useEffect(() => {
//         const fetchProductAndProductioners = async () => {
//             setLoading(true);
//             setError(null);
//             try {
//                 const productRes = await api.get<Product>(`/Products/${id}`);
//                 setProduct(productRes.data);
//
//                 const productionerRes = await api.get<Productioner[]>("/Productioner");
//                 setProductioners(productionerRes.data);
//
//             } catch (err) {
//                 setError("Failed to fetch product or productioners.");
//                 console.error("Error fetching data for edit:", err);
//             } finally {
//                 setLoading(false);
//             }
//         };
//
//         fetchProductAndProductioners();
//     }, [id]);
//
//     const handleChange = (
//         e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
//     ) => {
//         setProduct({ ...product!, [e.target.name]: e.target.value });
//     };
//
//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setError(null);
//         setSuccessMessage(null);
//         if (!product) {
//             setError("Product data is missing.");
//             return;
//         }
//
//         try {
//             await api.put(`/Products/${id}`, product);
//             setSuccessMessage("Product updated successfully!");
//             navigate("/products");
//         } catch (err: any) {
//             if (axios.isAxiosError(err) && err.response) {
//                 if (err.response.status === 403) {
//                     setError("You are not authorized to update products. Only administrators can perform this action.");
//                 } else if (err.response.status === 401) {
//                     setError("You need to be logged in to perform this action, or your session is invalid.");
//                 } else {
//                     setError(err.response.data.message || "Failed to update product. Please try again.");
//                 }
//             } else {
//                 setError("An unexpected error occurred. Failed to update product.");
//             }
//             console.error("Error updating product:", err);
//         }
//     };
//
//     if (loading) return <p>Loading product...</p>;
//     if (error) return <p>{error}</p>;
//     if (!product) return <p>Product not found</p>;
//
//     return (
//         <div className="form-container">
//             <h1>Edit Product</h1>
//             {error && <p className="form-message error">{error}</p>}
//             {successMessage && <p className="form-message success">{successMessage}</p>}
//             <form onSubmit={handleSubmit}>
//                 <div className="form-group">
//                     <label>
//                         Name:
//                         <input
//                             type="text"
//                             name="name"
//                             value={product.name}
//                             onChange={handleChange}
//                             required
//                         />
//                     </label>
//                 </div>
//                 <div className="form-group">
//                     <label>
//                         Description:
//                         <textarea
//                             name="description"
//                             value={product.description}
//                             onChange={handleChange}
//                             required
//                         />
//                     </label>
//                 </div>
//                 <div className="form-group">
//                     <label>
//                         Category:
//                         <input
//                             type="text"
//                             name="category"
//                             value={product.category}
//                             onChange={handleChange}
//                             required
//                         />
//                     </label>
//                 </div>
//                 <div className="form-group">
//                     <label>
//                         Brand:
//                         <input
//                             type="text"
//                             name="brand"
//                             value={product.brand}
//                             onChange={handleChange}
//                             required
//                         />
//                     </label>
//                 </div>
//                 <div className="form-group">
//                     <label>
//                         Price:
//                         <input
//                             type="number"
//                             name="price"
//                             value={product.price}
//                             onChange={handleChange}
//                             required
//                         />
//                     </label>
//                 </div>
//                 <button type="submit" className="form-submit-button">Save Changes</button>
//             </form>
//         </div>
//     );
// };
//
// export default EditProduct;
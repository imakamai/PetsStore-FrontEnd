import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api"; // Assuming your API service path is correct
import { useNavigate } from "react-router-dom";

interface Product {
    id: number;
    name: string;
    description: string;
    category: string;
    brand: string;
    price: number;
    productionerName?: string;
}

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch products from the API
        api
            .get<Product[]>("/Products")
            .then((res) => {
                console.log("API Response:", res.data);
                setProducts(res.data);
            })
            .catch(() => setError("Failed to fetch products")) // Set error message if fetch fails
            .finally(() => setLoading(false)); // Set loading to false once fetch is complete
    }, []); // Empty dependency array means this effect runs once after initial render

    const deleteProduct = async (id: number) => {
        // Confirm with the user before deleting a product
        if (!window.confirm("Are you sure you want to delete this product?"))
            return; // If user cancels, stop the function

        try {
            // Send DELETE request to the API
            await api.delete(`/Products/${id}`);
            // Update the state to remove the deleted product from the list
            setProducts(products.filter((product) => product.id !== id));
        } catch (error) {
            // Show an alert if there's an error during deletion
            alert("Error deleting product.");
        }
    };

    // Show loading message while data is being fetched
    if (loading) return <p>Loading products...</p>;
    // Show error message if fetching products failed
    if (error) return <p>{error}</p>;

    return (
        <div style={{ maxWidth: '800px', margin: '50px auto', padding: '20px', border: '1px solid #e0e0e0', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', backgroundColor: '#fff' }}>
            <h1 style={{ fontSize: '2.5em', marginBottom: '20px', color: '#333', textAlign: 'center' }}>Product List</h1>
            <div style={{ marginBottom: '20px', textAlign: 'right' }}>
                {/* Link to the add new product page */}
                <Link
                    to="/add-product"
                    style={{
                        backgroundColor: '#28a745',
                        color: 'white',
                        padding: '10px 15px',
                        borderRadius: '5px',
                        textDecoration: 'none',
                        fontWeight: 'bold',
                        transition: 'background-color 0.3s ease'
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#218838')}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#28a745')}
                >
                    Add New Product
                </Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                {/* Map through the products and display each one */}
                {products.map((product) => (
                    <div
                        key={product.id}
                        style={{
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            padding: '15px',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                            backgroundColor: '#f9f9f9',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                        }}
                    >
                        <h2 style={{ fontSize: '1.5em', color: '#007bff', marginBottom: '10px' }}>{product.name}</h2>
                        <p style={{ margin: '5px 0', color: '#555' }}>Category: <span style={{ fontWeight: 'bold' }}>{product.category}</span></p>
                        <p style={{ margin: '5px 0', color: '#555' }}>Brand: <span style={{ fontWeight: 'bold' }}>{product.brand}</span></p>
                        <p style={{ margin: '5px 0', color: '#555' }}>Price: <span style={{ fontWeight: 'bold', color: '#dc3545' }}>${product.price.toFixed(2)}</span></p>
                        {product.productionerName && (
                            <p style={{ margin: '5px 0', color: '#555' }}>Productioner: <span style={{ fontWeight: 'bold' }}>{product.productionerName}</span></p>
                        )}
                        <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
                            {/* Button to navigate to the edit product page */}
                            <button
                                onClick={() => navigate(`/edit-product/${product.id}`)}
                                style={{
                                    padding: '8px 12px',
                                    backgroundColor: '#ffc107',
                                    color: '#333',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                    transition: 'background-color 0.3s ease'
                                }}
                                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#e0a800')}
                                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#ffc107')}
                            >
                                Edit
                            </button>
                            {/* Button to delete a product */}
                            <button
                                onClick={() => deleteProduct(product.id)}
                                style={{
                                    padding: '8px 12px',
                                    backgroundColor: '#dc3545',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                    transition: 'background-color 0.3s ease'
                                }}
                                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#c82333')}
                                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#dc3545')}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;

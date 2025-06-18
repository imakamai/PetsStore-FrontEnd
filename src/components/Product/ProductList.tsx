import React, { useEffect, useState, useRef } from "react"; // Import useRef
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import axios from 'axios';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Container } from 'react-bootstrap';

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
    const [searchTerm, setSearchTerm] = useState<string>('');
    const navigate = useNavigate();

    const isInitialMount = useRef(true);

    const fetchProducts = async (term: string = '', category: string = '', brand: string = '') => {
        if (!loading) setLoading(true);
        setError(null);
        try {
            const params: { searchTerm?: string; category?: string; brand?: string } = {};
            if (term) params.searchTerm = term;
            if (category) params.category = category;
            if (brand) params.brand = brand;

            const res = await api.get<Product[]>("/Products/search", { params });
            setProducts(res.data);
        } catch (err) {
            console.error("Error fetching products:", err);
            setError("Failed to fetch products");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isInitialMount.current) {
            fetchProducts();
            isInitialMount.current = false;
        } else if (searchTerm === '') {
            fetchProducts();
        }
    }, [searchTerm]);

    const deleteProduct = async (id: number) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;

        try {
            await api.delete(`/Products/${id}`);
            setProducts(products.filter((product) => product.id !== id));
            alert("Product deleted successfully!");
        } catch (error: any) {
            if (axios.isAxiosError(error) && error.response) {
                alert(error.response.data.message || "Error deleting product. Please try again.");
            } else {
                alert("An unexpected error occurred during deletion.");
            }
            console.error("Error deleting product:", error);
        }
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        fetchProducts(searchTerm);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleCategoryFilter = (selectedCategory: string) => {
        setSearchTerm('');
        fetchProducts('', selectedCategory);
    };

    if (loading && products.length === 0) {
        return <p>Loading products...</p>;
    }
    if (error) return <p>{error}</p>;


    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container fluid>
                    <Navbar.Brand as={Link} to="/">Pets Store</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarSupportedContent" />
                    <Navbar.Collapse id="navbarSupportedContent">
                        <Nav className="me-auto mb-2 mb-lg-0">
                            {/*<Nav.Link as={Link} to="/">Home (Products)</Nav.Link>*/}
                            <Nav.Link as={Link} to="/dashboard">Profile</Nav.Link>
                            {/*<Nav.Link as={Link} to="/add-product">Add Product</Nav.Link>*/}

                            <NavDropdown title="Categories" id="basic-nav-dropdown">
                                <NavDropdown.Item onClick={() => handleCategoryFilter('Dog')}>Dogs</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => handleCategoryFilter('Cat')}>Cats</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={() => fetchProducts()}>All Products</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Form className="d-flex" onSubmit={handleSearchSubmit}>
                            <FormControl
                                type="search"
                                placeholder="Search products..."
                                className="me-2"
                                aria-label="Search"
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                            <Button variant="outline-success" type="submit">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* If loading and products are already present, you might show a subtle spinner
                instead of a full 'Loading...' message */}
            {loading && products.length > 0 && (
                <div style={{ textAlign: 'center', margin: '10px 0', color: '#666' }}>
                    Updating products...
                </div>
            )}

            <div style={{ maxWidth: '800px', margin: '50px auto', padding: '20px', border: '1px solid #e0e0e0', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', backgroundColor: '#fff' }}>
                <h1 style={{ fontSize: '2.5em', marginBottom: '20px', color: '#333', textAlign: 'center' }}>Products</h1>
                <div style={{ marginBottom: '20px', textAlign: 'right' }}>
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
                    {products.length > 0 ? (
                        products.map((product) => (
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
                                    <button
                                        onClick={() => navigate(`/edit-product/${product.id}`)}
                                        style={{
                                            padding: '8px 12px',
                                            backgroundColor: '#ffc300',
                                            color: '#333',
                                            border: 'none',
                                            borderRadius: '5px',
                                            cursor: 'pointer',
                                            fontWeight: 'bold',
                                            transition: 'background-color 0.3s ease'
                                        }}
                                        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#FFE6B3')}
                                        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#FFF4D9')}
                                    >
                                        Edit
                                    </button>

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
                        ))
                    ) : (
                        <p style={{ gridColumn: '1 / -1', textAlign: 'center', fontSize: '1.2em', color: '#666' }}>No products found matching your criteria.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default ProductList;



// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import api from "../../services/api"; // Your Axios instance
// import axios from 'axios';
// // Import Bootstrap components from react-bootstrap
// import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Container } from 'react-bootstrap';
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
// const ProductList: React.FC = () => {
//     const [products, setProducts] = useState<Product[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const [searchTerm, setSearchTerm] = useState<string>(''); // State for the search input
//     const navigate = useNavigate();
//
//     // Function to fetch products, now supporting search parameters
//     const fetchProducts = async (term: string = '') => {
//         setLoading(true);
//         setError(null);
//         try {
//             const params = { searchTerm: term, category: '', brand: '' }; // You can extend this for category/brand filters
//             const res = await api.get<Product[]>("/Products/search", { params }); // Use the new search endpoint
//             console.log("API Search Response:", res.data);
//             setProducts(res.data);
//         } catch (err) {
//             console.error("Error fetching products:", err);
//             setError("Failed to fetch products");
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     useEffect(() => {
//         fetchProducts(); // Initial fetch of all products
//     }, []);
//
//     const deleteProduct = async (id: number) => {
//         if (!window.confirm("Are you sure you want to delete this product?")) return;
//
//         try {
//             await api.delete(`/Products/${id}`);
//             setProducts(products.filter((product) => product.id !== id));
//             alert("Product deleted successfully!");
//         } catch (error: any) {
//             if (axios.isAxiosError(error) && error.response) {
//                 alert(error.response.data.message || "Error deleting product. Please try again.");
//             } else {
//                 alert("An unexpected error occurred during deletion.");
//             }
//             console.error("Error deleting product:", error);
//         }
//     };
//
//     // Handle search form submission
//     const handleSearchSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         fetchProducts(searchTerm);
//     };
//
//     if (loading) return <p>Loading products...</p>;
//     if (error) return <p>{error}</p>;
//
//     return (
//         <>
//             {/* Bootstrap Navbar integrated with React-Bootstrap components */}
//             <Navbar bg="light" expand="lg">
//                 <Container fluid>
//                     <Navbar.Brand href="#">Pets Store</Navbar.Brand>
//                     <Navbar.Toggle aria-controls="navbarSupportedContent" />
//                     <Navbar.Collapse id="navbarSupportedContent">
//                         <Nav className="me-auto mb-2 mb-lg-0">
//                             {/*<Nav.Link as={Link} to="/" active>Home</Nav.Link>*/}
//                             <Nav.Link as={Link} to="/dashboard">Profile</Nav.Link>
//                             {/*<Nav.Link as={Link} to="/add-product">Add Product</Nav.Link>*/}
//                             {/*<NavDropdown title="Categories" id="basic-nav-dropdown">*/}
//                             {/*    /!*<NavDropdown.Item onClick={() => fetchProducts('', 'Dog')}>Dogs</NavDropdown.Item>*!/*/}
//                             {/*    /!*<NavDropdown.Item onClick={() => fetchProducts('', 'Cat')}>Cats</NavDropdown.Item>*!/*/}
//                             {/*    <NavDropdown.Divider />*/}
//                             {/*    <NavDropdown.Item onClick={() => fetchProducts()}>All Products</NavDropdown.Item>*/}
//                             {/*</NavDropdown>*/}
//                         </Nav>
//                         <Form className="d-flex" onSubmit={handleSearchSubmit}>
//                             <FormControl
//                                 type="search"
//                                 placeholder="Search products..."
//                                 className="me-2"
//                                 aria-label="Search"
//                                 value={searchTerm}
//                                 onChange={(e) => setSearchTerm(e.target.value)}
//                             />
//                             <Button variant="outline-success" type="submit">Search</Button>
//                         </Form>
//                     </Navbar.Collapse>
//                 </Container>
//             </Navbar>
//
//             {/* Your existing product list content */}
//             <div style={{ maxWidth: '800px', margin: '50px auto', padding: '20px', border: '1px solid #e0e0e0', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', backgroundColor: '#fff' }}>
//                 <h1 style={{ fontSize: '2.5em', marginBottom: '20px', color: '#333', textAlign: 'center' }}>Products</h1>
//                 <div style={{ marginBottom: '20px', textAlign: 'right' }}>
//                     <Link
//                         to="/add-product"
//                         style={{
//                             backgroundColor: '#28a745',
//                             color: 'white',
//                             padding: '10px 15px',
//                             borderRadius: '5px',
//                             textDecoration: 'none',
//                             fontWeight: 'bold',
//                             transition: 'background-color 0.3s ease'
//                         }}
//                         onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#218838')}
//                         onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#28a745')}
//                     >
//                         Add New Product
//                     </Link>
//                 </div>
//                 <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
//                     {products.length > 0 ? (
//                         products.map((product) => (
//                             <div
//                                 key={product.id}
//                                 style={{
//                                     border: '1px solid #ddd',
//                                     borderRadius: '8px',
//                                     padding: '15px',
//                                     boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
//                                     backgroundColor: '#f9f9f9',
//                                     display: 'flex',
//                                     flexDirection: 'column',
//                                     justifyContent: 'space-between'
//                                 }}
//                             >
//                                 <h2 style={{ fontSize: '1.5em', color: '#007bff', marginBottom: '10px' }}>{product.name}</h2>
//                                 <p style={{ margin: '5px 0', color: '#555' }}>Category: <span style={{ fontWeight: 'bold' }}>{product.category}</span></p>
//                                 <p style={{ margin: '5px 0', color: '#555' }}>Brand: <span style={{ fontWeight: 'bold' }}>{product.brand}</span></p>
//                                 <p style={{ margin: '5px 0', color: '#555' }}>Price: <span style={{ fontWeight: 'bold', color: '#dc3545' }}>${product.price.toFixed(2)}</span></p>
//                                 {product.productionerName && (
//                                     <p style={{ margin: '5px 0', color: '#555' }}>Productioner: <span style={{ fontWeight: 'bold' }}>{product.productionerName}</span></p>
//                                 )}
//                                 <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
//                                     <button
//                                         onClick={() => navigate(`/edit-product/${product.id}`)}
//                                         style={{
//                                             padding: '8px 12px',
//                                             backgroundColor: '#ffc300',
//                                             color: '#333',
//                                             border: 'none',
//                                             borderRadius: '5px',
//                                             cursor: 'pointer',
//                                             fontWeight: 'bold',
//                                             transition: 'background-color 0.3s ease'
//                                         }}
//                                         onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#FFE6B3')}
//                                         onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#FFF4D9')}
//                                     >
//                                         Edit
//                                     </button>
//
//                                     <button
//                                         onClick={() => deleteProduct(product.id)}
//                                         style={{
//                                             padding: '8px 12px',
//                                             backgroundColor: '#dc3545',
//                                             color: 'white',
//                                             border: 'none',
//                                             borderRadius: '5px',
//                                             cursor: 'pointer',
//                                             fontWeight: 'bold',
//                                             transition: 'background-color 0.3s ease'
//                                         }}
//                                         onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#c82333')}
//                                         onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#dc3545')}
//                                     >
//                                         Delete
//                                     </button>
//                                 </div>
//                             </div>
//                         ))
//                     ) : (
//                         <p style={{ gridColumn: '1 / -1', textAlign: 'center', fontSize: '1.2em', color: '#666' }}>No products found matching your criteria.</p>
//                     )}
//                 </div>
//             </div>
//         </>
//     );
// };
//
// export default ProductList;
//
// // import React, { useEffect, useState } from "react";
// // import { Link, useNavigate } from "react-router-dom";
// // import api from "../../services/api";
// // import axios from 'axios';
// // import { Button, Navbar, Container } from 'react-bootstrap';
// //
// // interface Product {
// //     id: number;
// //     name: string;
// //     description: string;
// //     category: string;
// //     brand: string;
// //     price: number;
// //     productionerName?: string;
// // }
// //
// // const ProductList: React.FC = () => {
// //     const [products, setProducts] = useState<Product[]>([]);
// //     const [loading, setLoading] = useState(true);
// //     const [error, setError] = useState<string | null>(null);
// //     const navigate = useNavigate();
// //
// //     useEffect(() => {
// //         api
// //             .get<Product[]>("/Products")
// //             .then((res) => {
// //                 console.log("API Response:", res.data);
// //                 setProducts(res.data);
// //             })
// //             .catch((err) => {
// //                 console.error("Error fetching products:", err);
// //                 setError("Failed to fetch products");
// //             })
// //             .finally(() => setLoading(false));
// //     }, []);
// //
// //     const deleteProduct = async (id: number) => {
// //         if (!window.confirm("Are you sure you want to delete this product?")) return;
// //
// //         try {
// //             await api.delete(`/Products/${id}`);
// //             setProducts(products.filter((product) => product.id !== id));
// //             alert("Product deleted successfully!");
// //         } catch (error: any) {
// //             if (axios.isAxiosError(error) && error.response) {
// //                 alert(error.response.data.message || "Error deleting product. Please try again.");
// //             } else {
// //                 alert("An unexpected error occurred during deletion.");
// //             }
// //             console.error("Error deleting product:", error);
// //         }
// //     };
// //
// //     if (loading) return <p>Loading products...</p>;
// //     if (error) return <p>{error}</p>;
// //
// //     return (
// //         <div style={{ maxWidth: '800px', margin: '50px auto', padding: '20px', border: '1px solid #e0e0e0', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', backgroundColor: '#fff' }}>
// //             <h1 style={{ fontSize: '2.5em', marginBottom: '20px', color: '#333', textAlign: 'center' }}>Products</h1>
// //             <div style={{ marginBottom: '20px', textAlign: 'right' }}>
// //                 <Link
// //                     to="/add-product"
// //                     style={{
// //                         backgroundColor: '#28a745',
// //                         color: 'white',
// //                         padding: '10px 15px',
// //                         borderRadius: '5px',
// //                         textDecoration: 'none',
// //                         fontWeight: 'bold',
// //                         transition: 'background-color 0.3s ease'
// //                     }}
// //                     onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#218838')}
// //                     onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#28a745')}
// //                 >
// //                     Add New Product
// //                 </Link>
// //             </div>
// //             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
// //                 {products.map((product) => (
// //                     <div
// //                         key={product.id}
// //                         style={{
// //                             border: '1px solid #ddd',
// //                             borderRadius: '8px',
// //                             padding: '15px',
// //                             boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
// //                             backgroundColor: '#f9f9f9',
// //                             display: 'flex',
// //                             flexDirection: 'column',
// //                             justifyContent: 'space-between'
// //                         }}
// //                     >
// //                         <h2 style={{ fontSize: '1.5em', color: '#007bff', marginBottom: '10px' }}>{product.name}</h2>
// //                         <p style={{ margin: '5px 0', color: '#555' }}>Category: <span style={{ fontWeight: 'bold' }}>{product.category}</span></p>
// //                         <p style={{ margin: '5px 0', color: '#555' }}>Brand: <span style={{ fontWeight: 'bold' }}>{product.brand}</span></p>
// //                         <p style={{ margin: '5px 0', color: '#555' }}>Price: <span style={{ fontWeight: 'bold', color: '#dc3545' }}>${product.price.toFixed(2)}</span></p>
// //                         {product.productionerName && (
// //                             <p style={{ margin: '5px 0', color: '#555' }}>Productioner: <span style={{ fontWeight: 'bold' }}>{product.productionerName}</span></p>
// //                         )}
// //                         <div style={{marginTop: '15px', display: 'flex', gap: '10px'}}>
// //                             <button
// //                                 onClick={() => navigate(`/edit-product/${product.id}`)}
// //                                 style={{
// //                                     padding: '8px 12px',
// //                                     backgroundColor: '#ffc300',
// //                                     color: '#333',
// //                                     border: 'none',
// //                                     borderRadius: '5px',
// //                                     cursor: 'pointer',
// //                                     fontWeight: 'bold',
// //                                     transition: 'background-color 0.3s ease'
// //                                 }}
// //                                 onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#FFE6B3')} // Tamnija nijansa pastelno žute pri hoveru
// //                                 onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#FFF4D9')}
// //                             >
// //                                 Edit
// //                             </button>
// //
// //                             <button
// //                                 onClick={() => deleteProduct(product.id)}
// //                                 style={{
// //                                     padding: '8px 12px',
// //                                     backgroundColor: '#dc3545',
// //                                     color: 'white',
// //                                     border: 'none',
// //                                     borderRadius: '5px',
// //                                     cursor: 'pointer',
// //                                     fontWeight: 'bold',
// //                                     transition: 'background-color 0.3s ease'
// //                                 }}
// //                                 onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#c82333')}
// //                                 onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#dc3545')}
// //                             >
// //                                 Delete
// //                             </button>
// //                         </div>
// //                     </div>
// //                 ))}
// //             </div>
// //         </div>
// //     );
// // };
// //
// // export default ProductList;

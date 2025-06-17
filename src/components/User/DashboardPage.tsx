import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Container } from 'react-bootstrap';
// Assuming you have an api service similar to the ProductList example for search
// import api from '../../services/api'; // Uncomment if you need search functionality here too

interface UserInfo {
    message: string;
    username: string;
    fullName: string;
    email: string;
    isAdmin: boolean;
}

const DashboardPage: React.FC = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<UserInfo | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>(''); // State for the search input

    // Function for handling search (if you want search on dashboard too)
    // This example will just navigate to a search results page
    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // You can navigate to a product list page with search params
        navigate(`/products?searchTerm=${searchTerm}`);
        // Or, if you want to perform search within the dashboard itself,
        // you'd need to fetch product data here, similar to ProductList.tsx
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error("Greška pri parsiranju korisničkih podataka iz localStorage:", e);
                localStorage.removeItem('user');
                navigate('/login');
            }
        } else {
            navigate('/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    if (!user) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100 text-gray-700">
                Učitavanje korisničkih podataka...
            </div>
        );
    }

    return (
        <>
        {/* Bootstrap Navbar integrated into DashboardPage */}
        <Navbar bg="light" expand="lg">
            <Container fluid>
                <Navbar.Brand as={Link} to="/">Pets Store</Navbar.Brand> {/* Link to Home/ProductList */}
                <Navbar.Toggle aria-controls="navbarSupportedContent"/>
                <Navbar.Collapse id="navbarSupportedContent">
                    <Nav className="me-auto mb-2 mb-lg-0">
                        <Nav.Link as={Link} to="/products">Products</Nav.Link> {/* Link to ProductList */}
                        {/*<Nav.Link as={Link} to="/dashboard">Profile</Nav.Link>*/}
                        {/*<Nav.Link as={Link} to="/add-product">Add Product</Nav.Link> /

                            {/* Example of a dropdown for categories or other links */}
                        {/*<NavDropdown title="More Actions" id="basic-nav-dropdown">*/}
                        {/*    /!*<NavDropdown.Item as={Link} to="/some-other-page">Another Page</NavDropdown.Item>*!/*/}
                        {/*    /!*<NavDropdown.Divider />*!/*/}
                        {/*    <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>*/}
                        {/*</NavDropdown>*/}
                    </Nav>
                    <Form className="d-flex" onSubmit={handleSearchSubmit}>
                        <FormControl
                            type="search"
                            placeholder="Search products..."
                            className="me-2"
                            aria-label="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Button variant="outline-success" type="submit">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>

        {/* Dashboard content */}
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 font-inter">
            <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-md w-full">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome, {user.fullName}!</h2>
                <p className="text-lg text-gray-600 mb-2">
                    Username: <span className="font-semibold text-blue-600">{user.username}</span>
                </p>
                <p className="text-lg text-gray-600 mb-2">
                    Email: <span className="font-semibold text-blue-600">{user.email}</span>
                </p>
                <p className="text-lg text-gray-600 mb-6">
                    Role: <span
                    className="font-semibold text-purple-600">{user.isAdmin ? 'Administrator' : 'User'}</span>
                </p>
                <button
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
                >
                    Logout
                </button>
            </div>
        </div>
</>
)
    ;
};

export default DashboardPage;

// // src/pages/DashboardPage.tsx
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
//
//
// interface UserInfo {
//     message: string;
//     username: string;
//     fullName: string;
//     email: string;
//     isAdmin: boolean;
//
// }
//
// const DashboardPage: React.FC = () => {
//     const navigate = useNavigate();
//     const [user, setUser] = useState<UserInfo | null>(null);
//
//
//     useEffect(() => {
//         const storedUser = localStorage.getItem('user');
//         if (storedUser) {
//             try {
//                 setUser(JSON.parse(storedUser));
//             } catch (e) {
//                 console.error("Greška pri parsiranju korisničkih podataka iz localStorage:", e);
//                 localStorage.removeItem('user');
//                 navigate('/login');
//             }
//         } else {
//             navigate('/login');
//         }
//     }, [navigate]);
//
//     const handleLogout = () => {
//         localStorage.removeItem('user');
//         navigate('/login');
//     };
//
//     if (!user) {
//         return (
//             <div className="flex justify-center items-center min-h-screen bg-gray-100 text-gray-700">
//                 Učitavanje korisničkih podataka...
//             </div>
//         );
//     }
//     return (
//         <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 font-inter">
//             <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-md w-full">
//                 <h2 className="text-3xl font-bold text-gray-800 mb-4">Dobrodošli, {user.fullName}!</h2>
//                 <p className="text-lg text-gray-600 mb-2">
//                     Korisničko ime: <span className="font-semibold text-blue-600">{user.username}</span>
//                 </p>
//                 <p className="text-lg text-gray-600 mb-2">
//                     Email: <span className="font-semibold text-blue-600">{user.email}</span>
//                 </p>
//                 <p className="text-lg text-gray-600 mb-6">
//                     Uloga: <span className="font-semibold text-purple-600">{user.isAdmin ? 'Administrator' : 'Korisnik'}</span>
//                 </p>
//                 <button
//                     onClick={handleLogout}
//                     className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
//                 >
//                     Odjavi se
//                 </button>
//             </div>
//         </div>
//     );
// };
//
// export default DashboardPage;

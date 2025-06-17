import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";


import ProductList from "./components/Product/ProductList.tsx";
import AddProduct from "./components/Product/AddProduct.tsx";
import EditProduct from "./components/Product/EditProduct.tsx";

import LoginPage  from "./components/User/LoginPage";
import RegisterPage  from "./components/User/RegisterPage";
import DashboardPage  from "./components/User/DashboardPage";

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/dashboard" element={<DashboardPage />} />

                    <Route path="/products" element={<ProductList />} />
                    <Route path="/add-product" element={<AddProduct />} />
                    <Route path="/edit-product/:id" element={<EditProduct />} />

                    <Route path="/" element={<Navigate to="/login" />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;


// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import ProductList from "./components/Product/ProductList.tsx";
// import AddProduct from "./components/Product/AddProduct.tsx";
// import EditProduct from "./components/Product/EditProduct.tsx";

// import RegisterPage  from "./components/User/RegisterPage";
// import "./App.css";
//
// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <Routes>
//           <Route path="/" element={<ProductList />} />
//           <Route path="/add-product" element={<AddProduct />} />
//           <Route path="/edit-product/:id" element={<EditProduct />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }
//
// export default App;

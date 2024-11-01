import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/shared/Login";
import Products from "./pages/customer/Products";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { AuthContext } from "./hooks/UserContext";
import ProductForm from "./pages/admin/AddProduct";
import Cart from "./pages/customer/Cart";

function App() {
  const { authenticationData } = useContext(AuthContext);
  //make login only accessible when not logged in
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={authenticationData ? <Products /> : <Login />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="/add-product" element={<ProductForm />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

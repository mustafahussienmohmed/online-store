import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../hooks/UserContext";
import { CartContext } from "../hooks/CartContext";

const NavBar = () => {
  const { authenticationData, logout } = useContext(AuthContext);
  const { cartData, loading } = useContext(CartContext);

  if (loading) {
    return null;
  }

  const products = cartData ? cartData[0]?.products : [];
  return (
    <nav className="bg-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-gray-900 text-2xl font-bold">
          My E-Shop
        </Link>
        <div className="hidden md:flex space-x-5 items-center">
          <Link
            to="/products"
            className="text-gray-800 hover:text-mainColor active:text-mainColor font-semibold">
            Products
          </Link>
          {authenticationData && products.length > 0 && (
            <Link
              to="/cart"
              className="text-gray-800 font-semibold hover:text-mainColor active:text-mainColor">
              Cart{" "}
              <span className="bg-red-500 text-white rounded-full px-2 py-1 mx-1 text-xs">
                {products.length}
              </span>
            </Link>
          )}
          {authenticationData ? (
            <>
              <Link
                to="/add-product"
                className="text-gray-800 hover:text-mainColor active:text-mainColor font-semibold">
                Add Product
              </Link>
              <button
                onClick={logout}
                className="bg-red-500 text-white hover:bg-red-800 px-5 py-2 rounded-md font-semibold">
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-blue-500 text-white hover:bg-blue-900 px-5 py-2 rounded-md font-semibold">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

import React, { useState, useEffect } from "react";
import { fetchProductById } from "../api/shopServer";
import SkeletonCartItem from "./SkeletonCartItem";

const CartItem = ({ data, onQuantityChange }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartData, setCartData] = useState(null);
  const [quantity, setQuantity] = useState(data.quantity);

  useEffect(() => {
    const getCartItem = async () => {
      try {
        const res = await fetchProductById(data.productId);
        setCartData(res);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    getCartItem();
  }, [data]);

  const handleIncrease = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onQuantityChange(data.productId, newQuantity); // Notify parent component
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange(data.productId, newQuantity); // Notify parent component
    }
  };

  if (loading) {
    return <SkeletonCartItem />;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error.message}</p>;
  }

  const totalPrice = cartData.price * quantity;

  return (
    <div className="flex items-center gap-5 p-4 bg-white border border-gray-200 rounded-lg shadow-md mb-4">
      <img
        src={cartData.image}
        alt={cartData.title}
        className="w-24 h-24 object-cover rounded-full p-2 border border-gray-300"
      />
      <div className="flex-grow">
        <h2 className="text-lg font-semibold">{cartData.title}</h2>
        <p className="text-gray-700">Price: ${cartData.price.toFixed(2)}</p>
        <div className="flex items-center gap-3 mt-2">
          <button
            onClick={handleDecrease}
            className="px-3 py-1 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400">
            -
          </button>
          <span className="text-lg font-semibold">{quantity}</span>
          <button
            onClick={handleIncrease}
            className="px-3 py-1 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400">
            +
          </button>
        </div>
        <p className="mt-2 text-lg font-semibold">
          Total: ${totalPrice.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default CartItem;

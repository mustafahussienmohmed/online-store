import React, { useState, useEffect } from "react";
import { fetchProducts } from "../../api/shopServer";
import ProductCard from "../../components/ProductCard";
import image from "./images/cover2.png";
import svg from "./images/Group1.png";
import cover from "./images/cover.png";
import reviews from "./images/reviews.png";
import text from "./images/text.png";
import AppLoader from "../../components/AppLoader";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  if (loading) return <AppLoader />;
  if (error) return <div>Error: {error}</div>;
  if (products.length === 0) return <div>No products found</div>;

  return (
    <div className="min-h-screen">
      <header className="flex justify-center gap-44 items-center bg-background mx-32 pt-10 mt-5 rounded-3xl mb-10">
        <div>
          <h1 className="font-extrabold text-7xl leading-none tracking-tight">
            <span className="block text-black bg-white p-1">LET’S</span>
            <span className="block text-black bg-white p-1 mt-2">EXPLORE</span>
            <span className="block text-white bg-orangeJP p-1 mt-2">
              UNIQUE
            </span>
            <span className="block text-black bg-white p-1 mt-2">Items.</span>
          </h1>
          <img src={reviews} alt="reviews" className="mt-10" />
        </div>
        <div className="flex">
          <img src={image} alt="cover" className="w-auto h-[600px]" />
          <img src={svg} alt="svg" className="w-auto h-52" />
        </div>
      </header>
      <section className="flex items-center">
        <div className="w-96 bg-orange-100 mx-32 rounded-xl flex p-4">
          <img src={text} alt="text" className="h-12" />
          <img src={cover} alt="cover" className="w-full" />
        </div>
        <h1 className="text-4xl bg-orangeJP p-3 text-white font-bold">
          State of the art pieces of clothing for every type of weather
        </h1>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-5 gap-6 mx-32 mt-20">
        {products.map((product) => (
          <ProductCard key={product.id} data={product} />
        ))}
      </section>
    </div>
  );
};

export default Products;

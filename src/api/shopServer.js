import axios from "axios";

export const login = async (username, password) => {
  try {
    const response = await axios.post("https://fakestoreapi.com/auth/login", {
      username,
      password,
    });
    localStorage.setItem("token", JSON.stringify(response.data.token));
    return response.data;
  } catch (e) {
    throw new Error("Invalid username or password");
  }
};

export const fetchProducts = async () => {
  try {
    const response = await axios.get("https://fakestoreapi.com/products");
    return response.data;
  } catch (e) {
    throw new Error("Failed to fetch products");
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
    return response.data;
  } catch (e) {
    throw new Error("Failed to fetch product");
  }
};

export const fetchCart = async () => {
  const url = "https://fakestoreapi.com/carts/user/1";
  const token = JSON.parse(localStorage.getItem("token"));

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const postProduct = async (productData) => {
  try {
    const response = await axios.post(
      "https://fakestoreapi.com/products",
      productData
    );
    return response.data;
  } catch (error) {
    console.error("Error posting product data:", error);
    throw error;
  }
};

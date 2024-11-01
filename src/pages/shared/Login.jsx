import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { login } from "../../api/shopServer";
import { AuthContext } from "../../hooks/UserContext";

const Login = () => {
  const { saveAuthenticationData, authenticationData } =
    useContext(AuthContext);

  if (authenticationData) {
    window.location.href = "/products";
  }

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const schema = yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
  });

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const authData = await login(data.username, data.password);
      saveAuthenticationData(authData.token);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-background">
      <div className="bg-white p-12 rounded-xl shadow-2xl w-full max-w-lg transform">
        <h1 className="text-4xl font-bold text-center text-gray-700 mb-8">
          Welcome to My E-Shop
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {error && (
            <div className="mb-4 py-4 px-8 border bg-red-100 border-red-600 text-red-600 rounded-xl animate-pulse">
              <p>{error}</p>
            </div>
          )}
          <div>
            <label className="block text-lg font-semibold text-gray-700">
              Username
            </label>
            <input
              {...register("username")}
              type="text"
              className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-teal-300 focus:outline-none ${
                errors.username ? "border-red-600" : "border-gray-300"
              }`}
            />
            {errors.username && (
              <p className="mt-2 text-red-600">{errors.username.message}</p>
            )}
          </div>
          <div>
            <label className="block text-lg font-semibold text-gray-700">
              Password
            </label>
            <input
              {...register("password")}
              type="password"
              className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-teal-300 focus:outline-none ${
                errors.password ? "border-red-600" : "border-gray-300"
              }`}
            />
            {errors.password && (
              <p className="mt-2 text-red-600">{errors.password.message}</p>
            )}
          </div>
          <button
            disabled={loading}
            type="submit"
            className="w-full mt-5 bg-gradient-to-r from-teal-400 to-blue-500 text-white py-3 rounded-lg shadow-lg hover:from-teal-500 hover:to-blue-600 focus:ring-4 focus:ring-teal-300 focus:outline-none flex justify-center items-center font-semibold text-xl transition-transform duration-300 transform hover:scale-105">
            {loading ? (
              <span
                className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-white border-r-transparent"
                role="status"></span>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

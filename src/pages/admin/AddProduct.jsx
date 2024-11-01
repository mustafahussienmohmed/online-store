import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { postProduct } from "../../api/shopServer";

// Define the validation schema with Yup
const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be a positive number"),
  description: Yup.string().required("Description is required"),
  image: Yup.mixed()
    .required("Image is required")
    .test(
      "fileSize",
      "File size is too large",
      (value) => !value || (value && value.size <= 2000000)
    ) // max 2MB
    .test(
      "fileType",
      "Unsupported file type",
      (value) =>
        !value || (value && ["image/jpeg", "image/png"].includes(value.type))
    ),
  category: Yup.string().required("Category is required"),
});

const ProductForm = () => {
  const [imagePreview, setImagePreview] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      title: "",
      price: "",
      description: "",
      image: null,
      category: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setSuccessMessage("");
      setErrorMessage("");

      // Prepare form data with image file
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("price", values.price);
      formData.append("description", values.description);
      formData.append("image", values.image);
      formData.append("category", values.category);

      try {
        await postProduct(formData);
        setSuccessMessage("Product added successfully!");
      } catch (error) {
        setErrorMessage("Failed to add product. Please try again.");
      }
    },
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      formik.setFieldValue("image", file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-xl border border-gray-200">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          Add New Product
        </h1>
        <form onSubmit={formik.handleSubmit} className="space-y-8">
          {/* Success Message */}
          {successMessage && (
            <div className="mb-4 py-4 px-8 bg-green-100 border border-green-600 text-green-600 rounded-lg">
              <p>{successMessage}</p>
            </div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-4 py-4 px-8 bg-red-100 border border-red-600 text-red-600 rounded-lg">
              <p>{errorMessage}</p>
            </div>
          )}

          {/* Title */}
          <div className="mb-6">
            <label
              htmlFor="title"
              className="block text-lg font-semibold text-gray-700">
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              {...formik.getFieldProps("title")}
              className={`w-full px-4 py-2 border rounded-lg shadow-sm transition duration-300 ease-in-out focus:outline-none focus:ring-2 ${
                formik.touched.title && formik.errors.title
                  ? "border-red-600 ring-red-600"
                  : "border-gray-300 ring-orange-500"
              }`}
            />
            {formik.touched.title && formik.errors.title ? (
              <p className="mt-2 text-red-600">{formik.errors.title}</p>
            ) : null}
          </div>

          {/* Price */}
          <div className="mb-6">
            <label
              htmlFor="price"
              className="block text-lg font-semibold text-gray-700">
              Price
            </label>
            <input
              id="price"
              name="price"
              type="number"
              {...formik.getFieldProps("price")}
              className={`w-full px-4 py-2 border rounded-lg shadow-sm transition duration-300 ease-in-out focus:outline-none focus:ring-2 ${
                formik.touched.price && formik.errors.price
                  ? "border-red-600 ring-red-600"
                  : "border-gray-300 ring-orange-500"
              }`}
            />
            {formik.touched.price && formik.errors.price ? (
              <p className="mt-2 text-red-600">{formik.errors.price}</p>
            ) : null}
          </div>

          {/* Description */}
          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-lg font-semibold text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="4"
              {...formik.getFieldProps("description")}
              className={`w-full px-4 py-2 border rounded-lg shadow-sm transition duration-300 ease-in-out focus:outline-none focus:ring-2 ${
                formik.touched.description && formik.errors.description
                  ? "border-red-600 ring-red-600"
                  : "border-gray-300 ring-orange-500"
              }`}
            />
            {formik.touched.description && formik.errors.description ? (
              <p className="mt-2 text-red-600">{formik.errors.description}</p>
            ) : null}
          </div>

          {/* Image Upload */}
          <div className="mb-6">
            <label
              htmlFor="image"
              className="block text-lg font-semibold text-gray-700">
              Image
            </label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/jpeg, image/png"
              onChange={handleImageChange}
              className="block text-gray-700 file:border-gray-300 file:bg-gray-100 file:py-2 file:px-4 file:rounded-lg file:text-gray-700 file:font-semibold file:cursor-pointer hover:file:bg-gray-200"
            />
            {formik.touched.image && formik.errors.image ? (
              <p className="mt-2 text-red-600">{formik.errors.image}</p>
            ) : null}
            {imagePreview && (
              <div className="mt-4 flex justify-center">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-64 object-cover rounded-lg shadow-lg"
                />
              </div>
            )}
          </div>

          {/* Category */}
          <div className="mb-6">
            <label
              htmlFor="category"
              className="block text-lg font-semibold text-gray-700">
              Category
            </label>
            <input
              id="category"
              name="category"
              type="text"
              {...formik.getFieldProps("category")}
              className={`w-full px-4 py-2 border rounded-lg shadow-sm transition duration-300 ease-in-out focus:outline-none focus:ring-2 ${
                formik.touched.category && formik.errors.category
                  ? "border-red-600 ring-red-600"
                  : "border-gray-300 ring-orange-500"
              }`}
            />
            {formik.touched.category && formik.errors.category ? (
              <p className="mt-2 text-red-600">{formik.errors.category}</p>
            ) : null}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full bg-orange-500 text-white py-3 rounded-lg shadow-lg hover:bg-orange-600 focus:ring-4 focus:ring-orange-300 font-semibold text-xl transition-transform duration-300 transform hover:scale-105">
            {formik.isSubmitting ? (
              <span
                className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-white border-r-transparent align-[-0.125em]"
                role="status"></span>
            ) : (
              "Add Product"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;

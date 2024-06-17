"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FaTrash, FaEdit } from "react-icons/fa";
import Sidebar from '../_components/Sidebar';
import Header from '../_components/Header';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [newDescription, setNewDescription] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/categories");
      setCategories(response.data.categories);
    } catch (error) {
      toast.error("Failed to fetch categories");
    }
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim() || !newDescription.trim()) {
      toast.error("Category name and description cannot be empty");
      return;
    }

    try {
      await axios.post("/api/categories", { name: newCategory, description: newDescription });
      toast.success("Category added successfully");
      setNewCategory("");
      setNewDescription("");
      fetchCategories();
    } catch (error) {
      toast.error("Failed to add category");
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete(`/api/categories/${id}`);
      toast.success("Category deleted successfully");
      fetchCategories();
    } catch (error) {
      toast.error("Failed to delete category");
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-black-900">
        <Header />
        <div className="flex-1 p-6 bg-black text-white min-h-screen">
          <h1 className="text-2xl font-bold mb-4">Manage Categories</h1>
          <div className="mb-4">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="New Category Name"
              className="p-2 text-black rounded mr-2"
            />
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Category Description"
              className="p-2 text-black rounded mr-2"
            />
            <button
              onClick={handleAddCategory}
              className="px-4 py-2 bg-green-500 rounded hover:bg-green-600"
            >
              Add Category
            </button>
          </div>
          <table className="min-w-full bg-gray-800 text-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-gray-600">Name</th>
                <th className="py-2 px-4 border-b border-gray-600">Description</th>
                <th className="py-2 px-4 border-b border-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id}>
                  <td className="py-2 px-4 border-b border-gray-600">{category.name}</td>
                  <td className="py-2 px-4 border-b border-gray-600">{category.description}</td>
                  <td className="py-2 px-4 border-b border-gray-600">
                    <button
                      onClick={() => handleDeleteCategory(category.id)}
                      className="text-red-500 hover:text-red-600 mr-2"
                    >
                      <FaTrash />
                    </button>
                    <button className="text-blue-500 hover:text-blue-600">
                      <FaEdit />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div> 
    </div>
  );
};

export default Categories;

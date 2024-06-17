"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FaTrash, FaEdit } from "react-icons/fa";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

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
    if (!newCategory.trim()) {
      toast.error("Category name cannot be empty");
      return;
    }

    try {
      await axios.post("/api/categories", { name: newCategory });
      toast.success("Category added successfully");
      setNewCategory("");
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
    <div className="p-6 bg-black text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>
      <div className="mb-4">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="New Category Name"
          className="p-2 text-black rounded mr-2"
        />
        <button
          onClick={handleAddCategory}
          className="px-4 py-2 bg-green-500 rounded hover:bg-green-600"
        >
          Add Category
        </button>
      </div>
      <ul>
        {categories.map((category) => (
          <li key={category.id} className="flex justify-between items-center mb-2">
            <span>{category.name}</span>
            <div className="flex">
              <button
                onClick={() => handleDeleteCategory(category.id)}
                className="text-red-500 hover:text-red-600 mr-2"
              >
                <FaTrash />
              </button>
              <button className="text-blue-500 hover:text-blue-600">
                <FaEdit />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;

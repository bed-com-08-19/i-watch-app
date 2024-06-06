"use client"
import { useState } from 'react';
import axios from 'axios';

const CreateProduct = () => {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/products', { name, brand, desc, price, image });
      console.log('Product created successfully', response.data);
    } catch (error) {
      console.error('Error creating product', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Product Name" required />
      <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="Brand" required />
      <textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Description" required></textarea>
      <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" required />
      <input type="file" accept="image/*" onChange={handleImageChange} required />
      <button type="submit">Create Product</button>
    </form>
  );
};

export default CreateProduct;

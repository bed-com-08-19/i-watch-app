import React from 'react';

const Card = ({ item }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h3 className="text-lg font-bold">{item.title}</h3>
      <p className="text-gray-600">{item.description}</p>
    </div>
  );
};

export default Card;

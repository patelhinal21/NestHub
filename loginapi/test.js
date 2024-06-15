import React, { useState } from 'react';
 
const ProductDetails = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
 
  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value));
  };
 
  const addToCart = () => {
    // Add product to cart with selected quantity
    console.log(`Added ${quantity} ${product.name}(s) to cart.`);
    // You can implement actual cart functionality here
  };
 
  return (
<div className="product-details">
<h2>{product.name}</h2>
<p>Price: ${product.price}</p>
<p>Description: {product.description}</p>
<div>
<label htmlFor="quantity">Quantity:</label>
<input
          type="number"
          id="quantity"
          min="1"
          value={quantity}
          onChange={handleQuantityChange}
        />
</div>
<button onClick={addToCart}>Add to Cart</button>
<div className="product-images">
        {product.images.map((image, index) => (
<img key={index} src={image} alt={`Product ${index + 1}`} />
        ))}
</div>
      {/* Additional product details can be added here */}
</div>
  );
};
 
export default ProductDetails;
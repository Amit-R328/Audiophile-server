const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    slug: { type: String, required: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    new: { type: Boolean, required: true },
    description: { type: String },
    features: { type: String },
    
    // Nested image object
    image: {
      mobile: { type: String },
      tablet: { type: String },
      desktop: { type: String }
    },
  
    // Nested categoryImage object
    categoryImage: {
      mobile: { type: String },
      tablet: { type: String },
      desktop: { type: String }
    },
  
    // Array of includes objects
    includes: [
      {
        quantity: { type: Number, required: true },
        item: { type: String, required: true }
      }
    ],
  
    // Nested gallery object with images
    gallery: {
      first: {
        mobile: { type: String },
        tablet: { type: String },
        desktop: { type: String }
      },
      second: {
        mobile: { type: String },
        tablet: { type: String },
        desktop: { type: String }
      },
      third: {
        mobile: { type: String },
        tablet: { type: String },
        desktop: { type: String }
      }
    },
  
    // Array of other products
    others: [
      {
        slug: { type: String, required: true },
        name: { type: String, required: true },
        image: {
          mobile: { type: String },
          tablet: { type: String },
          desktop: { type: String }
        }
      }
    ]
  });
  
  const Product = mongoose.model('Product', productSchema);
  module.exports = Product;
  
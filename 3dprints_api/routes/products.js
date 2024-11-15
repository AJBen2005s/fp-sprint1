const express = require('express');
const { PrismaClient } = require('@prisma/client'); // Import PrismaClient
const prisma = new PrismaClient(); // Initialize PrismaClient
const router = express.Router();

// Get all products route
router.get('/all', async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await prisma.product.findMany();
    
    // Send the list of products as JSON
    res.status(200).json(products);
  } catch (error) {
    console.error('Error retrieving products:', error);
    res.status(500).json({ error: 'An error occurred while retrieving products' });
  }
});

// Get product by ID route
router.get('/:id', async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await prisma.product.findUnique({
      where: { product_id: Number(productId) }, 
    });
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error('Error retrieving product by ID:', error);
    res.status(500).json({ error: 'An error occurred while retrieving product' });
  }
});


// Purchase route
router.post('/purchase', (req, res) => {
  // Add logic to handle product purchase
  res.status(200).send('Purchase completed');
});

module.exports = router;

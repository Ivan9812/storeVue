<template>
    <div class="cart-page">
      <h2>{{ pageTitle }}</h2>
      <ul class="cart-items">
        <li v-for="cart in carts" :key="cart.id" class="cart-item">
          <p class="cart-title">Cart ID: {{ cart.id }}</p>
          <ul>
            <li v-for="product in cart.products" :key="product.id" class="product-item">
              <img :src="product.thumbnail" alt="Product Thumbnail" class="product-thumbnail" />
              <div class="product-details">
                <p class="product-name">{{ product.title }}</p>
                <p class="product-price">Price: {{ product.price }}</p>
                <p class="product-quantity">Quantity: {{ product.quantity }}</p>
                <p class="product-total">Total: {{ product.total }}</p>
                <button @click="removeFromCart(cart.id, product.id)" class="remove-btn">Remove</button>
              </div>
            </li>
          </ul>
          <p class="cart-total">Cart Total: {{ cart.total }}</p>
          <p class="cart-discounted-total">Discounted Total: {{ cart.discountedTotal }}</p>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'CartPage',
    data() {
      return {
        pageTitle: 'Cart Page',
        carts: []
      };
    },
    created() {
      this.fetchCartData();
    },
    methods: {
      async fetchCartData() {
        try {
          const response = await axios.get('https://dummyjson.com/carts');
          this.carts = response.data.carts;
        } catch (error) {
          console.error('Error fetching cart data:', error);
        }
      },
      async removeFromCart(cartId, productId) {
  try {

    await axios.delete(`https://dummyjson.com/products/${productId}`);
    await this.fetchCartData(); 
  } catch (error) {
    console.error('Error removing product from cart:', error);
  }
}
    }
  };
  </script>
  
  <style scoped>
  .cart-page {
    padding: 20px;
  }
  
  .cart-items {
    list-style-type: none;
    padding: 0;
  }
  
  .cart-item {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 20px;
    background-color: #f9f9f9;
  }
  
  .cart-title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .product-item {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ccc;
    padding: 10px 0;
  }
  
  .product-thumbnail {
    width: 80px;
    height: 80px;
    border-radius: 5px;
    margin-right: 20px;
  }
  
  .product-details {
    flex: 1;
  }
  
  .product-name {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  .product-price,
  .product-quantity,
  .product-total {
    font-size: 16px;
    margin-bottom: 5px;
  }
  
  .remove-btn {
    background-color: #f44336;
    color: white;
    padding: 5px 10px;
    border: none;
    border-radius: 3px;
    cursor: pointer;
  }
  
  .remove-btn:hover {
    background-color: #d32f2f;
  }
  </style>
  
<template>
    <div class="products">
      <div v-for="product in products" :key="product.id" class="product-card" @click="showModal(product)">
        <img v-if="product.images && product.images.length > 0" :src="product.images[0]" alt="Product Image" class="product-image" />
        <div v-else class="no-image">Фото не загружено</div>
        <div class="product-details">
          <h3 class="product-title">{{ product.title }}</h3>
          <p class="product-price">{{ product.price }}$</p>
          <p class="product-description">{{ product.description }}</p>
        </div>
      </div>
      <div class="modal" v-if="isModalOpen">
        <div class="modal-content">
          <h2>{{ selectedProduct.title }}</h2>
          <img v-if="selectedProduct.images && selectedProduct.images.length > 0" :src="selectedProduct.images[0]" alt="Product Image" class="modal-product-image" />
          <div v-else class="no-image">Фото не загружено</div>
          <p>{{ selectedProduct.description }}</p>
          <p>{{ selectedProduct.price }}$</p>
          <div class="modal-buttons">
            <button class="buy-button" @click="addToOrdersAndCloseModal(selectedProduct)">Купить</button>
            <button class="cancel-button" @click="closeModal">Отмена</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { mapActions } from 'vuex';
  
  export default {
    name: 'ProductsPage',
    data() {
      return {
        products: [],
        isModalOpen: false,
        selectedProduct: null
      };
    },
    created() {
      this.fetchProducts();
    },
    methods: {
      async fetchProducts() {
        try {
          const response = await axios.get('https://api.escuelajs.co/api/v1/products');
          this.products = response.data;
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      },
      showModal(product) {
        this.selectedProduct = product;
        this.isModalOpen = true;
      },
      closeModal() {
        this.isModalOpen = false;
      },
      ...mapActions(['addToOrders']), 
      addToOrdersAndCloseModal(product) {
        if (this.selectedProduct.price > this.$store.state.user.balance) {
          alert('Недостаточно средств для совершения покупки');
          return;
        }
        const order = {
          product,
          totalPrice: product.price
        };
        this.addToOrders(order);
        const updatedBalance = this.$store.state.user.balance - product.price;
        const updatedUser = { ...this.$store.state.user, balance: updatedBalance };
        this.$store.dispatch('setUser', updatedUser);
        this.closeModal();
      }
    }
  };
  </script>
  <style scoped>
  .products {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin-top: 10px;
  }
  
  .product-card {
    width: 300px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    cursor: pointer;
  }
  
  .product-image {
    width: 100%;
    border-radius: 5px;
  }
  
  .no-image {
    width: 100%;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    background-color: #f0f0f0;
  }
  
  .product-title {
    font-size: 18px;
    margin-bottom: 5px;
  }
  
  .product-price {
    font-size: 16px;
    font-weight: bold;
    color: #007bff;
  }
  
  .product-description {
    font-size: 14px;
    color: #555;
  }
  
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-content[data-v-17c7826e] {
    display: flex;
    background-color: #fff;
    padding: 20px;
    flex-direction: column;
    border-radius: 10px;
    width: 40%;
    justify-content: center;
    align-items: center;
}
  
  .modal-product-image {
    width: 30%;
    border-radius: 5px;
    margin-bottom: 10px;
  }
  
  .modal-buttons {
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }
  
  .buy-button,
  .cancel-button {
    padding: 10px 20px;
    margin: 0 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .buy-button {
    background-color: #007bff;
    color: #fff;
  }
  
  .buy-button:hover {
    background-color: #0056b3;
  }
  
  .cancel-button {
    background-color: #dc3545;
    color: #fff;
  }
  
  .cancel-button:hover {
    background-color: #bd2130;
  }
  </style>
  
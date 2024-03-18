<template>
    <div class="orders-page">
      <h2>{{ pageTitle }}</h2>
      <ul class="order-list">
        <li v-for="(order, index) in orders" :key="index" class="order-item">
          <div class="product-details">
            <img v-if="order.product && order.product.images && order.product.images.length > 0" :src="order.images[0]" :alt="order.product.title" class="product-image" />
            <div class="product-info">
              <h3>{{ order.product ? order.product.title : 'No Product Title' }}</h3>
              <p>Description: {{ order.product ? order.product.description : 'No Product Description' }}</p>
              <p>Price: {{ order.product ? order.product.price : 'No Product Price' }}$</p>
            </div>
          </div>
          <button @click="cancelOrder(index)" class="cancel-btn">Cancel</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { mapState, mapMutations } from 'vuex';
  
  export default {
    name: 'OrdersPage',
    data() {
      return {
        pageTitle: 'Orders Page'
      };
    },
    computed: {
      ...mapState(['orders'])
    },
    methods: {
      ...mapMutations(['removeOrder']),
      cancelOrder(index) {
        this.removeOrder(index);
      }
    }
  };
  </script>
  
  <style scoped>
  .orders-page {
    padding: 20px;
  }
  
  .order-list {
    list-style-type: none;
    padding: 0;
  }
  
  .order-item {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 10px;
    background-color: #f9f9f9;
    display: flex;
    align-items: center;
  }
  
  .product-details {
    display: flex;
    align-items: center;
    flex: 1;
  }
  
  .product-image {
    width: 100px;
    height: 100px;
    border-radius: 5px;
    margin-right: 10px;
  }
  
  .cancel-btn {
    background-color: #f44336;
    color: white;
    padding: 5px 10px;
    border: none;
    border-radius: 3px;
    cursor: pointer;
  }
  
  .cancel-btn:hover {
    background-color: #d32f2f;
  }
  </style>
  
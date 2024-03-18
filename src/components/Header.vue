<template>
  <header class="header">
    <div class="brand">
      <router-link to="/" class="brand-link">
        <h1 class="brand-title">Online Store</h1>
      </router-link>
    </div>
    <nav class="nav">
      <router-link to="/" class="nav-link">Home</router-link>
      <router-link to="/products" class="nav-link">Products</router-link>
      <router-link to="/cart" class="nav-link">Cart</router-link>
      <router-link to="/orders" class="nav-link">Orders</router-link>
    </nav>
    <div class="user-info" v-if="user">
      <img :src="user.avatar" alt="User Avatar" class="user-avatar" />
      <div class="user-details">
        <p class="user-name">{{ user.name }}</p>
        <p class="user-balance">Balance: {{ user.balance }} $</p>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Header',
  computed: {
    ...mapGetters({
      user: 'getUser' 
    })
  }
}
</script>
<style scoped>
.header {
  background-color: #3f51b5;
  color: #ffffff;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.brand-title {
  margin: 0;
  font-size: 24px;
}

.nav {
  display: flex;
  flex-direction: row;
  gap: 20px; 
}

.brand-link,
.nav-link,
.user-info {
  display: flex;
  align-items: center;
}

.brand-link,
.nav-link {
  color: #ffffff;
  text-decoration: none;
  font-size: 18px;
}

.brand-link:hover,
.nav-link:hover {
  text-decoration: underline;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.user-name {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
}

.user-balance {
  font-size: 14px;
}
</style>
<template>
  <div class="home">
    <div class="searchUser">
      <div class="input-wrapper">
        <input type="text" v-model="userId" placeholder="Enter User ID" class="user-input" />
        <button @click="loadUserData" class="btn load-btn">Load User Data</button>
      </div>
    </div>
    <div v-if="userDataLoaded" class="user-data">
      <img :src="userData.avatar" alt="User Avatar" class="user-avatar" />
      <p class="user-name">Name: {{ userData.name }}</p>
      <p class="user-balance">Balance: {{ userData.balance }}$</p>
      <div v-if="editBalanceMode" class="edit-balance-container">
        <input type="number" v-model="editedBalance" placeholder="Edit Balance" class="edit-balance" />
        <button @click="saveEditedBalance" class="btn add-balance-btn">Save Balance</button>
      </div>
      <div v-else>
        <button @click="editBalanceMode = true" class="btn edit-balance-btn">Edit Balance</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import axios from 'axios';

export default {
  name: 'HomePage',
  data() {
    return {
      userId: '',
      userDataLoaded: false,
      editedBalance: null,
      editBalanceMode: false
    };
  },
  computed: {
    userData() {
      return this.$store.state.user;
    }
  },
  methods: {
    ...mapActions(['setUser']),
    async loadUserData() {
      try {
        if (!this.userId.trim()) {
          
          return;
        }
        const response = await axios.get(`https://api.escuelajs.co/api/v1/users/${this.userId}`);
        this.$store.dispatch('setUser', response.data); 
        this.userDataLoaded = true;
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    },
    async saveEditedBalance() {
      try {
        const updatedUserData = { ...this.userData, balance: parseFloat(this.editedBalance) };
        await axios.put(`https://api.escuelajs.co/api/v1/users/${this.userId}`, updatedUserData);
        this.$store.dispatch('setUser', updatedUserData);
        this.editBalanceMode = false;
      } catch (error) {
        console.error('Error saving edited balance:', error);
      }
    }
  }
}
</script>

<style scoped>
.home {
  display:flex;
  gap: 80px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  text-align: center;
  margin-top: 20px;
}

.user-input {
  padding: 5px;
  border: 1px solid #2d4059;
  border-radius: 5px;
}

.searchUser{
  display: flex;
  flex-direction: column;
  row-gap: 10px;
}

.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.load-btn,
.edit-balance-btn,
.add-balance-btn {
  background-color: #4ecca3;
  color: #ffffff;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.user-data {
  margin-top: 20px;
  flex-direction: column;
}

.user-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.user-name {
  font-size: 20px;
  font-weight: bold;
  margin-top: 10px;
}

.user-balance {
  font-size: 18px;
  color: #4ecca3;
  margin-top: 5px;
}

.edit-balance-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.edit-balance {
  padding: 5px;
  border: 1px solid #2d4059;
  border-radius: 5px;
}
</style>

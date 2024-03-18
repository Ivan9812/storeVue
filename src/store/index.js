import { createStore } from 'vuex';

const userFromStorage = JSON.parse(localStorage.getItem('user'));

export default createStore({
  state: {
    user: userFromStorage || null,
    cart: [],
    orders: []
  },
  mutations: {
    setUser(state, userData) {
      state.user = userData;
      localStorage.setItem('user', JSON.stringify(userData)); 
    },
    addToOrders(state, order) {
      state.orders.push(order);
    }
  },
  actions: {
    setUser({ commit }, userData) {
      commit('setUser', userData);
    },
    addToOrders({ commit }, order) {
      commit('addToOrders', order);
      
      console.log(order)
    }
  },
  getters: {
    getUser: state => state.user,
    getOrders: state => state.orders
  }
});


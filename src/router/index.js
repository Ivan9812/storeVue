import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';
import ProductsPage from '../components/ProductsPage.vue';
import CartPage from '../components/CartPage.vue';
import OrdersPage from '../components/OrdersPage.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/products', component: ProductsPage },
  { path: '/cart', component: CartPage },
  { path: '/orders', component: OrdersPage }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

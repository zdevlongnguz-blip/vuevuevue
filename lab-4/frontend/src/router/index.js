import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ProductsView from '../views/ProductsView.vue';
import Lab4View from '../views/Lab4.vue';

const routes = [
  { path: '/products', name: 'products', component: ProductsView },
  { path: '/', name: 'lab4', component: Lab4View }
];

export default createRouter({
  history: createWebHistory(),
  routes,
});

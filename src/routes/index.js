import { createRouter, createWebHistory } from 'vue-router';
import QueryForm from '../views/QueryForm.vue';
import Currencies from '../views/Currencies.vue';

const routes = [
  { path: '/', component: QueryForm },
  { path: '/currencies', component: Currencies },
];

const router = createRouter({
  history: createWebHistory(),
  routes, 
});


export default router;
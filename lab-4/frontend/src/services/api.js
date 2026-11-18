import axios from 'axios';

// Mọi request đều đi qua /api (Vite proxy sang Express)
const http = axios.create({ baseURL: '/api' });

// Bộ hàm CRUD dùng chung: api.getAll('products'), api.create('products', {...}) ...
export default {
  getAll: (resource, params) => http.get(`/${resource}`, { params }).then((r) => r.data),
  getById: (resource, id) => http.get(`/${resource}/${id}`).then((r) => r.data),
  create: (resource, data) => http.post(`/${resource}`, data).then((r) => r.data),
  update: (resource, id, data) => http.put(`/${resource}/${id}`, data).then((r) => r.data),
  patch: (resource, id, data) => http.patch(`/${resource}/${id}`, data).then((r) => r.data),
  remove: (resource, id) => http.delete(`/${resource}/${id}`).then((r) => r.data),
};

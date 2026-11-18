<template>
  <h2 class="mb-3">Sản phẩm</h2>

  <!-- Form thêm / sửa -->
  <form class="row g-2 mb-4" @submit.prevent="save">
    <div class="col-md-5">
      <input v-model="form.name" class="form-control" placeholder="Tên sản phẩm" required />
    </div>
    <div class="col-md-3">
      <input v-model.number="form.price" type="number" class="form-control" placeholder="Giá" required />
    </div>
    <div class="col-md-4">
      <button class="btn btn-success me-2">{{ editingId ? 'Cập nhật' : 'Thêm' }}</button>
      <button v-if="editingId" type="button" class="btn btn-secondary" @click="reset">Hủy</button>
    </div>
  </form>

  <!-- Danh sách -->
  <table class="table table-bordered table-hover align-middle">
    <thead class="table-dark">
      <tr><th>ID</th><th>Tên</th><th>Giá</th><th width="160">Thao tác</th></tr>
    </thead>
    <tbody>
      <tr v-for="p in products" :key="p.id">
        <td>{{ p.id }}</td>
        <td>{{ p.name }}</td>
        <td>{{ p.price.toLocaleString('vi-VN') }} đ</td>
        <td>
          <button class="btn btn-sm btn-warning me-2" @click="edit(p)">Sửa</button>
          <button class="btn btn-sm btn-danger" @click="del(p.id)">Xóa</button>
        </td>
      </tr>
      <tr v-if="!products.length">
        <td colspan="4" class="text-center text-muted">Chưa có dữ liệu</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../services/api';

const RESOURCE = 'products';
const products = ref([]);
const form = ref({ name: '', price: null });
const editingId = ref(null);

const load = async () => (products.value = await api.getAll(RESOURCE));

const save = async () => {
  if (editingId.value) await api.update(RESOURCE, editingId.value, form.value);
  else await api.create(RESOURCE, form.value);
  reset();
  load();
};

const edit = (p) => {
  editingId.value = p.id;
  form.value = { name: p.name, price: p.price };
};

const del = async (id) => {
  if (!confirm('Xóa sản phẩm này?')) return;
  await api.remove(RESOURCE, id);
  load();
};

const reset = () => {
  editingId.value = null;
  form.value = { name: '', price: null };
};

onMounted(load);
</script>

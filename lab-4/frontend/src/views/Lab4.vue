<template>
    <h2 class="mb-3">Quản lý sách</h2>

    <!-- Form thêm / sửa
         - @keydown.enter.prevent: chặn submit mặc định của trình duyệt khi nhấn Enter
         - @keyup.enter="save": nhấn Enter ở bất kỳ ô nào (kể cả select) sẽ lưu
         - Click nút "Thêm/Cập nhật" vẫn đi qua @submit -->
    <form class="row g-3 mb-4 align-items-start" novalidate @submit.prevent="save" @keydown.enter.prevent
        @keyup.enter="save">
        <div class="col-md-4">
            <input ref="nameInput" v-model.trim="form.name" class="form-control"
                :class="{ 'is-invalid': errorValids.name }" placeholder="Tên sách" />
            <div class="invalid-feedback">{{ errorValids.name }}</div>
        </div>

        <div class="col-md-3">
            <input v-model.trim="form.author" class="form-control" :class="{ 'is-invalid': errorValids.author }"
                placeholder="Tác giả" />
            <div class="invalid-feedback">{{ errorValids.author }}</div>
        </div>

        <div class="col-md-3">
            <select v-model="form.category" class="form-select" :class="{ 'is-invalid': errorValids.category }">
                <option value="">Chọn thể loại</option>
                <option v-for="(label, value) in CATEGORIES" :key="value" :value="value">{{ label }}</option>
            </select>
            <div class="invalid-feedback">{{ errorValids.category }}</div>
        </div>

        <div class="col-md-2 d-flex gap-2">
            <button type="submit" class="btn flex-fill" :class="editingId ? 'btn-warning' : 'btn-success'"
                :disabled="loading">
                <span v-if="loading" class="spinner-border spinner-border-sm me-1"></span>
                {{ loading ? 'Đang lưu...' : editingId ? 'Cập nhật' : 'Thêm' }}
            </button>
            <button v-if="editingId" type="button" class="btn btn-secondary" @click="reset">Hủy</button>
        </div>
    </form>

    <div v-if="message.text" class="alert py-2" :class="`alert-${message.type}`">{{ message.text }}</div>

    <!-- Danh sách -->
    <table class="table table-bordered table-hover align-middle">
        <thead class="table-dark">
            <tr>
                <th width="70">ID</th>
                <th>Tên sách</th>
                <th>Tác giả</th>
                <th>Thể loại</th>
                <th width="150">Thao tác</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="b in books" :key="b.id" :class="{ 'table-warning': b.id === editingId }">
                <td>{{ b.id }}</td>
                <td>{{ b.name }}</td>
                <td>{{ b.author }}</td>
                <td>{{ CATEGORIES[b.category] || b.category }}</td>
                <td>
                    <button class="btn btn-sm btn-warning me-2" @click="edit(b)">Sửa</button>
                    <button class="btn btn-sm btn-danger" @click="del(b)">Xóa</button>
                </td>
            </tr>
            <tr v-if="!books.length">
                <td colspan="5" class="text-center text-muted">Chưa có dữ liệu</td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import api from '../services/api';

const RESOURCE = 'books';
const CATEGORIES = { fiction: 'Tiểu thuyết', 'non-fiction': 'Phi tiểu thuyết' };
const emptyForm = () => ({ name: '', author: '', category: '' });

const books = ref([]);
const form = ref(emptyForm());
const editingId = ref(null);
const errorValids = ref(emptyForm());
const loading = ref(false);
const message = ref({ type: '', text: '' });
const nameInput = ref(null);

const notify = (type, text) => {
    message.value = { type, text };
    setTimeout(() => (message.value = { type: '', text: '' }), 2500);
};

const load = async () => {
    try {
        books.value = await api.getAll(RESOURCE);
    } catch (error) {
        console.error(error);
        notify('danger', 'Không tải được danh sách sách');
    }
};

const validateForm = () => {
    errorValids.value = emptyForm();
    if (!form.value.name) errorValids.value.name = 'Tên sách không được để trống';
    if (!form.value.author) errorValids.value.author = 'Tác giả không được để trống';
    if (!form.value.category) errorValids.value.category = 'Thể loại không được để trống';
    return !Object.values(errorValids.value).some(Boolean);
};

const save = async () => {
    if (loading.value) return; // chống lưu 2 lần
    if (!validateForm()) return;

    loading.value = true;
    try {
        if (editingId.value) {
            if (!confirm(`Lưu thay đổi cho sách "${form.value.name}"?`)) return;
            await api.update(RESOURCE, editingId.value, form.value);
            notify('success', 'Cập nhật thành công');
        } else {
            await api.create(RESOURCE, form.value);
            notify('success', 'Thêm sách thành công');
        }
        reset();
        await load();
    } catch (error) {
        console.error(error);
        notify('danger', 'Lưu thất bại');
    } finally {
        loading.value = false;
    }
};

const edit = async (book) => {
    editingId.value = book.id;
    form.value = { name: book.name, author: book.author, category: book.category };
    errorValids.value = emptyForm();
    await nextTick();
    nameInput.value?.focus();
};

const del = async (book) => {
    if (!confirm(`Bạn chắc chắn muốn xóa sách "${book.name}"?`)) return;
    try {
        await api.remove(RESOURCE, book.id);
        if (editingId.value === book.id) reset();
        notify('success', 'Đã xóa sách');
        await load();
    } catch (error) {
        console.error(error);
        notify('danger', 'Xóa thất bại');
    }
};

const reset = () => {
    form.value = emptyForm();
    editingId.value = null;
    errorValids.value = emptyForm();
};

onMounted(load);
</script>

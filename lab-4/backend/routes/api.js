import { Router } from 'express';
import axios from 'axios';

const router = Router();

// json-server chạy ở cổng 3001, đóng vai trò DB
const DB = 'http://localhost:3001';

// Bộ CRUD dùng chung cho mọi bảng trong db.json
// Ví dụ: /api/products, /api/categories ...

// Lấy danh sách (hỗ trợ query của json-server: ?_page=1&_limit=10&q=abc)
router.get('/:resource', async (req, res) => {
  try {
    const { data } = await axios.get(`${DB}/${req.params.resource}`, { params: req.query });
    res.json(data);
  } catch (err) {
    handleError(res, err);
  }
});

// Lấy 1 bản ghi
router.get('/:resource/:id', async (req, res) => {
  try {
    const { data } = await axios.get(`${DB}/${req.params.resource}/${req.params.id}`);
    res.json(data);
  } catch (err) {
    handleError(res, err);
  }
});

// Thêm mới
router.post('/:resource', async (req, res) => {
  try {
    const { data } = await axios.post(`${DB}/${req.params.resource}`, req.body);
    res.status(201).json(data);
  } catch (err) {
    handleError(res, err);
  }
});

// Cập nhật toàn bộ
router.put('/:resource/:id', async (req, res) => {
  try {
    const { data } = await axios.put(`${DB}/${req.params.resource}/${req.params.id}`, req.body);
    res.json(data);
  } catch (err) {
    handleError(res, err);
  }
});

// Cập nhật một phần
router.patch('/:resource/:id', async (req, res) => {
  try {
    const { data } = await axios.patch(`${DB}/${req.params.resource}/${req.params.id}`, req.body);
    res.json(data);
  } catch (err) {
    handleError(res, err);
  }
});

// Xóa
router.delete('/:resource/:id', async (req, res) => {
  try {
    await axios.delete(`${DB}/${req.params.resource}/${req.params.id}`);
    res.json({ message: 'Đã xóa' });
  } catch (err) {
    handleError(res, err);
  }
});

function handleError(res, err) {
  const status = err.response?.status || 500;
  res.status(status).json({ message: status === 404 ? 'Không tìm thấy' : 'Lỗi server' });
}

export default router;

import express from 'express';
import cors from 'cors';
import apiRouter from './routes/api.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Mọi route API đều có tiền tố /api
app.use('/api', apiRouter);

app.get('/', (req, res) => res.send('API server đang chạy. Dùng /api/...'));

// 404 cho route không tồn tại
app.use((req, res) => res.status(404).json({ message: 'Không tìm thấy route' }));

app.listen(PORT, () => console.log(`API: http://localhost:${PORT}/api`));

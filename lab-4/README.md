# My App — Vue (FE) + Express + json-server (BE)

## Chạy dự án
```bash
npm run install:all   # cài package cho root, backend, frontend (chạy 1 lần)
npm run dev                   # chạy cả DB + API + FE
```

| Thành phần | Địa chỉ |
|---|---|
| FE (Vue/Vite) | http://localhost:5173 |
| API (Express) | http://localhost:3000/api |
| DB (json-server) | http://localhost:3001 |

## Cấu trúc
```
my-app/
├─ package.json            # script "dev" chạy cả 3 bằng concurrently
├─ backend/
│  ├─ server.js            # Express, gắn router vào /api
│  ├─ routes/api.js        # bộ CRUD dùng chung cho mọi bảng
│  └─ db.json              # dữ liệu json-server
└─ frontend/
   ├─ vite.config.js       # proxy /api -> localhost:3000
   └─ src/
      ├─ main.js           # import Bootstrap + router
      ├─ App.vue           # layout: header / main / footer
      ├─ router/index.js
      ├─ services/api.js   # axios + hàm CRUD
      ├─ components/       # AppHeader, AppFooter
      └─ views/            # HomeView, ProductsView (demo CRUD)
```

## API (dùng cho mọi bảng trong db.json)
| Method | URL | Chức năng |
|---|---|---|
| GET | /api/:resource | Danh sách (hỗ trợ `?_page=1&_limit=10&q=...`) |
| GET | /api/:resource/:id | Chi tiết |
| POST | /api/:resource | Thêm |
| PUT | /api/:resource/:id | Sửa toàn bộ |
| PATCH | /api/:resource/:id | Sửa một phần |
| DELETE | /api/:resource/:id | Xóa |

Thêm bảng mới: chỉ cần thêm key vào `db.json` (ví dụ `"orders": []`), rồi gọi `/api/orders`.

## Gọi từ Vue
```js
import api from '@/services/api' // hoặc '../services/api'
const list = await api.getAll('products')
await api.create('products', { name: 'A', price: 1000 })
await api.update('products', 1, { name: 'B', price: 2000 })
await api.remove('products', 1)
```

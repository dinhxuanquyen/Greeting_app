# 🚀 Hướng dẫn nhanh - Stacks Message Board

## ✅ Kiểm tra dự án

Dự án đã được thiết lập thành công với:

- ✅ Smart contract `message-board.clar` hoạt động
- ✅ Tests đã pass (7/7 tests thành công)
- ✅ Frontend React sẵn sàng
- ✅ Cấu hình Clarinet hoàn chỉnh

## 🎯 Bước tiếp theo

### 1. Deploy smart contract lên testnet

1. Cài đặt **Leather Wallet** từ [leather.io](https://leather.io)
2. Chuyển sang **Testnet** trong cài đặt ví
3. Lấy testnet STX tokens từ [Stacks Testnet Faucet](https://explorer.stacks.co/sandbox/faucet)
4. Deploy contract tại [Stacks Explorer Sandbox](https://explorer.stacks.co/sandbox/deploy)
5. Copy nội dung file `contracts/message-board.clar` và deploy

### 2. Cập nhật địa chỉ contract

Sau khi deploy, cập nhật file `frontend/src/App.tsx`:

```typescript
const CONTRACT_ADDRESS = "YOUR_CONTRACT_ADDRESS_HERE"; // Thay bằng địa chỉ thực
const CONTRACT_NAME = "message-board"; // Thay bằng tên contract thực
```

### 3. Chạy frontend

```bash
cd frontend
npm install
npm run dev
```

Truy cập http://localhost:5173

## 🧪 Chạy tests

```bash
npm test
```

## 📁 Cấu trúc dự án

```
message-board/
├── contracts/message-board.clar    # Smart contract
├── tests/message-board.test.ts     # Unit tests  
├── frontend/                       # React app
├── Clarinet.toml                   # Cấu hình Clarinet
└── README.md                       # Hướng dẫn chi tiết
```

## 🎉 Chúc mừng!

Bạn đã có một ứng dụng Stacks hoàn chỉnh với:
- Smart contract an toàn và đã test
- Frontend đẹp và responsive
- Tích hợp ví Stacks
- Hướng dẫn chi tiết

Hãy bắt đầu deploy và thử nghiệm! 
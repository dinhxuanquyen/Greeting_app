# 💌 Greeting App On-Chain

## 📜 Project Description

This project is a decentralized, on-chain implementation of a **Greeting Application**, built using the Clarity smart contract language and deployed on the **Stacks Testnet**. The smart contract enables users to send personalized greetings to other wallet addresses in a fully trustless and transparent environment, where every greeting, email registration, and interaction is verifiable on the blockchain.

The contract handles user registration, greeting creation, message storage, and read status tracking — all without any centralized server.

---

## 🔭 Project Vision

The vision behind this project is to **demonstrate the capabilities of decentralized social applications** on the Stacks blockchain. By building a greeting application with real user interactions and persistent data storage, we aim to:

* Showcase the potential of Clarity smart contracts for social and communication applications.
* Encourage developers and users to explore on-chain social mechanics.
* Establish a foundation for more advanced and feature-rich blockchain-based social experiences.

---

## ⭐ Key Features

* ✅ **Send Greetings:** Users can send personalized greeting messages to other wallet addresses.
* 📧 **Email Registration:** Users can register their email addresses for future notifications.
* 🎯 **Input Validation:** Ensures valid receiver addresses and message content validation.
* 📝 **Message Storage:** All greetings are stored on-chain with sender, receiver, timestamp, and read status.
* 🏆 **Read Status Tracking:** Automatically tracks which greetings have been read by recipients.
* 💰 **No Transaction Fees:** Simple greeting messages without additional token transfers.
* 🔐 **On-chain Logic:** Entire greeting logic (user data, message storage, and status tracking) is stored and computed on-chain.

---

## 🚀 Future Scope

* 🧩 **Game UI Integration:** Build a front-end interface (e.g., React + Stacks.js) for users to send greetings easily.
* 💬 **Message History & Chat:** Add metadata or logging features to track past greetings and enable user interactions.
* 🪙 **NFT Greeting Cards:** Mint NFTs as proof of special greetings or participation using the Clarity NFT standards (SIP-009).
* 👾 **Greeting Templates:** Introduce pre-made greeting templates for different occasions.
* 🧪 **Unit Testing & Auditing:** Add test coverage and run audits for security and consistency.
* 🌍 **Social Features:** Allow users to follow each other and create social networks via smart contract mechanisms.
* ⏰ **Scheduled Greetings:** Implement time-delayed greeting sending functionality.
* 💰 **STX Integration:** Add optional STX token transfers with greetings for special occasions.

## Contract Details
Deployed contract address: `ST26VVBEQPNDC7DJ3Z1NA57GNYBQCMEX7C5C2DXYY.greeting-app`

## 🏗️ Project Architecture

```
greeting-app/
├── contracts/
│   └── greeting-app.clar          # Main smart contract
├── frontend/
│   ├── src/
│   │   ├── App.tsx               # Main component
│   │   ├── App.css               # Styling
│   │   └── config.ts             # Configuration
│   └── package.json
├── backend/                       # Backend for email notifications
├── Clarinet.toml                 # Clarinet configuration
└── README.md
```

## 🚀 Installation and Setup

### 1. Clone project
```bash
git clone https://github.com/dinhxuanquyen/Greeting_app.git
cd Greeting_app
```

### 2. Install dependencies
```bash
# Frontend
cd frontend
npm install

# Backend (optional)
cd ../backend
npm install
```

### 3. Deploy smart contract
See detailed guide in [DEPLOY_GREETING_APP.md](./DEPLOY_GREETING_APP.md)

### 4. Update configuration
Edit `frontend/src/config.ts`:
```typescript
export const CONFIG = {
    WALLET_ADDRESS: "YOUR_WALLET_ADDRESS",
    CONTRACT_ADDRESS: "YOUR_CONTRACT_ADDRESS",
    CONTRACT_NAME: "greeting-app",
    // ...
};
```

### 5. Run application
```bash
cd frontend
npm run dev
```

## 📱 How to Use

### 1. Connect wallet
- Open application in browser
- Click "🔗 Connect Wallet"
- Confirm in Leather Wallet

### 2. Register email (optional)
- Click "📧 Register Email"
- Enter your email
- Confirm transaction

### 3. Send greeting
- Enter receiver wallet address (ST...)
- Write your greeting message
- Click "💌 Send Greeting"
- Confirm transaction

### 4. View greetings
- Click "🔄 Refresh" to see list
- Greetings will display with detailed information

## 🔧 Smart Contract

### Main functions
```clarity
;; Send greeting
(define-public (send-greeting (receiver principal) (message (string-utf8 500)))

;; Register email
(define-public (register-email (email (string-utf8 100)))

;; Mark as read
(define-public (mark-as-read (greeting-id uint)))

;; Get user greetings
(define-read-only (get-user-greetings (user principal)))
```

### Data structures
```clarity
;; Map to store greetings
(define-map greetings uint (tuple
    (sender principal)
    (receiver principal)
    (message (string-utf8 500))
    (timestamp uint)
    (read bool)
))

;; Map to store user emails
(define-map user-emails principal (string-utf8 100))
```

## 🛠️ Technologies Used

### Frontend
- **React 18** with TypeScript
- **Vite** for build tool
- **@stacks/connect** for wallet connection
- **@stacks/transactions** for blockchain interaction

### Smart Contract
- **Clarity** language
- **Stacks Blockchain**
- **Clarinet** development environment

### Backend (optional)
- **Node.js** with Express
- **Nodemailer** for email notifications
- **node-cron** for scheduled tasks

## 🔒 Security

- ✅ **Wallet connection**: Using secure Leather Wallet
- ✅ **Input validation**: Check input data
- ✅ **Error handling**: Comprehensive error handling
- ✅ **Transaction confirmation**: Confirm transactions

## 🧪 Testing

### Test smart contract
```bash
clarinet test
```

### Test frontend
```bash
cd frontend
npm test
```

## 📊 Monitoring

### Explorer
- View contract: https://explorer.stacks.co/sandbox
- View transactions: https://explorer.stacks.co/sandbox/transactions

### Logs
- Frontend logs: Browser console
- Contract logs: Clarinet console

## 🚀 Deployment

### Testnet
- Deploy contract on Stacks Testnet
- Use Stacks Explorer Sandbox
- Test with STX testnet tokens

### Mainnet (future)
- Deploy contract on Stacks Mainnet
- Use real STX
- Production environment

## 🤝 Contributing

1. Fork the project
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Create Pull Request

## 📝 License

This project is released under MIT License.

## 📞 Contact

- **Email**: [dinhxuanquyen324@gmail.com]
- **GitHub**: [https://github.com/dinhxuanquyen]

## 🙏 Acknowledgments

- **Stacks Foundation** for blockchain platform
- **Leather Wallet** for wallet integration
- **Clarinet** for development tools
- **React Community** for frontend framework

---

**Note**: This is a demo project. Do not use for production without thorough testing. 
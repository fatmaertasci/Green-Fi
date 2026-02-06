# Green-Fi: Carbon Offset Protocol

Green-Fi is a decentralized application (dApp) for carbon offset tracking, built on the Stellar Futurenet. Users can donate XLM to carbon offsetting initiatives and earn verified on-chain certificates based on their contribution.

![Green-Fi Screenshot](frontend/public/screenshot.png)

## 🌟 Features

- **Smart Contract Logic**: Soroban (Rust) based - handles donations, tracks user impact, awards certificates
- **Secure Fund Management**: Funds held in contract, admin-only withdrawals
- **Premium Cyber-UI**: Dark theme with emerald accents, glassmorphism design
- **Freighter Wallet Integration**: Seamless authentication and transaction signing
- **Real-time Impact Dashboard**: Live donation tracking and certificate status

## 🛠 Tech Stack

### Backend (Smart Contract)
| Component | Technology |
|-----------|------------|
| Language | Rust |
| Framework | Soroban SDK 20.0.0 |
| Network | Stellar Futurenet |

**Key Functions:**
- `initialize(admin)` - Set contract admin
- `donate(token, donor, amount)` - Process donations
- `get_certificate(user)` - Returns "Gold", "Standard", or "None"
- `withdraw(token, amount, to)` - Admin-only fund withdrawal

### Frontend (User Interface)
| Component | Technology |
|-----------|------------|
| Framework | Next.js 16 (App Router + Turbopack) |
| Styling | Tailwind CSS v4 |
| Blockchain | stellar-sdk, @stellar/freighter-api |

**Key Components:**
- `WalletConnect` - Freighter wallet integration
- `DonationForm` - Transfer interface with validation
- `ImpactDashboard` - Real-time stats and certificate display

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- Rust & Cargo (latest stable)
- Soroban CLI: `cargo install --locked soroban-cli`
- [Freighter Wallet](https://www.freighter.app/) browser extension

### Backend Setup
```bash
cd backend
cargo build --target wasm32-unknown-unknown --release

# Deploy to Futurenet
soroban contract deploy \
    --wasm target/wasm32-unknown-unknown/release/green_fi.wasm \
    --source <YOUR_SECRET_KEY> \
    --network futurenet
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📖 Usage

1. **Connect Wallet**: Click "Connect Wallet" → Approve in Freighter
2. **Make Donation**: Enter amount (min 1 XLM) → Click "CONFIRM TRANSACTION"
3. **View Impact**: Check your certificate status in the dashboard
   - **Standard**: Any donation > 0
   - **Gold**: Total donations ≥ 100 XLM

## 🏆 Certificate Tiers

| Tier | Threshold | Badge |
|------|-----------|-------|
| None | 0 XLM | - |
| Standard | > 0 XLM | ✓ |
| Gold | ≥ 100 XLM | ⭐ |

## 📁 Project Structure

```
green-fi/
├── backend/
│   ├── Cargo.toml
│   └── src/
│       ├── lib.rs      # Smart contract
│       └── test.rs     # Unit tests
├── frontend/
│   ├── app/
│   │   ├── globals.css # Tailwind v4 styles
│   │   ├── layout.tsx
│   │   └── page.tsx    # Main page
│   ├── components/
│   │   ├── DonationForm.tsx
│   │   ├── ImpactDashboard.tsx
│   │   └── WalletConnect.tsx
│   └── public/
│       └── logo.png
└── README.md
```

## 📄 License

Open-source under the Green-Fi License.

# Order Book

Real-time crypto order book depth for BTC, ETH, XRP, LTC, and DOGE. Live top-of-book bid/ask prices, spread, daily stats, order depth ladder, and subreddit news — all in a single-page UI.

**Live:** [order-book-one.vercel.app](https://order-book-one.vercel.app)

---

## Stack

| Layer     | Technology                               |
| --------- | ---------------------------------------- |
| Framework | Next.js 16 (App Router)                  |
| Language  | TypeScript 5                             |
| API       | tRPC v11 + React Query v5                |
| Database  | PostgreSQL via Prisma 5                  |
| Styling   | Tailwind CSS + shadcn/ui                 |
| Live data | WebSocket (custom Node.js server)        |
| Hosting   | Vercel (app) + separate Node server (WS) |

---

## Features

-   **Live order book** — best bid, best ask, spread, and a 5-level depth ladder per pair
-   **Daily stats** — max/min bid and ask since midnight, snapshot count
-   **Coin detail panel** — click any row to drill into a coin with full stats and news
-   **News** — latest posts from each coin's subreddit (Reddit public JSON, no API key)
-   **Light / dark theme** — toggle persisted in `localStorage`, defaults to light
-   **Auto-cleanup cron** — Vercel cron deletes DB records older than 7 days daily at 02:00 UTC
-   **PWA-ready** — manifest, generated favicon, OG image, full SEO metadata

---

## Project Structure

```
crypto-order-book/          # Next.js app (this repo)
crypto-websocket-server/    # Companion Node.js WebSocket server
```

Both repos need to be running for the full experience. The WebSocket server simulates realistic order book data for all five pairs and broadcasts every 500 ms.

---

## Getting Started

### Prerequisites

-   Node.js 20+
-   PostgreSQL database (local or hosted — [Neon](https://neon.tech) free tier works)

### 1. Clone

```bash
git clone https://github.com/thenameisajay/order-book.git
cd order-book
```

### 2. Environment

```bash
cp .env.example .env
```

Edit `.env`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/orderbook"
CRON_SECRET="your-random-secret"   # used to authenticate the Vercel cron endpoint
```

### 3. Install & migrate

```bash
npm install
npx prisma db push
```

### 4. Start the WebSocket server

```bash
cd ../crypto-websocket-server
npm install
node server.js
```

The WS server listens on `ws://localhost:8080` by default.

### 5. Start the app

```bash
cd ../order-book
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## WebSocket Server

The companion server ([crypto-websocket-server](https://github.com/thenameisajay/crypto-websocket-server)) generates realistic synthetic order book data:

-   Per-coin config: spread fraction, tick size, quantity range, volatility
-   Percentage-based depth levels (no negative prices)
-   Unix second timestamps
-   Broadcasts all 5 pairs simultaneously every 500 ms

---

## Database Cleanup

The `/api/cleanup` route deletes `OrderBookData` records older than 7 days. It runs automatically via Vercel Cron (`0 2 * * *`). In production the route requires `Authorization: Bearer <CRON_SECRET>`.

To trigger manually:

```bash
curl -H "Authorization: Bearer your-secret" https://your-app.vercel.app/api/cleanup
```

---

## Scripts

```bash
npm run dev          # start dev server (Turbopack)
npm run build        # production build
npm run lint         # ESLint
npm run check-types  # TypeScript type check
npm run format       # Prettier
npm run db:studio    # Prisma Studio
```

---

## Contributing

1. Fork the repo
2. Create a branch: `git checkout -b feature/your-feature`
3. Commit your changes
4. Push and open a pull request against `dev`

---

## License

MIT — see [LICENSE](LICENSE).

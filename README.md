Project Overview

This project is designed to demonstrate real-time data streaming and REST API operations in a stock trading scenario. Users can:

View a list of stocks

Get live stock price updates every second

Buy and sell stocks using a simulated balance

Track portfolio and available balance

The API is beginner-friendly and can later be extended with user authentication and real stock data.

Features

REST endpoints for fetching stocks, portfolio, and executing trades

WebSocket server for live stock price updates

In-memory database for storing user data and stock information

Fully commented TypeScript code

Simulated stock price changes

Tech Stack
Layer	Technology
Backend	Node.js + Express
Real-time	Socket.io
Language	TypeScript
Data Storage	In-memory (temporary)
Tools	Nodemon, ts-node, dotenv, CORS
Setup & Installation

Clone the repository

git clone <your-repo-url>
cd stock-trading-api

Install dependencies

npm install

Start the development server

npm run dev

Server will run on http://localhost:3000.

API Endpoints
1️⃣ Get Stocks
GET /stocks

Response:

[
  { "symbol": "AAPL", "name": "Apple", "price": 150 },
  { "symbol": "GOOGL", "name": "Alphabet", "price": 2800 },
  { "symbol": "TSLA", "name": "Tesla", "price": 700 }
]
2️⃣ Get Portfolio
GET /portfolio

Response:

{
  "portfolio": { "AAPL": 5, "TSLA": 2 },
  "balance": 9000
}
3️⃣ Buy Stock
POST /buy

Body:

{
  "symbol": "AAPL",
  "quantity": 5
}

Response:

{
  "portfolio": { "AAPL": 5 },
  "balance": 9250
}
4️⃣ Sell Stock
POST /sell

Body:

{
  "symbol": "AAPL",
  "quantity": 2
}

Response:

{
  "portfolio": { "AAPL": 3 },
  "balance": 9500
}
WebSocket Real-time Updates

Server: http://localhost:3000

Event: stockUpdate

Payload:

[
  { "symbol": "AAPL", "name": "Apple", "price": 151.12 },
  { "symbol": "GOOGL", "name": "Alphabet", "price": 2801.45 },
  { "symbol": "TSLA", "name": "Tesla", "price": 702.33 }
]

Client Example (JS):

import { io } from "socket.io-client";

const socket = io("http://localhost:3000");
socket.on("stockUpdate", (stocks) => {
  console.log("Live Stocks:", stocks);
});
How It Works

Stocks:
The stocks array in data.ts stores current stock prices. Prices are randomly updated every second to simulate market changes.

Portfolio:
Each user has a portfolio and balance. Buying decreases balance and increases stock quantity. Selling does the opposite.

REST API:
Endpoints allow fetching stocks, portfolio, and trading actions (buy/sell).

WebSocket:
Clients connect via Socket.io and receive stock updates every second. This allows real-time dashboards for users.

In-Memory Database:
Currently, all data is stored in memory for simplicity. On server restart, data resets. Later, it can be replaced with PostgreSQL or MongoDB.

Future Enhancements

Add user authentication (JWT login/register)

Integrate real stock market API (Alpha Vantage, Finnhub)

Use database to persist user portfolio and trades

Build React frontend for live dashboard

Add order matching engine for realistic trading
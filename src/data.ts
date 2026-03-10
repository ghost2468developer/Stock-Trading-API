import { Stock, User } from "./types"

// Fake stock data (initial prices)
export let stocks: Stock[] = [
  { symbol: "AAPL", name: "Apple", price: 150 },
  { symbol: "GOOGL", name: "Alphabet", price: 2800 },
  { symbol: "TSLA", name: "Tesla", price: 700 }
]

// Fake user data
export let users: User[] = [
  {
    id: "user1",
    name: "Kenneth",
    portfolio: {},
    balance: 10000
  }
]
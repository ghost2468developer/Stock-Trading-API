import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"
import cors from "cors"
import { stocks, users } from "./data"
import { Stock, User } from "./types"

const app = express()
app.use(cors())
app.use(express.json())

const httpServer = createServer(app)
const io = new Server(httpServer, { cors: { origin: "*" } })

// Get all stocks
app.get("/stocks", (req, res) => {
  res.json(stocks)
})

// Get user portfolio (simulate login with user1)
app.get("/portfolio", (req, res) => {
  const user = users[0]; // fake user
  res.json({ portfolio: user.portfolio, balance: user.balance })
})

// Buy stock
app.post("/buy", (req, res) => {
  const { symbol, quantity } = req.body
  const user = users[0]
  const stock = stocks.find((s) => s.symbol === symbol)

  if (!stock) return res.status(404).json({ message: "Stock not found" })

  const cost = stock.price * quantity
  if (user.balance < cost) return res.status(400).json({ message: "Not enough balance" })

  user.balance -= cost
  user.portfolio[symbol] = (user.portfolio[symbol] || 0) + quantity

  res.json({ portfolio: user.portfolio, balance: user.balance })
})

// Sell stock
app.post("/sell", (req, res) => {
  const { symbol, quantity } = req.body
  const user = users[0]
  const stock = stocks.find((s) => s.symbol === symbol)

  if (!stock) return res.status(404).json({ message: "Stock not found" })
  if (!user.portfolio[symbol] || user.portfolio[symbol] < quantity)
    return res.status(400).json({ message: "Not enough stock to sell" })

  user.portfolio[symbol] -= quantity
  if (user.portfolio[symbol] === 0) delete user.portfolio[symbol]
  user.balance += stock.price * quantity

  res.json({ portfolio: user.portfolio, balance: user.balance })
})

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id)

  // Send stock updates every second
  const interval = setInterval(() => {
    stocks.forEach((stock) => {
      // simulate random price changes
      const change = (Math.random() - 0.5) * 2
      stock.price = parseFloat((stock.price + change).toFixed(2))
    })
    socket.emit("stockUpdate", stocks)
  }, 1000)

  socket.on("disconnect", () => {
    clearInterval(interval)
    console.log("Client disconnected:", socket.id)
  })
})

const PORT = 3000
httpServer.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
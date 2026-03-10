// Stock type
export interface Stock {
  symbol: string
  name: string
  price: number
}

// User portfolio type
export interface Portfolio {
  [symbol: string]: number
}

// User type
export interface User {
  id: string
  name: string
  portfolio: Portfolio
  balance: number // money available to trade
}
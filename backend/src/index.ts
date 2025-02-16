import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import { orderRouter } from './routers/orderRouter'
import { productRouter } from './routers/productRouter'
import { seedRouter } from './routers/seedRouter'
import { keyRouter } from './routers/keyRouter'
import { userRouter } from './routers/userRouter'
import {auctionRouter} from "./routers/auctionRouter";

dotenv.config()

const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost/thrifttradedb'
mongoose.set('strictQuery', true)
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected to mongodb')
  })
  .catch(() => {
    console.log('error mongodb')
  })

const app = express()
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:5173'],
  })
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/products', productRouter)
app.use('/api/users', userRouter)
app.use('/api/seed', seedRouter)
app.use('/api/keys', keyRouter)
app.use('/api/orders', orderRouter)
app.use('/api/auction', auctionRouter)

const PORT = 4000
app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`)
})
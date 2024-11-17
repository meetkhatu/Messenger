import express from 'express'
import dotenv from 'dotenv'
import cors from "cors"
import mongoose from 'mongoose'
import userRoute from './Routes/user.route.js'
import messageRoute from './Routes/message.route.js'
import cookieParser from 'cookie-parser'
import { app, server } from './SocketIO/server.js'


dotenv.config()


const PORT = process.env.PORT || 5002
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/chat'

app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
}));
app.use(express.json())
app.use(cookieParser())

try {
    mongoose.connect(url)
    console.log(`MongoDB connected at ${url}`)
} catch (error) {
    console.log(error)
}


app.use('/user', userRoute)
app.use('/message', messageRoute)



server.listen(PORT, () => {
    console.log(`Server started on ${PORT}`)
})
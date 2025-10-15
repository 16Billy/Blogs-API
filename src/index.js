import express from 'express';
import 'dotenv/config';
import {AuthRoutes} from './routes/Auth.routes.js';
import {BlogRoutes} from './routes/Blog.routes.js';
import cors from 'cors'
import helmet from 'helmet'


// Config
const app = express()
const port = process.env.PORT || 3000

// Middleware
app.use(express.json())
app.use(cors())
app.use(helmet())

// Routes
app.use('/api/auth', AuthRoutes)
app.use('/api/blog', BlogRoutes)

// Starting server
app.listen(port, () => {
    console.log(`node server running at : http://localhost:${port}`)
})
import express from 'express';
import 'dotenv/config';
import {AuthRoutes} from './routes/Auth.routes.js';
import {BlogRoutes} from './routes/Blog.routes.js';

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())


app.get('/',(req,res) => {
    res.status(200).send('API running')
})

app.use('/api/auth', AuthRoutes)
app.use('/api/blog', BlogRoutes)

app.listen(port, () => {
    console.log(`node server running at : http://localhost:${port}`)
})
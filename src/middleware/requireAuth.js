import jwt from "jsonwebtoken"
import 'dotenv/config'

export const requireAuth = async (req,res,next) => {
    const {authorization} = req.headers
    try {
        if (!authorization) {
            res.status(401)
        }
        const token = authorization.split(' ')[1]
        const secret_key = process.env.SECRET_KEY
        const {id} = jwt.verify(token, secret_key)
        req.author_id = id
        next()
    } catch (e) {
        res.status(400).json({error:e})
    }
}
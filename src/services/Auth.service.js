import { db } from "../db/db.js";
import 'dotenv/config'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


export const createUser = async (firstName,lastName, email, password) => {
    
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await db.query(`
        INSERT INTO users(firstName, lastName, email, password)
        VALUES($1,$2,$3,$4)
        RETURNING *`,[firstName, lastName, email, hashedPassword])
    
    return user.rows[0]
}

export const verifyUser = async (email,password) => {
    const user = await db.query('SELECT * FROM users WHERE email = $1',[email])
    if (user.rows.length < 1) {
        return {result:false, message:'User does not exist'}
    }
    const match = await bcrypt.compare(password,user.rows[0].password)
    if (match) {
        const token = createToken(user.rows[0].id)
        return {result:true, message:token}
    } else {
        return {result:false, message:'The entered password is incorrect.'}
    }

}

export const createToken = (user) => {
    
    const secret_key = process.env.SECRET_KEY
    const token = jwt.sign({user:user.id,email:user.email}, secret_key, {expiresIn:'1d'})

    return token
}

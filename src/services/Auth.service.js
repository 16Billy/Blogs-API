import { db } from "../db/db.js";
import 'bcrypt'

export const createUser = async (firstName,lastName, email, password) => {
    
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await db.query(`
        INSERT INTO users(firstName, lastName, email, password)
        VALUES(${firstName},${lastName},${email},${password})
        RETURNING *`)
    
    return user
}

export const verifyUser = () => {

}

export const createToken = () => {
    
}

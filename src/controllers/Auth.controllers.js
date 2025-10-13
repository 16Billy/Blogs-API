import { createUser, verifyUser, createToken } from "../services/Auth.service.js"

export const signup = async (req,res) => {
    try {
        const {firstName, lastName, email, password} = req.body

        const user = createUser(firstName, lastName,email, password)
        const token = createToken(user.id)

        res.status(200).send('User created').json({user,token})

    } catch (e) {
        res.status(400).json({'error': e})
    }
    
}

export const signin = async (req,res) => {
    try {
        const {email, password} = req.body
        const user = verifyUser(email, password)
        const token = createToken(user.id)

        res.status(200).json({user,token})

    } catch (e) {
        res.status(400).json({'error':e})
    }
}


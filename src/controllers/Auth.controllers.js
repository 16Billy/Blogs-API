import { createUser, verifyUser, createToken } from "../services/Auth.service.js"

export const signup = async (req,res) => {
    try {
        const {firstName, lastName, email, password} = req.body

        const user = await createUser(firstName, lastName,email, password)
        const token = createToken(user.id)
        console.log(token)
        res.status(200).json({token:token})

    } catch (e) {
        console.log(e)
        res.status(400).json({message: e})
    }
    
}

export const signin = async (req,res) => {
    try {
        const {email, password} = req.body
        const user = await verifyUser(email, password)
        if (user.result) {
            res.status(200).json({token:user.message})
        } else if (!user.result) {
            res.status(401).json({error:user.message})
        }

    } catch (e) {
        res.status(400).json({'error':e})
    }
}


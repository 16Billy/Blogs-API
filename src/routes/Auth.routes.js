import express from 'express'
import { signup, signin } from '../controllers/Auth.controllers.js'

export const AuthRoutes = express.Router()

AuthRoutes.post('/sign-up', signup)
AuthRoutes.post('/sign-in', signin)

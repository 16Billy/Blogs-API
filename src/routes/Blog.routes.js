import express from 'express'
import { getBlogs, getBlog, createBlog, editBlog, deleteBlog } from '../controllers/Blog.controllers.js'
import { requireAuth } from '../middleware/requireAuth.js'

export const BlogRoutes = express.Router()


BlogRoutes.use(requireAuth)

BlogRoutes.get('/', getBlogs)
BlogRoutes.post('/', createBlog)
BlogRoutes.get('/:id', getBlog)
BlogRoutes.patch('/:id', editBlog)
BlogRoutes.delete('/:id', deleteBlog)

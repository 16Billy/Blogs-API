import { db } from "../db/db.js"

export const getBlogs = async (req,res) => {
    const author_id = req.author_id
    try {
        const blogs = await db.query('SELECT * from blogs WHERE author_id = $1',[author_id])
        res.status(200).json(blogs)
    } catch (e) {
        res.status(400).json({error:e})
    }
}

export const getBlog = async (req, res) => {
    
}

export const createBlog = async (req, res) => {
    const {title, body} = req.body
    const author_id = req.author_id
    try {
        const blog = await db.query(`
        INSERT INTO blogs(title,body,author_id)
        VALUES ($1,$2,$3)
        `, [title,body,author_id])
        res.status(200).json({message:'Blog succesfully created.'})
    } catch (error) {
        res.status(400).json({error:e})
    }
    

}

export const editBlog = async (req, res) => {

}

export const deleteBlog = async (req, res) => {

}
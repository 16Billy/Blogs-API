import { db } from "../db/db.js"

export const getBlogs = async (req,res) => {
    const author_id = req.author_id
    try {
        const blogs = await db.query('SELECT * from blogs WHERE author_id = $1',[author_id])
        res.status(200).json(blogs.rows)
    } catch (e) {
        res.status(400).json({error:e})
    }
}

export const getBlog = async (req, res) => {
    try {
        
        const {id} = req.params
        const author_id = req.author_id
        const blog = await db.query('SELECT * FROM blogs WHERE id=$1',[id])
        if (blog.rows.length > 0){
            const blog_author_id = blog.rows[0].author_id
            console.log(blog_author_id,author_id)
            if (blog_author_id !== author_id) {
                
                res.status(401).json({message:"You can't acces this blog"})
            } else {
                res.status(200).json({blog:blog.rows[0]})
            }
            
        } else {
            res.status(404).json({message:"This blog doesn't exist"})
        }
        
    } catch (e) {
        res.status(400).json({e:e})
    }

}

export const createBlog = async (req, res) => {
    const {title, body} = req.body
    const author_id = req.author_id
    try {
        const blog = await db.query(`
        INSERT INTO blogs(title,body,author_id)
        VALUES ($1,$2,$3)
        `, [title,body,author_id])
        res.status(201).json({message:'Blog succesfully created.'})
    } catch (error) {
        res.status(400).json({error:e})
    }
    

}

export const editBlog = async (req, res) => {
    const {id} = req.params
    const {title, body} = req.body
    const author_id = req.author_id
    
    try {
        const blog = await db.query(`
            UPDATE Blogs
            SET title = $1,
                body  = $2
            WHERE id = $3 AND author_id = $4
            RETURNING *
            `,[title,body,id,author_id])
        if (blog.rows.length > 0) {
            res.status(200).json({message: "Blog edited succesfully", updated: blog.rows[0]})
        } else {
            res.status(404).json({message:"This blog doesn't exist"})
        }
    } catch (e) {
        res.status(400).json({e:e})
    }
}

export const deleteBlog = async (req, res) => {
    const {id} = req.params
    const author_id = req.author_id
    try {
        const blog = await db.query(`
                DELETE FROM Blogs
                WHERE id = $1 AND author_id = $2
            `,[id,author_id])
        if (blog.rows.length > 0) {
            res.status(200).json({message:"Blog succesfully deleted"})
        } else {
            res.status(404).json({message:"This blog doesn't exist"})
        }
        
    } catch (e) {
        res.status(400).json({e:e})
    }
}
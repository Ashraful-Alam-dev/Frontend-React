import React from "react";
import { useNavigate } from "react-router-dom";
import './BlogCard.css';

function BlogCard ({blog, handleDelete})
{
    const navigate = useNavigate();

    const handleEdit = (e) => {
        navigate(`/blog/edit/${blog.id}`);
    };

    const handleBlog = (e) => {
        navigate(`/blog/post/${blog.id}`);
    };

    return(
        <div className="blogcard">
            <h3 classname = "title"
            onClick = {handleBlog}>
            Title: {blog.title}
            </h3>
            <p className="topic">Topic: {blog.topic}</p>
            <p>{blog.content.length > 30 ? blog.content.slice(0, 30) + "..." : blog.content}</p>
        
            <div className="button">
                <button 
                className="edit"
                onClick = {handleEdit}>
                Edit
                </button>

                <button 
                className="delete"
                onClick = {(e) => {handleDelete(blog.id)}}>
                Delete
                </button>
            </div>
        </div>
    )
}

export default BlogCard;
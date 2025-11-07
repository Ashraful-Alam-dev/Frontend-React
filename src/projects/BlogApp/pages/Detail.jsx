import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import './Detail.css';
function Detail({blogs})
{
    const navigate = useNavigate();
    const {id} = useParams();
    const blogId = parseInt(id);
    const blog = blogs.find((b) => b.id === blogId);

    if (!blog) {
        return <p>Blog not found.</p>;
    }

    return(
        <div>
            <h1>{blog.title}</h1>
            <h3 className="topic">Topic: {blog.topic}</h3>
            <h3 className="date">Created on: {blog.date} </h3>
            <p>{blog.content}</p>
            <button className="back" 
            onClick={() => navigate("/blog")}>
                Back
            </button>
        </div>
    );
}

export default Detail;
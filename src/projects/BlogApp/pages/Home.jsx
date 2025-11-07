import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import BlogCard from "../components/BlogCard.jsx";
import './Home.css';

function Home({blogs, handleDelete})
{
    const [search, setsearch] = useState("");
    const handleSearch = (e) => {
        setsearch(e.target.value);
    };
    
    const navigate = useNavigate();
    const filteredBlogs = search
    ? blogs.filter(blog => blog.topic === search)
    : blogs;


    return(
        <div>
            <h1>My Notebook</h1>
            <div className = "top-bar">
                <select className="search"
                value={search} 
                onChange={handleSearch}>
                    <option value="">Select a topic...</option>
                    <option value="Travel">Travel</option>
                    <option value="Lifestyle">Lifestyle</option>
                    <option value="Technology">Technology</option>
                    <option value="Health">Health</option>
                    <option value="Entertainment">Entertainment</option>
                </select>

                <button className="add-btn"
                onClick = {() => navigate(`/blog/write`)}>
                    Add New Blog
                </button>
            </div>

            <div className="blog-grid">
                {filteredBlogs.length > 0 ? (
                    filteredBlogs.map(blog => (
                    <BlogCard
                        key={blog.id}
                        blog={blog}
                        handleDelete={handleDelete}
                    />
                    ))
                ) : (
                    <div className="no-blogs-message">
                    Sorry, no blogs found for "{search}".
                    </div>
                )}
            </div>
        </div>
    )
}

export default Home;
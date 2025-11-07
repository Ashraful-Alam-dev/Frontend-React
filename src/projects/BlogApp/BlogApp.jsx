import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/Home.jsx';
import Detail from './pages/Detail.jsx';
import Form from './pages/Form.jsx';
import Edit from './pages/Edit.jsx';

import About from './components/About.jsx';
import NavBar from './components/NavBar.jsx';
import Footer from './components/Footer.jsx';
import './BlogApp.css';

function BlogApp() {
    const [blogs, setBlogs] = useState([
        {
            id: 1,
            title: "My Trip to Japan",
            topic: "Travel",
            date: "2025-06-25",
            content: "I recently visited Japan and my experience exploring Tokyo and Kyoto is too good."
        },
        {
            id: 2,
            title: "Healthy Lifestyle Tips",
            topic: "Lifestyle",
            date: "2025-06-20",
            content: "Some daily habits and diet plans can make you healthier."
        }
    ]);

    const addBlog = (newBlog) => {
        const updatedBlogs = [...blogs, newBlog];
        setBlogs(updatedBlogs);
    };

    const deleteBlog = (id) => {
        const updatedBlogs = blogs.filter((blog) => blog.id !== id);
        setBlogs(updatedBlogs);
    };

    const editBlog = (updatedBlog) => {
        const updatedBlogs = blogs.map((blog) =>
            blog.id === updatedBlog.id ? updatedBlog : blog
        );
        setBlogs(updatedBlogs);
    };

    return (
        <BrowserRouter>
            <div className="blogpost">
                <NavBar />

                <Routes>
                    <Route path="/" element={<Navigate to="/blog" />} />
                    <Route path="/blog" element={<Home blogs={blogs} handleDelete={deleteBlog} />} />
                    <Route path="/blog/write" element={<Form handleAdd={addBlog} />} />
                    <Route path="/blog/post/:id" element={<Detail blogs={blogs} />} />
                    <Route path="/blog/edit/:id" element={<Edit blogs={blogs} handleEdit={editBlog} />} />
                    <Route path="/blog/about" element={<About />} />
                </Routes>

                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default BlogApp;

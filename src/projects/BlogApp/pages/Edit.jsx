import React, {useState, useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import './Edit.css';

function Edit({blogs, handleEdit})
{
    const navigate = useNavigate();
    const {id} = useParams();
    const blogId = parseInt(id);
    const blog = blogs.find((b) => b.id === blogId);
    
    if (!blog)
    {
        return <p>Blog not found.</p>;
    }

    const [title, setTitle] = useState("");
    const [topic, setTopic] = useState("");
    const [content, setContent] = useState("");
    const [date, setDate] = useState("");

    useEffect(() => {
        if (blog) {
          setTitle(blog.title || "");
          setTopic(blog.topic || "");
          setContent(blog.content || "");
          setDate(blog.date || new Date().toISOString().split("T")[0]);
        }
      }, [blog]);
    
    const [error, setError] = useState("");
        const validateForm = () => {
        if (!title.trim() || !topic.trim() || !content.trim() || !date) return "Every field must be filled";
    
        const today = new Date().toISOString().split("T")[0];
        if (date > today) return "Date cannot be in the future";
    
        return null;
    };
    
    const handleSubmit = (e) => {
    e.preventDefault();
    
    const errorMsg = validateForm();
    if (errorMsg) {
        setError(errorMsg);
        return;
    }
    setError("");
    
    handleEdit({
      ...blog, 
      title: title.trim(),
    topic: topic.trim(),
    content: content.trim(),
    date,
    });

    navigate("/blog");
    };

    return(
        <div> 
            <form className="form" onSubmit={handleSubmit}>
                <select value={topic} onChange={(e) => setTopic(e.target.value)}>
                <option value="lifestyle">Lifestyle</option>
                <option value="technology">Technology</option>
                <option value="education">Education</option>
                <option value="health">Health</option>
                <option value="entertainment">Entertainment</option>
                </select>

                <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                />

                <input
                type="text"
                placeholder="Write the title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                />

                <input
                type="text"
                placeholder="Tell the story..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                />

                <button type="submit">Update</button>
            </form>
            {error && <div className="error">{error}</div>}
        </div>
    );
}

export default Edit;
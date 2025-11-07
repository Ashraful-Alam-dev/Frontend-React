import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import './Form.css';

function Form({handleAdd})
{
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [topic, setTopic] = useState("");
    const [content, setContent] = useState("");
    const [date, setDate] = useState(() =>
        new Date().toISOString().split("T")[0]);

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
    const newBlog = {
        id: Date.now(),
        title: title.trim(),
        topic: topic.trim(),
        content: content.trim(),
        date,
    };
    setError("");

    handleAdd(newBlog);
    setTitle("");
    setTopic("");
    setContent("");
    setDate(new Date().toISOString().split("T")[0]);
    navigate("/blog");
    };

    return(
        <div> 
            <form className="form" onSubmit={handleSubmit}>
                <select value={topic} onChange={(e) => setTopic(e.target.value)}>
                <option value="">Select a topic...</option>
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

                <textarea
                    placeholder="Tell the story..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    rows={6}
                />
        
                <button type="submit">Add</button>
            </form>
            {error && <div className="error">{error}</div>}
        </div>
    );
}

export default Form;
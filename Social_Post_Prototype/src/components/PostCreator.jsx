// PostCreator.jsx
// Clean and neatly aligned post creation form

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function PostCreator({ onAddPost }) {
  const [caption, setCaption] = useState("");
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!caption.trim()) return alert("Please enter post text!");
    onAddPost(caption, preview);
    setCaption("");
    setPreview(null);
    navigate("/feed");
  };

  return (
    <div className="post-container">
      <div className="post-card">
        <h2 className="post-title">Create a New Post</h2>
        <form onSubmit={handleSubmit} className="post-form">
          <textarea
            placeholder="Write something..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            rows={5}
            className="post-textarea"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="post-file"
          />
          {preview && (
            <img src={preview} alt="preview" className="post-preview" />
          )}
          <button className="post-button" type="submit">
            Post
          </button>
        </form>
      </div>
    </div>
  );
}

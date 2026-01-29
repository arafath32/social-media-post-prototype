// SocialPost.jsx
// -----------------------------------------------------------------------------
// Task 2: Reusable Social Media Post Component
// ➤ Displays each post with username, image, caption, like, and comment area.
// ➤ This component is reused for both API posts and user posts.
// -----------------------------------------------------------------------------

import React, { useState } from "react";

export default function SocialPost({ post, onLike, onAddComment }) {
  const [showBox, setShowBox] = useState(false);
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (!text.trim()) return;
    onAddComment(text);
    setText("");
    setShowBox(false);
  };

  return (
    <div className="post">
      <div className="post-header">
        <div className="avatar"></div>
        <div className="post-meta">
          <b>{post.user}</b>
          <span className="timestamp">
            {new Date(post.createdAt).toLocaleString()}
          </span>
        </div>
      </div>

      {post.imageDataUrl && (
        <img src={post.imageDataUrl} alt="post" className="post-image" />
      )}

      <p className="caption">{post.caption}</p>

      <div className="actions">
        <button className="btn-outline" onClick={onLike}>
          ❤️ Like ({post.likes})
        </button>
        <button className="btn-outline" onClick={() => setShowBox(!showBox)}>
          💬 Comment
        </button>
      </div>

      {showBox && (
        <div className="comment-box">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write a comment..."
          />
          <button className="send" onClick={handleSubmit}>➤</button>
        </div>
      )}

      {post.comments?.length > 0 && (
        <div className="comments">
          {post.comments.map((c) => (
            <div key={c.id} className="comment">
              {c.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// FeedPage.jsx
// Task 3: API Integration (JSONPlaceholder)
// Task 4: State Management (Update Feed)
// LO3: Dynamic rendering and local updates

import React from "react";
import SocialPost from "./SocialPost";

export default function FeedPage({ posts, onLike, onAddComment }) {
  if (!posts.length)
    return (
      <div className="card">
        <h2>Feed</h2>
        <p>No posts yet. Create one!</p>
      </div>
    );

  return (
    <div className="card">
      <h2>Feed</h2>
      {posts.map((p) => (
        <SocialPost
          key={p.id}
          post={p}
          onLike={() => onLike(p.id)}
          onAddComment={(txt) => onAddComment(p.id, txt)}
        />
      ))}
    </div>
  );
}

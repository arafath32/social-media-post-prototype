// App.jsx
// -----------------------------------------------------------------------------
// The Interactor: Social Post Prototype
// This file is the main brain of the project.
// ➤ It connects all components (NavBar, PostCreator, FeedPage).
// ➤ It handles API data fetching (Task 3), user posts, likes, and comments.
// ➤ It shows how state management (useState, useEffect) works to update feed.
// Learning Outcomes Covered:
// LO1 – Uses React components & routing
// LO2 – Demonstrates design principles for social media layout
// LO3 – Shows API integration + dynamic state updates
// -----------------------------------------------------------------------------

import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import PostCreator from "./components/PostCreator";
import FeedPage from "./components/FeedPage";

export default function App() {
  const [userPosts, setUserPosts] = useState([]);
  const [apiPosts, setApiPosts] = useState([]);

  // Task 3: Fetch example posts from JSONPlaceholder
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=6")
      .then((res) => res.json())
      .then((data) => {
        // Custom user names and beautiful nature quotes
        const usernames = [
          "Mohamed Asfath",
          "Mohamed Arafath",
          "Mohamed Asirif",
          "Mohamed Haroos",
          "Mohamed Mufas",
          "Disani Jayaweera",
        ];

        const quotes = [
          "The Earth laughs in flowers.",
          "Look deep into nature, and you will understand everything better.",
          "In every walk with nature, one receives far more than he seeks.",
          "Adopt the pace of nature: her secret is patience.",
          "Heaven is under our feet as well as over our heads.",
          "The mountains are calling, and I must go.",
        ];

        const mapped = data.map((p, i) => ({
          id: "api-" + p.id,
          user: usernames[i % usernames.length],
          caption: quotes[i % quotes.length],
          imageDataUrl: null,
          likes: Math.floor(Math.random() * 20),
          comments: [],
          createdAt: Date.now(),
        }));
        setApiPosts(mapped);
      });
  }, []);

  // Task 1 + 4: Add a new user post and show it at the top
  const addPost = (caption, imageDataUrl) => {
    const newPost = {
      id: Date.now().toString(),
      user: "Team Interactor",
      caption,
      imageDataUrl,
      likes: 0,
      comments: [],
      createdAt: Date.now(),
    };
    setUserPosts((prev) => [newPost, ...prev]);
  };

  // Like button update
  const toggleLike = (id) => {
    const update = (arr) =>
      arr.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p));
    setUserPosts((p) => update(p));
    setApiPosts((p) => update(p));
  };

  // Add comment to any post
  const addComment = (id, text) => {
    const update = (arr) =>
      arr.map((p) =>
        p.id === id
          ? { ...p, comments: [...p.comments, { id: Date.now().toString(), text }] }
          : p
      );
    setUserPosts((p) => update(p));
    setApiPosts((p) => update(p));
  };

  const allPosts = [...userPosts, ...apiPosts];

  return (
    <div>
      <NavBar />
      <div className="container">
        <Routes>
          <Route path="/" element={<PostCreator onAddPost={addPost} />} />
          <Route
            path="/feed"
            element={
              <FeedPage
                posts={allPosts}
                onLike={toggleLike}
                onAddComment={addComment}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}

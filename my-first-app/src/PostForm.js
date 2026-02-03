// src/PostForm.js
import React, { useState } from "react";

function PostForm({ onAdd }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return alert("게시글 제목을 입력하세요!");

    fetch("http://localhost:5000/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    })
      .then((res) => res.json())
      .then((newPost) => {
        onAdd(newPost); // 부모(App)에게 새 게시글 전달
        setTitle("");   // 입력창 초기화
      })
      .catch((err) => console.error("❌ 전송 실패:", err));
  };

  return (
    <form onSubmit={handleSubmit} className="post-form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="게시글 제목 입력"
      />
      <button type="submit">등록</button>
    </form>
  );
}

export default PostForm;

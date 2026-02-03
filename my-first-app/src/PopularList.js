// src/PopularList.js
import React from "react";

function PopularList({ posts }) {
  return (
    <div className="popular-list">
      {posts.length === 0 ? (
        <p>⏳ 데이터를 불러오는 중...</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id} className="post-item">
              {post.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PopularList;

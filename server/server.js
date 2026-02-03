// server/server.js
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json()); // 🔥 POST 요청 body를 JSON으로 읽기 위해 필요

// 임시 데이터 저장 (나중에 DB로 교체 가능)
let posts = [
  { id: 1, title: "Example of Post 1" },
  { id: 2, title: "Example of Post 2" },
  { id: 3, title: "Example of Post 3" },
  { id: 4, title: "Example of Post 4" },

];

// ✅ GET - 게시글 전체 조회
app.get("/api/posts", (req, res) => {
  res.json(posts);
});

// ✅ POST - 새 게시글 추가
app.post("/api/posts", (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "Posting Testing add on server(success)." });

  const newPost = { id: posts.length + 1, title };
  posts.push(newPost);

  res.status(201).json(newPost);
});

app.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
});

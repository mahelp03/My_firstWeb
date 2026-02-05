import express from "express";
import cors from "cors";
import mysql from "mysql2"; // ✅ 설치한 mysql2 라이브러리 불러오기
import dotenv from "dotenv"; // ✅ .env 파일 읽기용

dotenv.config(); // .env 설정 로드

const app = express();
app.use(cors());
app.use(express.json());

// ✅ 1. AWS RDS 연결 설정
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

db.connect((err) => {
  if (err) console.error("❌ DB 연결 실패:", err.message);
  else console.log("✅ AWS RDS 연결 성공!");
});

db.connect((err) => {
  if (err) return console.error(err);
  console.log("✅ 서버 접속 성공!");

  // 방이 없으면 만드는 쿼리 실행
  db.query("CREATE DATABASE IF NOT EXISTS myfirstwebdb", (err) => {
    if (err) console.log(err);
    else console.log("✨ myfirstwebdb 방 생성 완료!");
  });
});

// ✅ 2. GET - DB에서 게시글 조회
app.get("/api/posts", (req, res) => {
  const sql = "SELECT * FROM posts"; // DB에서 모든 글 가져오는 명령어
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

app.post("/api/posts", (req, res) => {
  const { title, author_name, tags, content, image_url } = req.body;
  const sql = "INSERT INTO posts (title, author_name, tags, content, image_url) VALUES (?, ?, ?, ?, ?)";
  
  db.query(sql, [title, author_name, tags, content, image_url], (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(201).json({ id: result.insertId, message: "게시글이 저장되었습니다!" });
  });
});

app.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
});
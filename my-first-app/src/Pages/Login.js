// src/pages/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("로그인 시도:", email, password);
    alert("로그인 기능은 곧 연결됩니다!");
  };
  return (
    <div style={{ 
      display: "flex",           
      justifyContent: "center",  
      alignItems: "center",      
      minHeight: "100vh",        
      width: "100%",             
      backgroundColor: "#f5f5f5",
      position: "relative"       // 로고 배치를 위해 추가
    }}>

      <div 
        onClick={() => navigate("/")} 
        style={{ 
          position: "absolute",
          top: "20px",
          left: "20px",
          fontSize: "24px", 
          fontWeight: "bold", 
          cursor: "pointer",
          userSelect: "none"
        }}
      >
        <span style={{ color: "#333" }}>Idea</span>
        <span style={{ color: "#dbeb4b" }}>Hub</span>
      </div>

      <div style={{ 
        padding: "40px", 
        border: "1px solid #ddd", 
        borderRadius: "10px",
        backgroundColor: "white",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)", // 살짝 그림자 추가
        textAlign: "center"
      }}>
        <h2>🔐 로그인 페이지</h2>
        <form onSubmit={handleLogin}>
          <div>
            <input
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ padding: "10px", width: "250px" }}
            />
          </div>
          <div style={{ marginTop: "10px" }}>
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ padding: "10px", width: "250px" }}
            />
          </div>
          <button style={{ 
            marginTop: "20px", 
            padding: "10px 20px", 
            width: "100%",
            cursor: "pointer",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px"
          }}>
            로그인
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

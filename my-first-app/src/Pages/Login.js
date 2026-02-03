// src/pages/Login.js
import React, { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("로그인 시도:", email, password);
    alert("로그인 기능은 곧 연결됩니다!");
  };

  return (
    <div style={{ padding: "50px" }}>
      <h2>🔐 로그인 페이지</h2>
      <form onSubmit={handleLogin}>
        <div>
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button style={{ marginTop: "10px" }}>로그인</button>
      </form>
    </div>
  );
}

export default Login;

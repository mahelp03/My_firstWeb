import React, { useState } from "react";

function PostForm({ onAdd }) {
  // ✅ 모든 입력 필드를 위한 상태 관리
  const [formData, setFormData] = useState({
    title: "",
    author_name: "",
    content: "",
    tags: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.author_name.trim()) {
      return alert("제목과 작성자 이름을 입력하세요!");
    }

    //서버에 모든 데이터 전송
    fetch("http://localhost:5000/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("서버 응답 에러");
        return res.json();
      })
      .then((newPost) => {
        onAdd(newPost); // 부모 컴포넌트의 목록 업데이트
        //입력창 초기화
        setFormData({ title: "", author_name: "", content: "", tags: "" });
        alert("게시글이 등록되었습니다!");
      })
      .catch((err) => console.error("❌ 전송 실패:", err));
  };

  return (
    <form onSubmit={handleSubmit} className="post-form" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <input name="title" value={formData.title} onChange={handleChange} placeholder="제목" />
      <input name="author_name" value={formData.author_name} onChange={handleChange} placeholder="작성자 이름" />
      <input name="tags" value={formData.tags} onChange={handleChange} placeholder="태그 (예: React, AWS)" />
      <textarea name="content" value={formData.content} onChange={handleChange} placeholder="내용을 입력하세요" rows="5" />
      <button type="submit">등록</button>
    </form>
  );
}

export default PostForm;
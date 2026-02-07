
import "../App.css";
import React, { useEffect, useState } from "react";
import PopularList from "../PopularList";
import PostForm from "../PostForm";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate(); 

  return (
    <div className="navbar">
      <div className="nav-left">
        <div 
          className="logo" 
          onClick={() => navigate("/")} 
          style={{ cursor: "pointer" }}
        >
          Idea<span className="highlight">Hub</span>
        </div>
        <button className="category-btn">☰ Category</button>
      </div>

      {/* 검색창 */}
      <div className="search-bar">
        <input type="text" placeholder="검색어를 입력하세요..." />
        <button className="search-btn">🔍</button>
      </div>

      {/* 오른쪽 영역 */}
      <div className="nav-right">
        <button className="category-btn">🎃 Holloween</button>
        <button className="category-btn">♡ Favorite</button>
        {/* 기존 Link 태그 유지 */}
        <Link to="/login" className="nav-link">Login</Link>
        <Link to="/signup" className="nav-link">Sign in</Link>
      </div>
    </div>
  );
}

function CategoryMenu() {
  return (
    <div className="categories">
      <button className="category-btn">🎁 Recommend Gift</button>
      {/* <button className="category-btn">Live Commersial</button> */}
      <button className="category-btn">Live Review</button>
      <button className="category-btn">Best</button>
      <button className="category-btn">Community</button>
      <button className="category-btn">New Arrival</button>
      {/* <button className="category-btn">소담상회</button> */}
      
    </div>
  );
}

function Carousel({ images }) {
  // 배너 처음
  const [currentIndex, setCurrentIndex] = useState(0);

  // <- 배너 바꾸기
  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  // 함수 메인 배너 바꾸기 ->
  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="carousel">
      <button onClick={goToPrevious} className="left-arrow"> ❮ </button>
      <button onClick={goToNext} className="right-arrow"> ❯ </button>
      
      <img src={images[currentIndex]} alt="banner" />
    </div>
  );
}




// 실행
function App() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("❌ 서버 연결 실패:", err));
  }, []);
  const banners = [
    "/image/testimage1.jpg", // 이미지 파일 경로
    "/image/testimage2.jpg",
    "/image/testimage3.jpg",
  ];

  const addPost = (newPost) => {
    setPosts((prev) => [...prev, newPost]);
  };
  
  return (
    <div className="app-container">
      <Navbar />
      <CategoryMenu />
      <Carousel images={banners} />

      <div className="container">
        <h2>🔥 Top BEST</h2>

        {/* 상단 피드 (썸네일 등) */}
        <TopFeed />

        {/* 서버에서 가져온 데이터 전달 */}
        <PopularList posts={posts} />

        <h3>📝 새 게시글 작성</h3>
        <PostForm onAdd={addPost} />
      </div>
    </div>
  );
}

function TopFeed() {
  return (
    <div className="top-feed">
      <div className="feed-item">[Ex_image peed place1]</div>
      <div className="feed-item">[Ex_image peed place2]</div>
      <div className="feed-item">[Ex_image peed place3]</div>
    </div>
  );
}

// function PopularList() {
//   const articles = [
//     {
//       img: "/images/thumb1.jpg",
//       title: "오싹오싹 로스트 웨이브가 되어버린 한 나라의 문화",
//       comment: 102,
//       category: "싱글벙글 지구촌",
//       time: "13:40",
//     },
//     {
//       img: "/images/thumb2.jpg",
//       title: "지난 겨울 8박 9일 제주도 여행 후기 [장문]",
//       comment: 27,
//       category: "바이크 여행",
//       time: "12:20",
//     },
//     {
//       img: "/images/thumb3.jpg",
//       title: "test111111",
//       comment: 150,
//       category: "러시아·우크라이나",
//       time: "13:10",
//     },
//   ];

//   return (
//     <div className="popular-list">
//       {articles.map((a, idx) => (
//         <div className="article" key={idx}>
//           <img src={a.img} alt={a.title} />
//           <div className="article-info">
//             <div className="article-title">
//               {a.title} <span className="comment">[{a.comment}]</span>
//             </div>
//             <div className="article-meta">
//               <span>{a.category}</span> · <span>{a.time}</span>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }


export default App;

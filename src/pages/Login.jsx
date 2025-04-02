// ✅ Login.jsx
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `http://localhost:4000/api/user/login?email=${email}`
      );
      const user = res.data.user;
      if (user) {
        navigate(`/mbti?user_id=${user.user_id}`);
      } else {
        setError("해당 이메일의 사용자가 없습니다.");
      }
    } catch (err) {
      setError("로그인 실패: " + err.response?.data?.error || err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">로그인</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            className="login-input"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="login-input"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-btn">로그인</button>
        </form>
        {error && <p style={{ color: "var(--error-color)", textAlign: "center", marginTop: "1rem" }}>{error}</p>}
        <div className="login-footer">
          계정이 없으신가요? <Link to="/signup" className="login-link">회원가입</Link>
        </div>
      </div>
    </div>
  );
}

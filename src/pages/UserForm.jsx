// ✅ React Signup 화면 (Signup.jsx)
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function UserForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/api/user", {
        name,
        email,
      });
      alert(`가입 완료! user_id: ${res.data.insertedId}`);
      navigate("/login");
    } catch (err) {
      setError("가입 실패: " + err.response?.data?.error || err.message);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h1 className="signup-title">회원가입</h1>
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="signup-label">이름</label>
            <input
              type="text"
              className="signup-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="signup-label">이메일</label>
            <input
              type="email"
              className="signup-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="signup-btn">회원가입</button>
        </form>
        {error && <p style={{ color: "var(--error-color)", textAlign: "center", marginTop: "1rem" }}>{error}</p>}
        <div className="signup-footer">
          이미 계정이 있으신가요? <Link to="/login" className="signup-link">로그인</Link>
        </div>
      </div>
    </div>
  );
}

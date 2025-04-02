// ✅ App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import UserForm from "./pages/UserForm";
import { MbtiTest } from "./pages/MbtiForm";
import { BusinessRecommendation } from "./pages/BusinessRecommendation";
import { TodoCreate } from "./pages/TodoCreate";
import { TodoList } from "./pages/TodoList";
import Login from "./pages/Login";

// 스타일 import
import "./styles/common.css";
import "./styles/Login.css";
import "./styles/UserForm.css";
import "./styles/MbtiForm.css";
import "./styles/BusinessRecommendation.css";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<UserForm />} />
        <Route path="/mbti" element={<MbtiTest />} />
        <Route path="/recommend" element={<BusinessRecommendation />} />
        <Route path="/todo" element={<TodoCreate />} />
        <Route path="/todo-list" element={<TodoList />} />
      </Routes>
    </Router>
  );
}

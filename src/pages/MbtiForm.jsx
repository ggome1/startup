// ✅ MBTI 질문 및 응답 화면 (MbtiTest.jsx)
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

export function MbtiTest() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState({});
  const [params] = useSearchParams();
  const user_id = params.get("user_id");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:4000/api/mbti/questions").then((res) => {
      setQuestions(res.data.questions);

      // ✅ 초기 응답값을 question_id 기준으로 3으로 설정
      const initialResponses = {};
      res.data.questions.forEach((q) => {
        initialResponses[q.question_id] = 3;
      });
      setResponses(initialResponses);
    });
  }, []);

  const handleChange = (qid, score) => {
    setResponses((prev) => ({ ...prev, [qid]: parseInt(score) }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    const responseArray = Object.entries(responses).map(([qid, score]) => ({
      question_id: parseInt(qid),
      score,
    }));
    try {
      const res = await axios.post("http://localhost:4000/api/mbti/submit", {
        user_id: user_id,
        responses: responseArray,
      });
      navigate(`/recommend?mbti=${res.data.mbti}`);
    } catch (err) {
      alert("MBTI 제출 실패: " + err);
    }
  };

  // 진행 상태 계산
  const progress = questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0;

  if (questions.length === 0) {
    return (
      <div className="mbti-container">
        <div className="mbti-header">
          <h1 className="mbti-title">MBTI 테스트</h1>
          <p className="mbti-subtitle">질문을 불러오는 중입니다...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mbti-container">
      <div className="mbti-header">
        <h1 className="mbti-title">창업 MBTI 테스트</h1>
        <p className="mbti-subtitle">
          당신의 성격 유형을 파악하고 맞춤형 비즈니스 추천을 받아보세요.
        </p>
      </div>

      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>

      <div className="mbti-question-card">
        <div className="question-header">
          <span className="question-number">{currentQuestion + 1}</span>
          <span className="question-text">{questions[currentQuestion]?.question_text}</span>
        </div>

        <div className="options-container">
          <div className="option-range">
            <span>전혀 그렇지 않다</span>
            <input
              type="range"
              min="1"
              max="5"
              value={responses[questions[currentQuestion]?.question_id] || 3}
              onChange={(e) => handleChange(questions[currentQuestion]?.question_id, e.target.value)}
              className="option-slider"
            />
            <span>매우 그렇다</span>
          </div>
          <div className="range-values">
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
          </div>
        </div>
      </div>

      <div className="mbti-navigation">
        <button
          className="mbti-nav-btn mbti-prev-btn"
          onClick={handlePrev}
          disabled={currentQuestion === 0}
        >
          이전
        </button>
        <button
          className="mbti-nav-btn mbti-next-btn"
          onClick={handleNext}
        >
          {currentQuestion === questions.length - 1 ? "결과 보기" : "다음"}
        </button>
      </div>
    </div>
  );
}

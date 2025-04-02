import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";

export function BusinessRecommendation() {
  const [businesses, setBusinesses] = useState([]);
  const [params] = useSearchParams();
  const mbti = params.get("mbti");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `http://localhost:4000/api/mbti/recommend-businesses?mbti_type=${mbti}`
      )
      .then((res) => setBusinesses(res.data.businesses))
      .catch((err) => alert("추천 업종 불러오기 실패: " + err.message));
  }, [mbti]);

  const handleRetakeTest = () => {
    navigate("/mbti");
  };

  const handleSaveResults = () => {
    navigate("/todo");
  };

  // 비즈니스 데이터를 UI에 맞게 변환
  const businessRecommendations = businesses.map((business, index) => ({
    id: business.recommendation_id || index + 1,
    name: business.business_category,
    match: `${Math.floor(85 + Math.random() * 15)}% 일치`,
    description: business.business_description,
    mbti: business.mbti_type,
    stats: {
      growth: `↑ ${Math.floor(10 + Math.random() * 15)}%`,
      competition: ["낮음", "중간", "높음"][Math.floor(Math.random() * 3)],
      investment: ["낮음", "중간", "높음", "중간-높음"][
        Math.floor(Math.random() * 4)
      ],
    },
  }));

  return (
    <div className="recommendation-container">
      <div className="recommendation-header">
        <h1 className="recommendation-title">당신의 MBTI 결과</h1>
        <p className="recommendation-subtitle">
          성격 유형에 기반한 맞춤형 비즈니스 추천을 확인하세요.
        </p>
      </div>

      <div className="mbti-result">
        <div className="mbti-type">
          {businessRecommendations.length > 0
            ? businessRecommendations[0].mbti
            : "결과 로딩 중..."}
        </div>
        <p className="mbti-description">
          {mbti ? (
            <>
              {mbti} 유형에 맞는 비즈니스 추천 결과입니다.
              <br /> 당신의 성격 유형에 가장 적합한 비즈니스 카테고리를
              확인해보세요.
            </>
          ) : (
            "MBTI 결과를 불러오는 중입니다..."
          )}
        </p>
      </div>

      <h2 className="text-center mb-3">추천 비즈니스</h2>

      <div className="business-recommendations">
        {businessRecommendations.length > 0 ? (
          businessRecommendations.map((business) => (
            <div key={business.id} className="business-card">
              <div className="business-content">
                <h3 className="business-name">{business.name}</h3>
                <span className="business-match">{business.match}</span>
                <p className="business-description">{business.description}</p>
                <div className="business-stats">
                  <div className="stat-item">
                    <span className="stat-value">{business.stats.growth}</span>
                    <span className="stat-label">성장률</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-value">
                      {business.stats.competition}
                    </span>
                    <span className="stat-label">경쟁도</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-value">
                      {business.stats.investment}
                    </span>
                    <span className="stat-label">초기 투자</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">추천 비즈니스를 불러오는 중입니다...</p>
        )}
      </div>

      <div className="action-buttons">
        <button className="action-btn save-btn" onClick={handleSaveResults}>
          결과 저장하기
        </button>
        <button className="action-btn retake-btn" onClick={handleRetakeTest}>
          테스트 다시 하기
        </button>
      </div>
    </div>
  );
}

import express from "express";
import { db } from "../db.js";

const router = express.Router();

router.get("/questions", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM mbti_questions");
    res.json({ success: true, questions: rows });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// MBTI 응답 저장

router.post("/submit", async (req, res) => {
  const { user_id, responses } = req.body; // responses: [{ question_id, score }]

  try {
    // 1. 응답 저장
    for (const { question_id, score } of responses) {
      await db.execute(
        `INSERT INTO mbti_responses (user_id, question_id, score) VALUES (?, ?, ?)`,
        [user_id, question_id, score]
      );
    }

    // 2. 점수 계산 (DB에서 질문 가져오기)
    const [questions] = await db.query(
      "SELECT question_id, question_category, weight FROM mbti_questions"
    );
    const categoryScores = {}; // { R: { sum: 0, weight: 0 }, S: ..., ... }

    for (const { question_id, score } of responses) {
      const q = questions.find((q) => q.question_id === question_id);
      if (!q) continue;
      const cat = q.question_category;
      if (!categoryScores[cat]) categoryScores[cat] = { sum: 0, weight: 0 };
      categoryScores[cat].sum += score * q.weight;
      categoryScores[cat].weight += q.weight;
    }
    // 3. 최종 MBTI 계산
    const traits = [
      ["R", "S"],
      ["C", "O"],
      ["I", "T"],
      ["G", "M"],
    ];
    let mbti = "";
    for (const [a, b] of traits) {
      const aAvg = categoryScores[a]?.sum / categoryScores[a]?.weight || 0;
      const bAvg = categoryScores[b]?.sum / categoryScores[b]?.weight || 0;
      mbti += aAvg >= bAvg ? a : b;
    }

    // 4. 결과 저장
    await db.execute(
      `INSERT INTO mbti_results (user_id, mbti_type, mbti_description, score_summary) VALUES (?, ?, ?, ?)`,
      [user_id, mbti, `설명 for ${mbti}`, JSON.stringify(categoryScores)]
    );

    res.json({ success: true, mbti });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get("/recommend-businesses", async (req, res) => {
  const { mbti_type } = req.query;

  try {
    const [rows] = await db.query(
      `SELECT * FROM recommended_businesses 
       WHERE mbti_type LIKE CONCAT('%(', ?, ')') 
       LIMIT 4`,
      [mbti_type]
    );
    res.json({ success: true, businesses: rows });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;

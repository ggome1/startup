import express from "express";
import { db } from "../db.js";

const router = express.Router();

// MBTI 응답 저장
router.post("/", async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res
      .status(400)
      .json({ success: false, error: "name과 email은 필수입니다." });
  }

  try {
    const [result] = await db.execute(
      `INSERT INTO user_profile (name, email) VALUES (?, ?)`,
      [name, email]
    );

    res.json({ success: true, insertedId: result.insertId });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/login', async (req, res) => {
  const { email } = req.query;
  const [rows] = await db.execute('SELECT * FROM user_profile WHERE email = ?', [email]);
  if (rows.length > 0) {
    res.json({ success: true, user: rows[0] });
  } else {
    res.json({ success: false, user: null });
  }
});

export default router;

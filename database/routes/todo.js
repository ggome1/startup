import express from "express";
import { db } from "../db.js";

const router = express.Router();

router.post("/create-todo", async (req, res) => {
  const {
    user_id,
    category_id,
    task_name,
    task_description,
    due_date,
    is_custom,
  } = req.body;

  try {
    const [result] = await db.execute(
      `INSERT INTO todo_list (user_id, category_id, task_name, task_description, due_date, is_custom, task_status)
       VALUES (?, ?, ?, ?, ?, ?, 'pending')`,
      [
        user_id,
        category_id,
        task_name,
        task_description,
        due_date,
        is_custom || false,
      ]
    );

    res.json({ success: true, todo_id: result.insertId });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;

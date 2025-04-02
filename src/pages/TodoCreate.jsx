// ✅ 카테고리 입력 + TO-DO 생성 화면 (TodoCreate.jsx)
import { useState } from 'react';
import axios from 'axios';

export function TodoCreate({ userId, categoryId }) {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleCreate = async () => {
    try {
      const res = await axios.post('http://localhost:4000/api/mbti/create-todo', {
        user_id: userId,
        category_id: categoryId,
        task_name: taskName,
        task_description: taskDescription,
        due_date: dueDate,
        is_custom: true
      });
      alert(`TO-DO 생성 완료! id: ${res.data.todo_id}`);
      setTaskName('');
      setTaskDescription('');
      setDueDate('');
    } catch (err) {
      alert('TO-DO 생성 실패: ' + err.response?.data?.error);
    }
  };

  return (
    <div>
      <h2>직접 TO-DO 작성</h2>
      <input placeholder="할 일 제목" value={taskName} onChange={e => setTaskName(e.target.value)} /><br/>
      <textarea placeholder="설명" value={taskDescription} onChange={e => setTaskDescription(e.target.value)} /><br/>
      <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} /><br/>
      <button onClick={handleCreate}>TO-DO 생성</button>
    </div>
  );
}
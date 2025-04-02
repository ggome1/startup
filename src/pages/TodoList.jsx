// ✅ 생성된 TO-DO 리스트 출력 화면 (TodoList.jsx)
import { useEffect, useState } from 'react';
import axios from 'axios';

export function TodoList({ userId }) {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:4000/api/todo/list?user_id=${userId}`)
      .then(res => setTodos(res.data.todos))
      .catch(err => alert('TO-DO 불러오기 실패: ' + err.message));
  }, [userId]);

  return (
    <div>
      <h2>내 TO-DO 리스트</h2>
      <ul>
        {todos.map(todo => (
          <li key={todo.todo_id}>
            <strong>{todo.task_name}</strong> ({todo.task_status})<br/>
            <small>{todo.task_description}</small><br/>
            <em>기한: {todo.due_date}</em>
          </li>
        ))}
      </ul>
    </div>
  );
}
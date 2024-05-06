import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [ToDos, setTodos] = useState([]);
  const [ToDo, setTodo] = useState('');
  const [currentDay, setCurrentDay] = useState('');
  const [editTodoId, setEditTodoId] = useState(null);

  const getCurrentDay = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date();
    const day = date.getDay();
    setCurrentDay(days[day]);
  }

  useEffect(() => {
    getCurrentDay();
  }, [])

  const handleDeleteTodo = (id) => {
    const filteredTodos = ToDos.filter((obj) => obj.id !== id);
    setTodos(filteredTodos);
  }

  const handleEditToDo = (obj) => {
    setEditTodoId(obj.id);
    setTodo(obj.text);
  }

  const handleAddOrUpdateToDo = () => {
    if (editTodoId !== null) {
      const updatedTodos = ToDos.map((item) => {
        if (item.id === editTodoId) {
          return { ...item, text: ToDo };
        }
        return item;
      });
      setTodos(updatedTodos);
      setEditTodoId(null);
      console.log(updatedTodos)
    } else {
      setTodos([...ToDos, { id: Date.now(), text: ToDo, status: false }]);
    }
    setTodo('');
  }

  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Whoop, it's {currentDay} 🌝 ☕ </h2>
      </div>
      <div className="input">
        <input value={ToDo} onChange={(e) => setTodo(e.target.value)} type="text" placeholder="🖊️ Add item..." />
        <i onClick={handleAddOrUpdateToDo} className="fas fa-plus"></i>
      </div>
      <div className="todos">
        {ToDos.map((obj) => (
          <div className="todo" key={obj.id}>
            <div className="left">
              <input
                onChange={(e) => {
                  const updatedTodos = ToDos.map((item) => {
                    if (item.id === obj.id) {
                      return { ...item, status: e.target.checked };
                    }
                    return item;
                  });
                  setTodos(updatedTodos);
                }}
                checked={obj.status}
                type="checkbox"
              />
              <p style={{ textDecoration: obj.status ? 'line-through' : 'none' }}>{obj.text}</p>
            </div>
            <div className="right">
              <i onClick={() => handleEditToDo(obj)} className="fa-regular fa-pen-to-square"></i>
              <i onClick={() => handleDeleteTodo(obj.id)} className="fas fa-times"></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
import React, { useEffect, useState } from 'react';

function TodoList() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/todo');
                const data = await res.json();
                setTodos(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchTodos();
    }, []);

    return (
        <div>
            {todos.map((todo) => (
                <div key={todo._id}>
                    <p>{todo.userId}</p>
                    <h2>{todo.title}</h2>
                    <p>{todo.desc}</p>
                </div>
            ))}
        </div>
    );
}

export default TodoList;

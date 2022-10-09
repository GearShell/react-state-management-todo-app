import React, { useState, useEffect } from "react";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [todosDelete, setTodosDelete] = useState([]);
  const [todosDone, setTodosDone] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const saveData = (newTodos) => {
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const saveDataDelete = (newTodos) => {
    localStorage.setItem("todosDelete", JSON.stringify(newTodos));
  };

  const saveDataDone = (newTodos) => {
    localStorage.setItem("todosDone", JSON.stringify(newTodos));
  };

  useEffect(() => {
    if (localStorage.getItem("todos")) {
      setTodos(JSON.parse(localStorage.getItem("todos")));
    }
    if (localStorage.getItem("todosDelete")) {
      setTodosDelete(JSON.parse(localStorage.getItem("todosDelete")));
    }
    if (localStorage.getItem("todosDone")) {
      setTodosDone(JSON.parse(localStorage.getItem("todosDone")));
    }
  }, []);

  const onAddTodo = () => {
    setNewTodo('');
    console.log('new todo',newTodo)
    if (newTodo.trim()) {
      let newTodos = [...todos, { todo: newTodo.trim(), id: Date.now() }];
      setTodos(newTodos);
      saveData(newTodos);
    }
  };

  const deleteTodo = (id) => {
    let newTodos2=todos.filter((todo) => todo.id == id);
    
    saveDataDelete(todosDelete.concat(newTodos2));
    setTodosDelete(todosDelete.concat(newTodos2));
    let newTodos = todos.filter((todo) => todo.id !== id);
    // console.log(newTodos);
    saveData(newTodos);
    setTodos(newTodos);
  };

  const doneTodo = (id) => {
    let newTodos3=todos.filter((todo) => todo.id == id);
    
    saveDataDone(todosDone.concat(newTodos3));
    setTodosDone(todosDone.concat(newTodos3));
    let newTodos = todos.filter((todo) => todo.id !== id);
    // console.log(newTodos);
    saveData(newTodos);
    setTodos(newTodos);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">To-Do List</h2>

      <table className="table table-light mt-5">
        <thead>
          <tr>
            <th>
              <input
                type="text"
                id="todoInput"
                className="form-control"
                placeholder="Enter Here..."
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
              />
            </th>
            <th>
              <button className="btn btn-primary" onClick={onAddTodo}>
                Add
              </button>
            </th>
          </tr>
        </thead>
        <thead>
          <tr>
            <th scope="col">Notes</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>

        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.todo}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTodo(todo.id)}
                >
                  Delete
                </button>
                <button
                  className="btn btn-danger ms-2"
                  onClick={() => doneTodo(todo.id)}
                >
                  Done
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="row">
        <div className="col-6">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Deleted Notes</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {todosDelete.map((todo) => (
                <tr key={todo.id}>
                  <td>{todo.todo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-6">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Done Notes</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {todosDone.map((todo) => (
                <tr key={todo.id}>
                  <td>{todo.todo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Todo;

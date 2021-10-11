import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';


const App = () => {

  const [todos, setTodos] = useState([])
  const [todo, setTodo] = useState({title: '', price: ''})
  const [todoEditing, setTodoEditing] = useState(null)
  const [editingText, setEditingText] = useState({title: '', price: ''})
  const sumProduct = todos.reduce((sum, todo) => todo.price + sum, 0)

//  console.log(todos.reduce((sum, todo) => todo.price + sum, 0))


React.useEffect(() => {
  const json = localStorage.getItem("todos");
  const loadedTodos = JSON.parse(json);
  if (loadedTodos) {
    setTodos(loadedTodos);
  }
}, []);

React.useEffect(() => {
  const json = JSON.stringify(todos);
  localStorage.setItem("todos", json);
}, [todos]);

 
  function handleSubmit (e) {
    e.preventDefault();

    const newTodo = {
      id: new Date().getTime(),
      ...todo
    };
    setTodos([...todos, newTodo]);
    console.log(setTodo({title: '', price: ''}))
  }

  function deleteTodo(id) {
    let updatedTodos = [...todos].filter((todo) => todo.id != id);
    setTodos(updatedTodos);
  }

  function deleteEverythink(id) {
    let updatedTodos = [...todos].filter((todo) => todo.id === id);
    setTodos(updatedTodos);
  }

  function submitEdits(id) {
    const updatedTodos = [...todos].map((todo) => {
      if(todo.id === id){
        todo = editingText
        console.log(editingText)
      }
      return todo
    });
    setTodos(updatedTodos);
    setTodoEditing(null)
  }

  return<div className='main'> 
  <div className='mainwrapper'>
    <h1>Калькулятор расходов</h1>
    <form className='form' onSubmit={handleSubmit}>
      <div className='podform'>
      <input 
        className='inptitle'
        placeholder='название товара'
        type='text'
        onChange={e => setTodo({...todo, title: e.target.value})}
        value={todo.title}/>
      <input
        className='inpprice'
        placeholder='ценна товара'
        type='number'
        onChange={e => setTodo({...todo, price: +e.target.value})}
        value={todo.price}/>
      <button className='btnAdd' type='submit'>Add Todo</button>
      </div>
    </form>
    <br/>
    <br/>
    
    {todos.map((todo) => (
      <div key={todo.id} className='todo'>
        <div className='todo-text'>
          {todo.id === todoEditing ? (
              <input
              className='editTitle'
              type='text'
              onChange={(e) => setEditingText({...editingText, title: e.target.value})}/>
          ) : (
            <div className='title'>{todo.title}</div>
          )}

           {todo.id === todoEditing ? (
              <input
              className='editPrice'
              type='number'
              onChange={(e) => setEditingText({...editingText, price: +e.target.value})}/>
          ) : (
            <strong className='price'>{todo.price} р.</strong>
          )}

          
          
          
        
        <div className="todo-actions">
          {todo.id === todoEditing ? (
            <button onClick={() => submitEdits(todo.id)}>Submit Edits</button>
          ) : (
            <button className='edit' onClick={() => setTodoEditing(todo.id)}>Редактировать</button>
          )}

          <button className='delete' onClick={() => deleteTodo(todo.id)}>Удалить</button>
          
        </div>
      </div>
      <hr/>
      </div>
      
    ))}
    <div className='sum'>
       <p className='everysum'>Общая сумма {sumProduct} р.</p>
       <button className='cleareverythink' onClick={() => deleteEverythink(todo.id)}>очистить список</button>
    </div>
  </div>
  </div>
}



export default App;
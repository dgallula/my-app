import React, { useState, useEffect } from 'react';
import store from '../store';
import styled from 'styled-components';

 
const Todo = () => {
  /**
7
   * Defining two local states to store
8
   * - The newTodo text (from input)
9
   * - The list of todos coming from the store
10
   */
  const [newTodo, setNewTodo] = useState('');
  const [todos, setTodos] = useState([]);
  /**
15
   * At component mounting, subscribe to the store
16
   * then call the syncStore() method
17
   */
  useEffect(() => {
    store.subscribe(() => syncStore())
  }, []);
  /**
23
   * Set local todos state with global state coming from the store
24
   */
  const syncStore = () => {
    setTodos(store.getState());
  };
  /**
30
   * Set local newTodo state with current input value
31
   * @param {Object} event 
32
   */
  const handleChange = (event) => {
    setNewTodo(event.target.value);
  };
  /**
38
   * Handle the "create todo" button
39
   * reset the input value then
40
   * dispatch ADD_TODO action with the new todo as it's payload
41
   * @param {Object} event 
42
   */
  const handleCreate = (event) => {
    setNewTodo('');
    store.dispatch({
      type: 'ADD_TODO',
      payload: {
        id: Math.random(),
        content: newTodo,
        done: false
      }
    })
  };
  /**
56
   * Handle the "done" button click
57
   * dispatch the SET_DONE action that will toggle the "done"
58
   * property on the todo whose "done" button is being clicked
59
   * @param {number} id 
60
   */
  const handleDone = (id) => {
    store.dispatch({
      type: 'SET_DONE',
      payload: id
    });
  };
  /**
69
   * Handle the "reset todos" button
70
   * dispatch the RESET_TODOS action that will empty the global state
71
   */
  const handleReset = () => {
    store.dispatch({ type: 'RESET_TODOS' });
  }
  return (
    <Wrapper>
      <NewTodo>
        <Input
          type="text"
          value={newTodo}
          onChange={handleChange}
        />
        <Button onClick={handleCreate}>Créer le todo</Button>
      </NewTodo>
      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
          >
            {todo.content}
            <Button onClick={() => handleDone(todo.id)}>Fait</Button>
          </TodoItem>
        ))}
      </ul>
      <ResetButton onClick={handleReset}>Réinitialiser les TODO</ResetButton>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  width: 48rem;
  background: #fff;
  padding: 1rem;
  border-radius: 6px;
`;
const NewTodo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  & > * {
    margin: 0 0.5rem;
  }
`;  
const Input = styled.input`
  height: 40px;
  padding: 0 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  flex: 1;
`;
const Button = styled.button`
  height: 40px;
  border: 0;
  background: #5352ed;
  color: #fff;
  font-weight: bold;
  font-size: 0.8rem;
  border-radius: 6px;
  padding: 0 2rem;
  margin-left: 1rem;
`;
const ResetButton = styled(Button)`
  background: #ff4757;
  margin: 2rem 0;
`;
const TodoItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 1rem 0;
  padding: 1rem;
  background: #f5f5f5;
  color: ${props => props.todo.done ? '#ccc' : '#404040'};
  text-decoration: ${props => props.todo.done ? 'line-through' : 'initial'};
`;
export default Todo;

import {createStore } from 'redux';
const todosReducer = (state = [], action) => {
  switch(action.type) {
    case 'ADD_TODO':
      /**
       * We spread the existing todos, and add the new at the end
       */
      return [...state, action.payload];
    case 'SET_DONE':
      /**
12
       * The start by finding the todo matching with the id
13
       * passed as action.payload.
14
       * We then display that item with the modified "done" property
15
       * followed by the rest of the todos.
16
       */
      const item = state.find((todo) => todo.id === action.payload);
      return [
        {...item, done: true},
        ...state.filter((todo) => todo.id !== action.payload)
      ];
    case 'RESET_TODOS':
      /**
       * Resetting the todos array to it's original form: empty
       */
      return [];
    default:
      return state;
  };
};
const store = createStore(todosReducer);
export default store;
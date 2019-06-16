// Goals of a state manager
// 1. Represent the state
// 2. Get the state
// 3. Listen to changes on the state
// 4. Update the state

const ADD_TODO = 'ADD_TODO'
const REMOVE_TODO = 'REMOVE_TODO'
const TOGGLE_TODO = 'TOGGLE_TODO'
const ADD_GOAL = 'ADD_GOAL'
const REMOVE_GOAL = 'REMOVE_GOAL'

//Example action
{
    type: ADD_TODO,
    todo: {
        id: 0,
        name: "Learn redux",
        complete: false
    }
}

{
    type: REMOVE_TODO,
    id: 0,
  }
  
  {
    type: TOGGLE_TODO,
    id: 0,
  }

  {
    type: ADD_GOAL,
    goal: {
      id: 0,
      name: 'Run 5 miles per day'
    }
  }
  
  {
    type: REMOVE_GOAL,
    id: 0
  }

// Reducer function
function todos (state = [], action) {
    switch(action.type) {
    case 'ADD_TODO':
      return state.concat([action.todo])
    case: REMOVE_TODO
        return state.filter( (todo) => todo.id !== action.id )
   case:TOGGLE_TODO
      return state.map( (todo) => todo.id !== action.id ? todo : Object.assign({}, todo, {complete: !todo.complete }))
    default:
        return state
  }

  function goals(state = [], action) {
      switch(action.type) {
          case ADD_GOAL:
            return state.concat([action.goal])
      }
  }

function app(state = {}, action) {
    return {
        todos: todos(state.todos, action),
        goals: goals(state.goals, action)
    }
}

function createStore(reducer) {
    let state
    let listeners = []

    const getState = () => state


    const subscribe = (listener) => {
        listeners.push(listener)
        return () => {
            listeners = listeners.filter((l) => l !== listener)
        }
    }

    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach((listener) => listener());
    }
    
    return {
        getState,
        subscribe,
        dispatch
    }
}

const store = createStore(app)

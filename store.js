// Goals of a state manager
// 1. Represent the state
// 2. Get the state
// 3. Listen to changes on the state
// 4. Update the state

//Example action
{
    type: "ADD_TODO",
    todo: {
        id: 0,
        name: "Learn redux",
        complete: false
    }
}


// Reducer function
function todos (state = [], action) {
    if (action.type === 'ADD_TODO') {
      return state.concat([action.todo])
    }
    else if(action.type === 'REMOVE_TODO') {
        return state.filter( (todo) => todo.id !== action.id )
    }
    else if(action.type === 'TOGGLE_TODO') {
      return state.map( (todo) => todo.id !== action.id ? todo : Object.assign({}, todo, {complete: !todo.complete }) )
  }
  
    return state
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
        debugger;
        listeners.forEach((listener) => listener());
    }
    
    return {
        getState,
        subscribe,
        dispatch
    }
}

const store = createStore(todos)

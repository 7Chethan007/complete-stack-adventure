import React, { useReducer, useState } from 'react'


// Button Click → dispatch(action) ─────▶ reducer(state, action)
//                                            │
//                                            ▼
//                                      returns NEW state
//                                            │
//                                            ▼
//                                      React updates UI


// Reducer function is a pure function that (coffee maker)
// takes the current state (coffee powder) and an action (water) as arguments, 
// and returns a new state (coffee) based on the action type.

// pure function : 10 + 5 = 15 no side effects
const reducer = (state, action) => {
    console.log('Reducer function called with state:', state, 'and action:', action)
    if(action.type === 'INCREMENT') {
        return { count: state.count + 1 }
    } else if(action.type === 'DECREMENT') {
        return { count: state.count - 1 }
    }
    else {
        throw new Error('Unknown action type')
    }
}

const App = () => {
    // const [count, setCount] = React.useState(0)
    // console.log(count)
    // console.log(setCount)

    // userRuder(function, initialState)
    const [state, dispatch] = useReducer(reducer, { count: 0 })

    const handleClickInc = () => {
        //setCount(count + 1)
        dispatch({ type: 'INCREMENT' }) 
        // Triggers the dispatch function with an action
        // here  const [state, dispatch] = useReducer(reducer, { count: 0 })
        // dispatch function sends the action to the reducer function
    }
    const handleClickDec = () => {
        // setCount(count - 1)
        dispatch({ type: 'DECREMENT' })
    }
    return (
        <div>
            <h1>{state.count}</h1>
            <button onClick={handleClickInc}>+</button>
            <button onClick={handleClickDec}>-</button>
        </div>
    )
}

export default App

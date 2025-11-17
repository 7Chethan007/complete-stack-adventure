import React, { useState, useEffect, use } from 'react'

const UseEffect = () => {

  // useEffect hook lets us perform side effects in function components
  // It has 2 arguments: a function and a dependency array (optional)
  // It gets triggered after every render by default
  useEffect(() => {
    // Code to run after render or update
    alert("We are in UseEffect Component");
  }, []); // Optional dependency array
  // Without dependency array, it runs after every render
  // With empty array, it runs only once after initial render
  // With dependencies in array, it runs when those dependencies change
  const [clicked, setClicked] = useState('');
  const [count, setCount] = useState(0);

  // useEffect(() => {
  //   alert(`Button clicked: ${clicked}`);
  // }, [clicked]); // Runs when 'clicked' state changes
  // // if [clicked] is not provided, then after each increment of count, alert will be shown for clicked state

  // useEffect(() => {
  //   alert(`Count value: ${count}`);
  // }, [clicked,count]); 
  // // Runs and renders and alerts 
  // // when either 'clicked' or 'count' state changes


  // Cleanup function example
  useEffect(() => {
    console.log('Effect function called');

    // First the return function (cleanup) is called before the next effect/unmounting/anything on top of it
    // So we can use it to cleanup subscriptions, timers, etc.
    return () => {
      console.log('Cleanup function called before next effect or unmounting');
    }
  }, [clicked,count]); 

  return (
    <div>
      <button onClick={() => setClicked('Subscribe')}>Subscribe</button>
      <br />
      <hr />
      <button onClick={() => setClicked('to')}>to</button>
      <br />
      <hr />
      <button onClick={() => setClicked('DropXOut')}>DropXOut</button>
      <br />
      <hr />
      <h1>{clicked}</h1>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
      <h2>Count: {count}</h2>
    </div>
  )
}

export default UseEffect

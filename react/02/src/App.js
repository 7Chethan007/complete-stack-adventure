import React, {useState} from 'react';
function App() {
    // console.log(useState("Chethan"))
    const [count, setCount] = useState(0);
    console.log(count);
    console.log(setCount);

    const handleClickInc = () => {
        setCount(count + 1);
    }

    const handleClickDec = () => {
        setCount(count - 1);
    }

    return (
        <>
        <h1>{count}</h1>
        <button onClick={handleClickInc}>+</button>
        <button onClick={handleClickDec}>-</button>
        </>
    )
}

export default App;
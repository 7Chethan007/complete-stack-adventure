import React from 'react'
import datas from './datas.json'

const Data = () => {
    // useState returns an array with 2 items
    // 1st item is the current state value
    // 2nd item is a function that lets us update the state value
    const [nData, setnData] = React.useState(datas);
    // console.log(nData);
    const clearData = () => {
        setnData([]);
    }
    const incrementData = () => {
        // Add new example items
        const newItems = [
            { id: nData.length + 1, name: `Item ${nData.length + 1}` },
            { id: nData.length + 2, name: `Item ${nData.length + 2}` }
        ];
        setnData([...nData, ...newItems]);
    }
    const removeCurrentItem = (itemID) => {
        // Filter out the item with the specified ID & update state
        // !== itemID means keep all items except the one with itemID
        setnData(nData.filter(item => item.id !== itemID));
    }
    const changeItemname = (itemID) => {
        setnData(nData.map(item => {
            if (item.id === itemID) {
                return {name: `Updated Name ${itemID}` };
            } else {
                return item;
            }
        }));
    }

    return (
        <div>
            <ul>
                {
                    nData.map((items) => (
                        <li key={items.id}>
                            {items.name}
                            {/* <button onClick={removeCurrentItem(items.id)}>Remove</button> 
                         Not possible to call function if it has an argument So....*/}
                            <button onClick={() =>
                                removeCurrentItem(items.id)}
                            >Remove
                            </button>
                            <button onClick={() =>
                                changeItemname(items.id)}
                            >Update Name
                            </button>
                        </li>
                    ))
                }
            </ul>
            <button onClick={clearData}>Clear Data</button>
            <button onClick={incrementData}>Increment Data</button>
        </div>
    )
}

export default Data

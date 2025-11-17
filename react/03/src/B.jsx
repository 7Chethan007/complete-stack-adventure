import React, { useContext } from 'react'
// import { GreetContext, Greet2Context } from './A'
import { GreetContext } from './A'
import C from './C'

const B = () => {

    const value = useContext(GreetContext);
    // const value2 = useContext(Greet2Context);
    return (
        <div>
            {/* 
        As b in wrapped in the GreetContext.Provider in A component
        so we can access the value using useContext hook
        Let's print the value here now that was passed from A to B
        a.value + " from B component"
      */}

            {/* {now 2 different components } */}
            {/* <h1>{value} from B component</h1>
            <h2>{value2} from B component</h2> */}
        
            {/* one component 2 values */}
            <h1>{value.greet} and {value.greet2} from B component</h1>

            <C />
            {/* we need to call <C />
                if not <C /> won't be rendered
                As C is no longer in the tree under Provider
                And Context API will only work for components 
                that are descendants of the Provider (in a Tree) */}
        </div>
    )
}

export default B

import React, { useContext } from 'react'
// import { GreetContext, Greet2Context } from './A'
import { GreetContext } from './A'




const C = () => {
    const useCon = useContext(GreetContext);

    return (
        <h2> {useCon.greet} and {useCon.greet2} from C component</h2>
    )












    // const useCon = useContext(GreetContext);
    // const useCon2 = useContext(Greet2Context);
    // return (

    //     <h1> {useCon} and {useCon2} from C component</h1>



    //     // Single Context API Consumer
    //     // <GreetContext.Consumer>
    //     //     {
    //     //         (value) => {
    //     //             return (
    //     //                 <h1>{value} from C component</h1>
    //     //             )
    //     //         }
    //     //     }
    //     // </GreetContext.Consumer>



    //     // // Nested or 2 or more ContextAPI Consumer
    //     // <GreetContext.Consumer>
    //     //     {
    //     //         (value) => {
    //     //             return (
    //     //                 <Greet2Context.Consumer>
    //     //                     {
    //     //                         (value2) => {
    //     //                             return (
    //     //                                 <h2>{value} and {value2} from C component</h2>
    //     //                             )
    //     //                         }
    //     //                     }
    //     //                 </Greet2Context.Consumer>
    //     //             )
    //     //         }
    //     //     }
    //     // </GreetContext.Consumer>
    //     // Too complicated way to use multiple Context Consumer






    // )
}

export default C

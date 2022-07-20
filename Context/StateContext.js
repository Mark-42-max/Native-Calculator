import { createContext, useState } from "react";

//invoke and export createcontext component
export const StateContext = createContext();


export const StateProviders = (props) => {
    //setting up state
    const [result, setResult] = useState(0);

    return (
        <StateContext.Provider value={[result, setResult]}>
            {props.children}
        </StateContext.Provider>
    )
}
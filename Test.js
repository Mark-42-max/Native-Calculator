import React, { useContext, useEffect } from 'react'
import {StateContext} from './Context/StateContext.js';

export const Test = () => {

    const [result, setResult] = useContext(StateContext);
    useEffect(() => {
        console.log(result);
        setResult(result => result + 1);
    }, []);

  return (
    <></>
  )
}
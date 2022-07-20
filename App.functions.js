import { useContext } from "react"
import { StateContext } from "./Context/StateContext"

//Function to handle button clicks
export const handlePress = (text) => {

    const [countField, setCountField, resultField, setResultField] = useContext(StateContext);

    //If the button is a equals button, validate and calculate the result
    if (text === '=') {
        return validate(countField) && calculateResult(countField);
    }

    //If the button is a clear button, clear the screen
    if (text === ClearScreen) {
        setCountField(0);
        setResultField();
        return;
    }

    //If the button is a delete button, delete the last character
    if (text === DelChar) {

        setCountField(count => {
            let stringifiedCount = count.toString();

            if (stringifiedCount.length === 1 || stringifiedCount.length === 0) {
                return 0;
            }

            return stringifiedCount.slice(0, -1);
        });
        return;
    }

    //set calculate field for any other button inputs
    setCountField(count => {

        //If the count field is empty, set it to the value of the button
        //Exclude the operations buttons and add them as strings
        if (count === 0) {
            if (Operators.includes(text)) {
                return count + text;
            }
            return text.toString();
        }
        //If the count field is not empty, add the value of the button to the count field
        //as string
        if (Number.isInteger(text) && !isNaN(text)) {
            return count + text.toString();
        }

        //Validate if two operation buttons are pressed at back to back
        if (Operators.includes(text)) {
            let lastChar = count.slice(-1);
            if (Operators.includes(lastChar)) {
                return count;
            }
            return count + text;
        }

        //Add the value of the button to the count field as string elsewhere
        return count + text;
    });
}


//Function to calculate the result
const calculateResult = count => {
    let result = eval(count);
    setResultField(result);
    setCountField(result.toString());
    saveCalc(result);
}

//Function to validate the input
const validate = value => {
    let lastChar = value.slice(-1);
    if (Operators.includes(lastChar)) {
        return false;
    }

    return true;
}
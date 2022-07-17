import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';

export default function App() {

  // Declare some immutable literals to use in the code
  const Operators = ['+', '-', '*', '/', '.'];
  const DelChar = 'DEL';
  const ClearScreen = 'C';

  //State variables
  const [countField, setCountField] = useState(0);
  const [resultField, setResultField] = useState();

  //Function to Validate input 
  const validate = value => {
    let lastChar = value.slice(-1);
    if (Operators.includes(lastChar)) {
      return false;
    }

    return true;
  }

  //Function to handle button clicks
  const handlePress = (text) => {

    //If the button is a equals button, validate and calculate the result
    if(text === '='){
      return validate(countField) && calculateResult(countField);
    }

    //If the button is a clear button, clear the screen
    if(text === ClearScreen){
      setCountField(0);
      setResultField();
      return;
    }

    //If the button is a delete button, delete the last character
    if(text === DelChar){

      setCountField(count => {
        let stringifiedCount = count.toString();

        if(stringifiedCount.length === 1 || stringifiedCount.length === 0){
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
      if(count === 0){
        if(Operators.includes(text)){
          return count + text;
        }
        return text.toString();
      }
      //If the count field is not empty, add the value of the button to the count field
      //as string
      if(Number.isInteger(text) && !isNaN(text)){
        return count + text.toString();
      }

      //Validate if two operation buttons are pressed at back to back
      if(Operators.includes(text)){
        let lastChar = count.slice(-1);
        if(Operators.includes(lastChar)){
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
  }

  //populate number of rows dynamically and for each row element or column create a 
  //touchfield
  let rows = [];

  for(let i = 0; i < 4; i++) {
    let row = [];
    let nums = [[1, 2, 3], [4, 5, 6], [7, 8, 9], ['.', 0, '=']];
    for(let j = 0; j < 3; j++){
      row.push(<TouchableOpacity onPress={() => handlePress(nums[i][j])} key={j} style={styles.buttons}>
        <Text style={styles.btnText}>{nums[i][j]}</Text>
      </TouchableOpacity>);
    }

    rows.push(<View key={i} style={styles.row}>{row}</View>);
  }

  //Operations buttons populate dynamically
  let ops = [];
  let operations = [DelChar, ClearScreen, ...Operators];

  for(let i = 0; i < 6; i++){
    ops.push(<TouchableOpacity onPress = {() => handlePress(operations[i])} key={i} style={styles.touch}>
      <Text style={[styles.btnText, styles.white]}>{operations[i]}</Text>
    </TouchableOpacity>);
  }

  return (
    <View style={styles.container}>
      <View style={styles.calculation}>
        <Text style={styles.calculationText}>{countField}</Text>
      </View>
      <View style={styles.result}>
        <Text style={styles.resultText}>{resultField}</Text>
      </View>
      <View style={styles.buttons}>
        <View style={styles.numbers}>

        {/* Map the rows */}
        {rows}

        </View>
        <View style={styles.operators}>
          {/* Map the operators */}
          {ops}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  result: {
    flex: 1,
    backgroundColor: '#F1F1F1',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingHorizontal: 10,
  },
  calculation: {
    flex: 2,
    backgroundColor: 'white',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingHorizontal: 10,
  },
  resultText: {
    fontSize: 50,
    color: 'black',
  },
  calculationText: {
    fontSize: 40,
    color: 'black',
  },
  buttons: {
    flex: 7,
    flexDirection: 'row',
  },
  numbers: {
    flex: 3,
    backgroundColor: '#7FFFD4',
    paddingLeft: 40,
  },
  operators: {
    flex: 2,
    justifyContent: 'space-around',
    backgroundColor: 'black',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  touch:{
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  btnText: {
    fontSize: 30,
  },
  white: {
    color: 'white',
  }
});

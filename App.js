import React, {useState, useEffect} from 'react';
import { Text, View, TouchableOpacity , ScrollView, SafeAreaView} from 'react-native';
import {saveCalc, getCalc} from './App.history.js';
import {StateProviders} from './Context/StateContext.js';
import {Test} from './Test';
import styles from './App.styles.js';

export default function App() {

  // Declare some immutable literals to use in the code
  const Operators = ['+', '-', '*', '/', '.'];
  const DelChar = 'DEL';
  const ClearScreen = 'C';

  //State variables
  const [countField, setCountField] = useState(0);
  const [resultField, setResultField] = useState();

  useEffect(() => {
    console.log(getCalc());
  },[countField]);

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
    saveCalc(result);
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
    <StateProviders>
    <SafeAreaView style={styles.container}>

      {getCalc().length > 0 ?
      <ScrollView style={styles.history}>
      {getCalc().map(item => <Text key={item} style={styles.historyText}>{item}{"\n"}</Text>)}
    </ScrollView>
    : null}


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
    </SafeAreaView>
    <Test />
    </StateProviders>
  );
}


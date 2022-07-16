import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';

export default function App() {

  const Operators = ['+', '-', '*', '/', '.'];
  const DelChar = 'DEL';
  const ClearScreen = 'C';

  const [countField, setCountField] = useState(0);
  const [resultField, setResultField] = useState();

  useEffect(() => {
    console.log(typeof countField, countField);
  }, [countField, resultField]);

  const validate = value => {
    let lastChar = value.slice(-1);
    if (Operators.includes(lastChar)) {
      return false;
    }

    return true;
  }

  const handlePress = (text) => {
    if(text === '='){
      return validate(countField) && calculateResult(countField);
    }

    if(text === ClearScreen){
      setCountField(0);
      setResultField();
      return;
    }

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

    setCountField(count => {
      if(count === 0){
        if(Operators.includes(text)){
          return count + text;
        }
        return text.toString();
      }
      if(Number.isInteger(text) && !isNaN(text)){
        return count + text.toString();
      }

      if(Operators.includes(text)){
        let lastChar = count.slice(-1);
        if(Operators.includes(lastChar)){
          return count;
        }
        return count + text;
      }

      return count + text;
    });
  }

  const calculateResult = count => {
    console.log(count);
    let result = eval(count);
    setResultField(result);
    setCountField(result.toString());
  }

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

        {rows}

        </View>
        <View style={styles.operators}>
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

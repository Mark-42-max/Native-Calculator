import React, {useEffect, useContext} from 'react';
import { Text, View, TouchableOpacity , ScrollView, SafeAreaView} from 'react-native';
import { getCalc} from './App.history.js';
import {StateContext} from './Context/StateContext.js';
import {handlePress} from './App.functions';
import { Operators, DelChar, ClearScreen } from './App.literals.js';
import styles from './App.styles.js';

export default function Calculations() {
  
    //State variables
    // const [countField, setCountField] = useState(0);
    // const [resultField, setResultField] = useState();

    const [countField, resultField] = useContext(StateContext);
  
    useEffect(() => {
      console.log(getCalc());
    },[countField]);

  
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
    );
  }
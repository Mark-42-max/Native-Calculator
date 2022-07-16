import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.result}>
        <Text style={styles.resultText}>121</Text>
      </View>
      <View style={styles.calculation}>
        <Text style={styles.calculationText}>11 * 11</Text>
      </View>
      <View style={styles.buttons}>
        <View style={styles.numbers}>

          <View style={styles.row}>
            <TouchableOpacity style={styles.touch}>
              <Text>0</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.touch}>
              <Text>0</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.touch}>
              <Text>0</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <Button title="0" />
            <Button title="0" />
            <Button title="0" />
          </View>

          <View style={styles.row}>
            <Button title="0" />
            <Button title="0" />
            <Button title="0" />
          </View>

          <View style={styles.row}>
            <Button title="0" />
            <Button title="0" />
            <Button title="0" />
          </View>

        </View>
        <View style={styles.operators}>
          <Button title='+'/>
          <Button title='+'/>
          <Button title='+'/>
          <Button title='+'/>
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
    flex: 2,
    backgroundColor: 'red',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingHorizontal: 10,
  },
  calculation: {
    flex: 1,
    backgroundColor: 'blue',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingHorizontal: 10,
  },
  resultText: {
    fontSize: 30,
    color: 'white',
  },
  calculationText: {
    fontSize: 40,
    color: 'white',
  },
  buttons: {
    flex: 7,
    flexDirection: 'row',
  },
  numbers: {
    flex: 3,
    backgroundColor: 'yellow',
  },
  operators: {
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: 'black',
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
    backgroundColor: 'white',
    alignSelf: 'stretch',
  }
});

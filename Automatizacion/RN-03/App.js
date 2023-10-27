import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [count, setCount] = useState(0);
  const sum = () => setCount(count + 1);
  const res = () => setCount(count - 1);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contador</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={res}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <View style={styles.countDisplay}>
          <Text style={styles.countText}>{count}</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={sum}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'skyblue',
    borderRadius: 30,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  countDisplay: {
    backgroundColor: 'lightgray',
    borderRadius: 15,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  countText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

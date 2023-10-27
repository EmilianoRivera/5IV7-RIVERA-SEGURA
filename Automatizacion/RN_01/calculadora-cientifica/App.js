import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const buttonWidth = width / 6; // Ancho de 5 columnas
/*
PARA JIMMY: 


  para el sistema distribuido: 
  crear un socket.
  Con servlets y sockets
  twofish
 */
const Calculadora = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [operator, setOperator] = useState(null);
  const [prevValue, setPrevValue] = useState(null);
  const [operations, setOperations] = useState([]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 50,
      backgroundColor: '#2C2C2C',
    },
    display: {
      fontSize: 40,
      marginBottom: 20,
      color: '#EFEFEF',
      paddingHorizontal: 15,
      backgroundColor: '#333',
      borderRadius: 5,
      overflow: 'hidden',
    },
    buttons: {
      width: '100%',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    button: {
      width: buttonWidth,
      height: buttonWidth,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: buttonWidth / 2,
      backgroundColor: '#424242',
      elevation: 5,
    },
    buttonText: {
      fontSize: 24,
      color: '#A1A1FF',
      fontWeight: 'bold',
    },
    operationsText: {
      fontSize: 20,
      marginBottom: 15,
      color: '#B8B8B8',
      paddingHorizontal: 10,
    },
  });
  const [ans, setAns] = useState(null);

  const NumberInput = (num) => {
    setDisplayValue(displayValue === '0' ? num : displayValue + num);
  };

  const OperacionInput = (op) => {
    setOperator(op);
    setPrevValue(displayValue);
    setDisplayValue('');
    setOperations((prevOperations) => [...prevOperations, displayValue, op]);
  };

  const Operaciones = () => {
    let result = 0;
    switch (operator) {
      case '+':
        result = parseFloat(prevValue) + parseFloat(displayValue);
        break;
      case '-':
        result = parseFloat(prevValue) - parseFloat(displayValue);
        break;
      case '*':
        result = parseFloat(prevValue) * parseFloat(displayValue);
        break;
      case '/':
        result = parseFloat(prevValue) / parseFloat(displayValue);
        break;
      case '^':
        result = Math.pow(parseFloat(prevValue), parseFloat(displayValue));
        break;
      default:
        result = displayValue;

    }


    setAns(result);
    setDisplayValue(result.toString());
    setOperator(null);
    setPrevValue(null);
    setOperations([]);
  };

  const Limpiar = () => {
    setDisplayValue('0');
    setOperator(null);
    setPrevValue(null);
    setOperations([]);
  };
  const handleAns = () => {
    if (ans !== null) {
      setDisplayValue(ans.toString());
    }
  };

  const Raiz = () => {
    setDisplayValue(Math.sqrt(parseFloat(displayValue)).toString());
  };

  const Seno = () => {
    setDisplayValue(Math.sin(parseFloat(displayValue)).toString());
  };

  const Coseno = () => {
    setDisplayValue(Math.cos(parseFloat(displayValue)).toString());
  };

  const Tangente = () => {
    setDisplayValue(Math.tan(parseFloat(displayValue)).toString());
  };

  const Logaritmo = () => {
    const value = parseFloat(displayValue);
    if (value > 0) {
      setDisplayValue(Math.log(value).toString());
    } else {
      // 
    }
  };
  const PI = () => {
    setDisplayValue(Math.PI.toString());
  };

  const E = () => {
    setDisplayValue(Math.E.toString());
  };


  const Porcentaje = () => {
    if (prevValue !== null) {
      const currentValue = parseFloat(displayValue);
      const porcentaje = (currentValue / 100);
      setDisplayValue(porcentaje.toString());
    } else {
      // validar
    }
  };
  const Exp = () => {
    setOperator('^');
    setPrevValue(displayValue);
    setDisplayValue('');
    setOperations((prevOperations) => [...prevOperations, displayValue, '^']);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.display}>{displayValue}</Text>
      <Text style={styles.operationsText}>{operations.join(' ')}</Text>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={E}>
          <Text style={styles.buttonText}>e</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={PI}>
          <Text style={styles.buttonText}>π</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={Porcentaje}>
          <Text style={styles.buttonText}>%</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={Limpiar}>
          <Text style={styles.buttonText}>C</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={Seno}>
          <Text style={styles.buttonText}>sin</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={Logaritmo}>
          <Text style={styles.buttonText}>log</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => NumberInput('7')}>
          <Text style={styles.buttonText}>7</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => NumberInput('8')}>
          <Text style={styles.buttonText}>8</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => NumberInput('9')}>
          <Text style={styles.buttonText}>9</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => OperacionInput('/')}>
          <Text style={styles.buttonText}>/</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={Coseno}>
          <Text style={styles.buttonText}>cos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={Raiz}>
          <Text style={styles.buttonText}>√</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => NumberInput('4')}>
          <Text style={styles.buttonText}>4</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => NumberInput('5')}>
          <Text style={styles.buttonText}>5</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => NumberInput('6')}>
          <Text style={styles.buttonText}>6</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => OperacionInput('*')}>
          <Text style={styles.buttonText}>*</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={Tangente}>
          <Text style={styles.buttonText}>tan</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={Exp}>
          <Text style={styles.buttonText}>^</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => NumberInput('1')}>
          <Text style={styles.buttonText}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => NumberInput('2')}>
          <Text style={styles.buttonText}>2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => NumberInput('3')}>
          <Text style={styles.buttonText}>3</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => OperacionInput('-')}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleAns}>
          <Text style={styles.buttonText}>Ans</Text>
          </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => NumberInput('0')}>
          <Text style={styles.buttonText}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => NumberInput('.')}>
          <Text style={styles.buttonText}>.</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={Operaciones}>
          <Text style={styles.buttonText}>=</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => OperacionInput('+')}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Calculadora;
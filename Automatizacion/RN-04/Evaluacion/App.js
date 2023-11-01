import React, { useState, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, TextInput, Button, Alert, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Camera from 'expo-camera';
import { UserProvider, UserContext } from './userContent';

const registeredUsers = {};

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Evaluación 2 Parcial</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
      <Text style={styles.txt}>Rivera Segura 5IV7</Text>
    </View>
  );
};

const LoginScreen = ({ navigation }) => {
  const { setCurrentUser } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const userDetails = registeredUsers[username];
    if (userDetails && userDetails.password === password) {
      setCurrentUser(username);
      navigation.navigate('Dashboard', { username: username });
    } else {
      Alert.alert('Error', 'Nombre de usuario o contraseña incorrectos.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Usuario" placeholderTextColor="#000" value={username} onChangeText={setUsername} style={styles.input} />
      <TextInput placeholder="Contraseña" placeholderTextColor="#000" secureTextEntry value={password} onChangeText={setPassword} style={styles.input} />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const askForCameraPermission = async () => {
  const { status } = await Camera.requestCameraPermissionsAsync();

  if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Otorga el permiso para acceder a la cámara.');
      return false;
  }

  return true;
};

const Dashboard = () => {
  const { currentUser } = useContext(UserContext);
  const userDetails = registeredUsers[currentUser];

  const [userImage, setUserImage] = useState(userDetails.userImage);

  const changeImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setUserImage(result.uri);
      registeredUsers[currentUser].userImage = result.uri;
    }
  };

  const takePhoto = async () => {
    const hasPermission = await askForCameraPermission();

    if (!hasPermission) {
        return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setUserImage(result.uri);
      registeredUsers[currentUser].userImage = result.uri;
    }
};

  return (
    <View style={styles.container}>
      <Text>Bienvenido {currentUser}</Text>
      {userImage && <Image source={{ uri: userImage }} style={styles.image} />}
      <TouchableOpacity style={styles.button} onPress={changeImage}>
        <Text style={styles.buttonText}>Seleccionar imagen</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={takePhoto}>
        <Text style={styles.buttonText}>Tomar foto</Text>
      </TouchableOpacity>
    </View>
  );
};


const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [userImage, setUserImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setUserImage(result.uri);
    }
  };

  const takePhoto = async () => {
    const hasPermission = await askForCameraPermission();

    if (!hasPermission) {
        return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setUserImage(result.uri);
      registeredUsers[currentUser].userImage = result.uri;
    }
};

  const handleRegister = () => {
    if (name && password && userImage) {
      registeredUsers[name] = { password, userImage };
      navigation.goBack();
    } else {
      Alert.alert('Error', 'Completa todos los campos y seleccione una imagen.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Nombre" placeholderTextColor="#000" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Contraseña" placeholderTextColor="#000" secureTextEntry value={password} onChangeText={setPassword} style={styles.input} />
      {userImage && <Image source={{ uri: userImage }} style={styles.image} />}
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Seleccionar imagen</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={takePhoto}>
        <Text style={styles.buttonText}>Tomar foto</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
};

const Stack = createStackNavigator();

const App = () => {
  return (
    <UserProvider>
      <NavigationContainer>
      <Stack.Navigator
  initialRouteName="Home"
  screenOptions={{
    headerStyle: {
      backgroundColor: '#007BFF', // Color de fondo del header
    },
    headerTintColor: '#fff', // Color del texto del título y botones del header
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }}
>
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Inicio          Automatización ' }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Iniciar sesión' }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Registrarse' }} />
          <Stack.Screen name="Dashboard" component={Dashboard} options={{ title: 'Bienvenido' }} />

        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
};
const styles = StyleSheet.create({
  txt:{
    paddingTop: 60
  },
  container: {
    flex: 1,
    backgroundColor: '#fff', // Fondo gris claro
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 34, // Tamaño de fuente aumentado
    fontWeight: 'bold', // Texto en negrita
    color: '#333', // Texto de color más oscuro
    marginBottom: 40,
  },
  input: {
    width: '80%',
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc', // Borde de color más claro
    borderRadius: 10,
    color: '#333', // Texto de color más oscuro
  },
  button: {
    backgroundColor: '#3498db', // Azul claro
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#2980b9', // Sombra en azul más oscuro
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff', // Texto en blanco
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
});




export default App;
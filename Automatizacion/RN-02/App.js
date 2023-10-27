import React, {useState} from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity,Alert } from 'react-native';

import * as ImagePicker from 'expo-image-picker';
const App = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (permissionResult.granted === false) {
      alert('Permission to access camera is required');
      return;
    }
  const pickerResult = await ImagePicker.launchImageLibraryAsync()
   
   if(pickerResult.cancelled === true){
     return;
   }

   setSelectedImage({localUri: pickerResult.uri})

  }
  
  
  return ( 
  <View style={styles.container}>
    <Text style={styles.title}> Pick an Image </Text>
    <Image 
     source={{uri: selectedImage !== null ? selectedImage.localUri :'https://picsum.photos/300/300'}} 
     style={styles.image}
     />
    <TouchableOpacity 
      onPress={openImagePickerAsync}
      style={styles.button}
    >
        <Text style={styles.buttonText}> Press me</Text>
    </TouchableOpacity>
    
  </View>
  );
  
};

const styles = StyleSheet.create({
  container: {
  flex:1, 
  justifyContent: 'center', 
  alignItems:'center', 
  backgroundColor: '#292929'
  },
  title: {fontSize:30, color:'#fff'},
  image:{height: 300, width:300, borderRadius: 150, resizeMode: 'contain'},
  button:{
    backgroundColor: 'blue',
    padding:7
  },
  buttonText:{
    color:'#fff',
    fontSize: 20
  }
})

export default App;

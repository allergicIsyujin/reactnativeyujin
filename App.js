import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity,TextInput } from 'react-native';
import Login from './screens/Login.js';
import BeforeMain from './screens/BeforeMain.js';
import SignUp from './screens/SignUp.js'



const App = () => {
  const [screen, setScreen] = useState("BeforeMain")


  const renderScreen = () => {
    switch (screen) {
      case 'BeforeMain':
        return <BeforeMain setScreen={setScreen}/>;
      case 'Login':
        return <Login setScreen={setScreen}/>;
      case 'SignUp':
        return <SignUp setScreen={setScreen}/>;
      default:
        return null;
    }
  };


  return (
    <View style={styles.body}>
      {renderScreen()}
    </View>
  );
};


const styles = StyleSheet.create({
  body: {
    margin: 0,
    padding: 0,
    width: '100%',
    height: '85%',
    justifyContent: 'center',
    alignItems: 'center',
     backgroundColor: 'white',
  },
})

export default App;
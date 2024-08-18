import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity,TextInput } from 'react-native';
import Login from './screens/Login.js';
import BeforeMain from './screens/BeforeMain.js';
import SignUp from './screens/SignUp.js'
import MainPage from './screens/MainPage.js'
import Main from './screens/MainPage.js';


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
      case 'MainPage':
        return <MainPage setScreen={setScreen}/>
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
    flex: 1,
    width:'100%',
  },
})

export default App;
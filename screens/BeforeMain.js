import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity,TextInput } from 'react-native';
import Action from '../assets/action.svg';

const BeforeMain=({setScreen})=>{
    return (
     
        <View style={styles.container}>
          <Action style={{ marginTop: 59 }} />
          
          <TouchableOpacity style={styles.loginButton} onPress={() => setScreen('Login')} >
            <Text style={styles.loginButtonText}>로그인</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.signupButton} onPress={() => setScreen('SignUp')}>
            <Text style={styles.signupButtonText}>회원가입</Text>
          </TouchableOpacity>
        </View>
      
    )
  }

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
    container: {
      width: 393,
      height: 852,
      backgroundColor: 'white',
      overflow: 'hidden',
      justifyContent: 'flex-start',
      alignItems: 'center',
      position: 'relative',
    },
    loginButton: {
      width: 286,
      paddingVertical: 18,
      paddingHorizontal: 0,
      position: 'absolute',
      top: '76%',
      borderRadius: 8,
      backgroundColor: '#0D7FFB',
    },
    loginButtonText: {
      color: 'white',
      fontFamily: 'SF Pro',
      fontSize: 20,
      fontWeight: '600',
      textAlign: 'center',
    },
    signupButton: {
      width: 286,
      paddingVertical: 18,
      paddingHorizontal: 0,
      position: 'absolute',
      top: '89%',
      borderRadius: 8,
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: '#0075FF',
    },
    signupButtonText: {
      color: '#0D7FFB',
      fontFamily: 'SF Pro',
      fontSize: 20,
      fontWeight: '600',
      textAlign: 'center',
    },
  });

  export default BeforeMain;
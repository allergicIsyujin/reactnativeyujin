import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity,TextInput } from 'react-native';
import Action from '../assets/action.svg';

const SignUp = ({ setScreen }) => {
    return (
      <View styles={signUpStyles.body}>
      <View style={[signUpStyles.container, { marginTop: 200 }]}>
        <View style={signUpStyles.main}>
          <TouchableOpacity style={signUpStyles.backBtn} onPress={() => setScreen('BeforeMain')}>
            <Text style={{textDecorationLine: 'underline'}}>뒤로가기</Text>
          </TouchableOpacity>
          <TextInput 
            style={[signUpStyles.inputBox, signUpStyles.idInput]} 
            placeholder="아이디를 입력해주세요.." 
          />
          <TextInput 
            style={[signUpStyles.inputBox, signUpStyles.passwordInput]} 
            placeholder="비밀번호를 입력해주세요.." 
            secureTextEntry 
          />
          <Text style={[signUpStyles.label, signUpStyles.idLabel]}>아이디</Text>
          <TouchableOpacity style={signUpStyles.confirmBtn}>
            <Text style={[signUpStyles.checkId,{color: 'white'}]}>확인</Text>
          </TouchableOpacity>
          <Text style={[signUpStyles.label, signUpStyles.passwordLabel]}>비밀번호</Text>
          <Text style={[signUpStyles.label, signUpStyles.passwordConfirmLabel]}>비밀번호 확인</Text>
          <TextInput 
            style={[signUpStyles.inputBox, signUpStyles.passwordConfirmInput]} 
            placeholder="비밀번호를 입력해주세요.." 
            secureTextEntry 
          />
          <Text style={signUpStyles.title}>회원가입</Text>
            <Text style={signUpStyles.existingText}>이미 회원이신가요?</Text>
            <Text style={signUpStyles.loginText} onPress={() => setScreen('Login')}>로그인하기</Text>
          <TouchableOpacity style={signUpStyles.submitBtn} onPress={() => {/* Handle sign up */}}>
            <Text style={[signUpStyles.complete,{color: 'white'}]} >가입완료</Text>
          </TouchableOpacity>
        </View>
      </View>
      </View>
    );
  }

  const signUpStyles = StyleSheet.create({
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
     
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },
    main: {
      position: 'relative',
      width: 393,
      height: 852,
    },
    backBtn: {
      position: 'absolute',
      left: 172,
      top: 520,
      opacity: 0.80,
      textAlign: 'center',
    },
    backBtnText: {
      color: 'rgba(255, 255, 255, 0.90)',
      fontSize: 13,
      fontWeight: 'bold',
      textDecorationLine: 'underline',
      lineHeight: 22,
    },
    inputBox: {
      position: 'absolute',
      height: 45,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: 'black',
      paddingLeft: 10,
      justifyContent: 'center',
    },
    idInput: {
      width: 233,
      left: 34,
      top: 201,
    },
    passwordInput: {
      width: 324,
      left: 34,
      top: 280,
    },
    passwordConfirmInput: {
      width: 324,
      left: 34,
      top: 358,
    },
    input: {
      height: '100%',
      fontSize: 13,
      fontWeight: 'bold',
    },
    placeholder: {
      position: 'absolute',
      left: 12,
      top: 12,
      textAlign: 'center',
      color: 'rgba(138, 138, 138, 0.80)',
      fontSize: 13,
      fontWeight: 'bold',
      lineHeight: 22,
    },
    label: {
      position: 'absolute',
      left: 34,
      textAlign: 'center',
      color: 'black',
      fontSize: 13,
      fontWeight: 'bold',
      lineHeight: 22,
    },
    idLabel: {
      top: 175,
    },
    passwordLabel: {
      top: 256,
    },
    passwordConfirmLabel: {
      top: 335,
    },
    confirmBtn: {
      position: 'absolute',
      width: 81,
      height: 45,
      left: 277,
      top: 201,
      backgroundColor: 'black',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    confirmBtnText: {
      color: 'white',
      fontSize: 14,
      fontWeight: 'bold',
      lineHeight: 22,
    },
    title: {
      position: 'absolute',
      left: 133,
      top: 127,
      textAlign: 'center',
      color: 'black',
      fontSize: 34,
      fontWeight: 'bold',
     
    },
    existingText: {
      textAlign: 'center',
      color: '#868686',
      fontSize: 14,
      top:418,
      fontWeight: 'bold',
      lineHeight: 22,
      marginRight:70,
    },
    loginText: {
      color: '#0085FF',
      fontSize: 14,
      fontWeight: 'bold',
      lineHeight: 22,
      top:396,
      marginLeft:220,
    },
    submitBtn: {
      position: 'absolute',
      width: 324,
      height: 45,
      left: 34,
      top: 460,
      backgroundColor: 'black',
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    submitBtnText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
      lineHeight: 22,
    },
  });
  export default SignUp;
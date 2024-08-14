import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity,TextInput } from 'react-native';
import Action from '/Users/heodongun/Desktop/myApp/assets/action.svg';

const Login = ({ setScreen }) => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit=()=>{
      fetch(`http://192.168.123.107:3000/signup?userid=${encodeURIComponent(id)}&userpassword=${encodeURIComponent(password)}`)
      .then(response => response.json())
        .then(json => {
          console.log(json.message);
          alert(json.message); // 결과를 알림으로 표시
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          alert('Error fetching data');
        });
    }
    return (
      <View style={[LoginStyles.container, LoginStyles.loginForm]}>
        <Text style={LoginStyles.title}>로그인</Text>
        <TextInput
          style={[LoginStyles.inputBox, { top: 250 }]}
          placeholder="아이디를 입력해주세요.."
          name="id"
          value={id}
          onChangeText={setId}
        />
        <TextInput
          style={[LoginStyles.inputBox, { top: 320 }]}
          placeholder="비밀번호를 입력해주세요.."
          secureTextEntry={true}// 비밀번호 입력 시 보안을 위해 추가
          name="password" 
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={LoginStyles.button}
          onPress={() => {
            handleSubmit()
          }}
        >
          <Text style={LoginStyles.buttonText}>로그인</Text>
        </TouchableOpacity>
        <View style={LoginStyles.signupContainer}>
          <Text style={LoginStyles.firstTimeText}>처음이신가요?</Text>
          <Text style={LoginStyles.signupText} onPress={() => setScreen('SignUp')}>회원가입</Text>
        </View>
          <Text style={LoginStyles.backText} onPress={() => setScreen('BeforeMain')}>뒤로가기</Text>
      </View>
    );
  }

  const LoginStyles = StyleSheet.create({
    container: {
      width: 360,
      top:80,
      height: 800,
      backgroundColor: 'white',
      justifyContent: 'flex-start',
      alignItems: 'center',
      position: 'relative',
      flexDirection: 'column',
    },
    button: {
      width: 300,
      height: 50,
      borderRadius: 5,
      backgroundColor: 'black',
      position: 'absolute',
      top: 400,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: '600',
      lineHeight: 22,
      textAlign: 'center',
    },
    inputBox: {
      width: 300,
      height: 50,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: 'black',
      position: 'absolute',
      justifyContent: 'center',
      paddingLeft: 10,
      fontSize: 13,
      fontWeight: '600',
      color: 'rgba(138, 138, 138, 0.8)',
    },
    title: {
      position: 'absolute',
      top: 190,
      color: 'black',
      fontSize: 34,
      fontWeight: '600',
    },
    signupContainer: {
      position: 'absolute',
      top: 460,
      width: 145,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    signupText: {
      color: '#0085FF',
      fontSize: 14,
      marginRight:14,
    },
    firstTimeText: {
      color: '#868686',
      fontSize: 14,
    },
    backText: {
      justifyContent: 'center',
      position: 'absolute',
      top: 490,
      opacity: 0.8,
      color: 'rgba(0, 0, 0, 0.8)', // 배경과 대비를 위해 색상 조정
      fontSize: 13,
      textDecorationLine: 'underline',
    },
  });

  export default Login;
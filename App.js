import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity,TextInput } from 'react-native';
import Action from '/Users/heodongun/Desktop/myApp/assets/action.svg';

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

const Login = ({ setScreen }) => {
  return (
    <View style={[LoginStyles.container, LoginStyles.loginForm]}>
      <Text style={LoginStyles.title}>로그인</Text>
      <TextInput
        style={[LoginStyles.inputBox, { top: 250 }]}
        placeholder="아이디를 입력해주세요.."
        name="id"
      />
      <TextInput
        style={[LoginStyles.inputBox, { top: 320 }]}
        placeholder="비밀번호를 입력해주세요.."
        secureTextEntry={true}// 비밀번호 입력 시 보안을 위해 추가
        name="password" 
      />
      <TouchableOpacity
        style={LoginStyles.button}
        onPress={() => {
          // 로그인 버튼 클릭 시 동작을 여기에 추가하세요.
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

const SignUp = ({ setScreen }) => {
  return (
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
  );
}

const App = () => {
  const [screen, setScreen] = useState("BeforeMain");


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

function login(){
  fetch('http://192.168.123.107:3000/api/data')
  .then(response => response.json())
  .then(json => console.log(json.message))
  .catch(error => console.error('Error fetching data:', error));
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

const signUpStyles = StyleSheet.create({
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
//login
export default App;
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://192.168.123.107:3000/api/data')
      .then(response => response.json())
      .then(json => setData(json.message))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <View style={styles.body}>
      <View style={styles.container}>
        <Image source={require('/Users/heodongun/Desktop/myApp/assets/action.png')} style={{ marginTop: 120 }} />
        
        <TouchableOpacity style={styles.loginButton} onPress={login}>
          <Text style={styles.loginButtonText}>로그인</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.signupButton} onPress={() => console.log('회원가입 클릭')}>
          <Text style={styles.signupButtonText}>회원가입</Text>
        </TouchableOpacity>
        
        <Text style={styles.alreadyMember}>이미 회원이신가요?</Text>
        
        <View style={[styles.divider, styles.dividerLeft]}></View>
        <View style={[styles.divider, styles.dividerRight]}></View>
        <Text style={styles.or}>또는</Text>
      </View>
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
    backgroundColor: '#f0f0f0',
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
  alreadyMember: {
    position: 'absolute',
    top: '72%',
    textAlign: 'center',
    color: 'black',
    fontSize: 14,
    fontFamily: 'SF Pro',
    fontWeight: '600',
  },
  divider: {
    width: '40%',
    position: 'absolute',
    borderWidth: 1,
    borderColor: '#868686',
  },
  dividerLeft: {
    top: '86%',
    left: '5%',
  },
  dividerRight: {
    top: '86%',
    left: '55%',
  },
  or: {
    position: 'absolute',
    top: '84.8%',
    left: '47.4%',
    textAlign: 'center',
    color: '#868686',
    fontSize: 13,
    fontFamily: 'SF Pro',
    fontWeight: '600',
  },
});
//login
export default App;

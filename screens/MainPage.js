import React, { useContext,useState } from 'react';
import { UserContext } from '../App.js';
import {IPContext} from '../App.js';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, TextInput, Platform,  TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import {Image} from 'react-native';
import LogoSvg from '../assets/img/logo.svg';
import ReTake from '../assets/img/Retake.svg';
import SearchSvg from '../assets/img/find.svg'
import { useNavigation } from '@react-navigation/native';

import HomeG from '../assets/img/HomeG.svg'
import CheckSquare from'../assets/img/CheckSquare.svg'
import Camera from'../assets/img/Camera.svg'
import Record from'../assets/img/Record.svg'

export default function MainPage() {
  const navigation = useNavigation();
  const [text, setText] = React.useState('');
  const {userId}=useContext(UserContext)
  const {IP} = useContext(IPContext);
  const [inputValue, setInputValue] = useState('');
  // alert(userId)//이거 지우셈
  const handlePress = () => {
    navigation.navigate('Search', { inputValue });
  };
  async function openai_say(foodname){
    try{
      const respond = await fetch(`http://${IP}/openAI/say`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: userId,
          food: foodname
        })
      })
      if (!respond.ok) {
        throw new Error(`HTTP error! Status: ${respond.status}`);
      }
      const textResponse = await respond.text(); // 응답 본문을 문자열로 읽기
      console.log(textResponse); // 응답된 텍스트 출력
      
      return textResponse;
    } catch (error) {
      console.error(error);
    }
  }
  
  return (
    
    <View style={{flex:1}}>
      <StatusBar style="auto" />
      <LinearGradient style={styles.container} colors={['#51CE54', '#0D7FFB']}>
      
          <ImageBackground style={styles.backgroundImg} source={require('../assets/img/background.png')} resizeMode="cover">
          </ImageBackground>
          <View style={styles.unMainBox}></View>
          <View style={[styles.logo, { height: 62 }]}>
            <LogoSvg height={62}></LogoSvg>
            <Text style={styles.logoText}>Allergic</Text>
          </View>
          
          <View style={styles.main}>
              <View style={styles.mainBox}>
                  <Text style={styles.mainText}>식사를 하기전</Text>{/* class="text" style="display: inline-block; margin-bottom:10px"*/}
                  <Text style={styles.mainText}>알러지 식품을 체크해보세요!</Text>{/* class="text" */}
                  <Text style={styles.mainSmallText}>사진촬영이나 요리명을 검색해보세요.</Text>{/* class="small-text" */}
              </View>
              <View style={styles.unBox}></View>
              <View style={styles.section}>
                  <TouchableOpacity
                    title="Go to Camera"
                    onPress={() => navigation.navigate("Camera")}
                  >
                    
                  <View style={styles.But}>
                      <ReTake/>
                      <View style={styles.textBox}>{/* class="textBox" */}
                          <Text style={styles.Cam_text}>사진촬영</Text>{/* class="text" */}
                          <Text style={styles.Cam_smallText}>완성된 요리를 촬영해주세요</Text>{/* class="small-text" */}
                      </View>
                  </View>
                  
                  </TouchableOpacity>
                  <View style={styles.find}>
                      <TouchableOpacity
                        onPress={async() => {
                          result = await openai_say(text);
                          alert(result);
                        }}
                      >
                        <SearchSvg/>
                      </TouchableOpacity>
                      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                          <KeyboardAvoidingView
                            behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
                            keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 100} // 필요에 따라 조정
                          >
                            <View >
                                <TextInput
                                style={styles.input}
                                placeholder="요리명 검색"
                                onChangeText={setText}
                                value={text}
                              />
                            </View>
                          </KeyboardAvoidingView>
                        </TouchableWithoutFeedback>
                      
                      <TouchableOpacity
                        // 글자 삭제
                        onPress={()=>{setText('')}}
                      >
                      <Image source={require('../assets/img/X.png')}/>{/* class="smallImg" id="inputDelete" */}
                      </TouchableOpacity>
                  </View>
              </View>
          </View>
          



          {/* 여기서부터 푸터 */}
          <View style={styles.footer}>
        <View style={styles.footerBar}>
        <TouchableOpacity style={styles.footerCenter} onPress={() => navigation.navigate('MainPage')} activeOpacity={0.9}>
            <HomeG style={styles.icon} />
            <Text style={styles.selectText}>홈</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerCenter} onPress={() => navigation.navigate('MyAllergy')} activeOpacity={0.9}>
            <CheckSquare style={styles.icon} />
            <Text style={styles.footerText}>알러지 등록</Text>
            </TouchableOpacity>
          <TouchableOpacity style={styles.footerCenter} onPress={() => navigation.navigate('Camera')} activeOpacity={0.9}>
            <Camera style={styles.icon} />
            <Text style={styles.footerText}>알러지 검색</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerCenter} onPress={() => navigation.navigate('Record')} activeOpacity={0.9}>
            <Record style={styles.icon} />
            <Text style={styles.footerText}>기록</Text>
          </TouchableOpacity>
        </View>
      </View>
      </LinearGradient>
    </View>
    
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:'100%',
  },
  backgroundImg: {
    flex:1,
    marginTop:30,
  },
  unMainBox:{
    width:'100%',
    height:450,
  },
  unBox:{
    height:30
  },
  logo: {
    position:'absolute',
    flexDirection:'row',
    left: 20,
    top:300,
  },
  logoText:{
    position: 'relative',
    left: 13,
    top: 9,
    color: "#FFF",
    fontSize: 32,
    fontStyle: 'normal',
    fontWeight: '500',
  },
  main:{
    flex:1.3,
    bottom:70,
    width:'100%',
    height:350,
    backgroundColor: "#FFF",
    position:'absolute',
    borderTopRightRadius: 100,
  },
  mainText:{
    marginBottom:4,
    fontSize: 24,
    fontWeight: 'bold',
  },
  mainBox:{
    flex:1,
    top:45,
    left:20,
  },
  mainSmallText:{
    marginTop:4,
    fontSize: 16.2,
  },
  section:{
    flex:4,
    top:45,
    position: 'relative',
    alignItems: 'center',
  },
  But:{
    marginTop:30,
    height:60,
    width: 300,
    flexDirection:'row',
    borderRadius: 5.995,
    paddingLeft:22,
    margin: 10,
    alignContent:'center',
    alignItems: 'center',
    
    gap: 18.735,
    backgroundColor: '#0075FF',
  },
  find: {
    height:60,
    width: 300,
    flexDirection:'row',
    borderRadius: 5.995,
    padding: (11.991, 22.482, 11.991, 21.482),
    margin: 10,
    alignItems: 'center',
    gap: 18.735,
    borderWidth:2,
    borderStyle: 'solid',
    borderColor:'#0075FF',
    backgroundColor: '#FFF',
  },
  textBox:{
    flexDirection:'row',
  },
  Cam_text:{
    color: '#FFF',
    fontFamily: 'Inter',
    fontSize: 17.4,
    fontWeight: 'bold',
  },
  Cam_smallText:{
    marginLeft: 9,
    marginTop: 2,
    color:'#FFF',
    fontFamily: 'Inter',
    fontSize: 11.4,
    fontWeight: '400',
  },
  input:{
    marginRight:-8,
    width:170,
    height:50,
    fontFamily: 'Inter',
    fontSize: 17.986,
    fontStyle: "normal",
    fontWeight: "bold",
  },
  // 여기서 부터 푸터
  footer: {
    shadowColor: 'rgba(0, 0, 255, 1)', // 진한 파란색 그림자
    shadowOffset: { width: 0, height: -6 }, // 수평, 수직 오프셋
    shadowOpacity: 1, // 최대 불투명도
    shadowRadius: 30, // 그림자 반경
    elevation: 30, // 안드로이드에서 더 높은 그림자 높이
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
    paddingVertical: 10,
  },
  footerBar: {
    width: '98%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 50,
  },
  footerCenter: {
    alignItems: 'center',
  },
  icon: {
    width: 25,
    height: 25,
  },
  footerText:{
    color:'#757575',
    fontWeight:'500'
  },
  selectText:{
    color:'#51CE54',
    fontWeight:'500'
  }
});
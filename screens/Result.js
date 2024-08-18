import React, { useState } from 'react';

import { Text, View, StyleSheet, TouchableOpacity, Image, ScrollView, TurboModuleRegistry } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';


export default function Result() {

  const route = useRoute(); //푸드아이디하고 푸드리스트들을 가져옴
  const data = route.params;
  const foodId = data.foodId;
  
  const foodDetail = data.foodList.find(item => item.id === foodId); //푸드아이디에 해당하는 목록들을 foodDetail에 넣어줌(이름, 성분, 배경)
  console.log(foodDetail.description)
  const navigation = useNavigation();

  const foodDescription = foodDetail.description;
  //foodDetail.image
  //foodDetail.name
  //foodDetail.description
    return (
      <View style={styles.container}>
      <LinearGradient colors={['#51CE54', '#0D7FFB']} style={styles.gradient}>
      <View>
          <Image style={styles.headerImg} source={require('./assets/recordImg/header-img.png')} />
          <Text style={styles.title}>음식 정보</Text>
      </View>
      <View style={styles.main}>
        <Image style={styles.foodImg} source={{ uri: foodDetail.image }}></Image>
        <View style={styles.foodBox}>
            <Text style={styles.foodName}>{foodDetail.name}</Text>
            <View style={styles.foodData}>
            {foodDescription.map((food) => (
                <Text key={food.id} style={styles.allergy}>{food.name}</Text>
              ))}

                
            </View>
        </View>
        <TouchableOpacity style={styles.button1} onPress={() => navigation.navigate('Camera')} activeOpacity={0.9}>
          <Image source={require('./assets/cameraImg/reTake.png')} ></Image>
          <Text style={styles.buttonText}>요리 촬영하기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2}>
          <Image source={require('./assets/cameraImg/search.png')}></Image>
          <Text style={styles.buttonText}>요리 검색하기</Text>
        </TouchableOpacity>
      </View>
    <View style={styles.footer}>
        <View style={styles.footerBar}>
        <TouchableOpacity style={styles.footerCenter} onPress={() => navigation.navigate('Home')} activeOpacity={0.9}>
            <Image source={require('./assets/recordImg/Home.png')} style={styles.icon} />
            <Text style={styles.footerText}>홈</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerCenter} onPress={() => navigation.navigate('MyAllergy')} activeOpacity={0.9}>
            <Image source={require('./assets/recordImg/CheckSquare.png')} style={styles.icon} />
            <Text style={styles.footerText}>알러지 등록</Text>
            </TouchableOpacity>
          <TouchableOpacity style={styles.footerCenter} onPress={() => navigation.navigate('Camera')} activeOpacity={0.9}>
            <Image source={require('./assets/recordImg/Camera.png')} style={styles.icon} />
            <Text style={styles.footerText}>알러지 검색</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerCenter} onPress={() => navigation.navigate('Record')} activeOpacity={0.9}>
            <Image source={require('./assets/recordImg/record.png')} style={styles.icon} />
            <Text style={styles.selectText}>기록</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradient: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 25,
    position: 'absolute',
    top: 85,
    left: 135,
    fontWeight: '700',
  },
  main: {
    backgroundColor: 'white',
    width: '100%',
    borderTopRightRadius: 80,
    height: 650,
    overflow:'hidden'
  },
  foodImg:{
    width:'100%',
    height:380
  },
  foodData:{
    flexDirection:'row',
    width:350,
    flexWrap:'wrap',
  },
  foodName:{
    fontSize:24,
    fontWeight:'700'
  },
  allergy:{
    marginTop:8,
    marginRight:8
  },
  foodBox:{
    width:'98%',
    marginLeft:20,
    marginTop:20,
  },
  button1:{
    position:'absolute',
    left:30,
    bottom:110,
    width:150,
    padding:10,
    backgroundColor:'#0075FF',
    justifyContent:'space-around',
    flexDirection:'row',
    alignItems:'center',
    borderRadius:10,
  },
  buttonText:{
    color:'white',
    fontWeight:'600',
    fontSize:15
  },
  button2:{
    position:'absolute',
    left:190,
    bottom:110,
    width:150,
    padding:10,
    paddingTop:11,
    paddingBottom:12,
    alignItems:'center',
    backgroundColor:'#0075FF',
    justifyContent:'space-around',
    flexDirection:'row',
    borderRadius:10,
  },
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
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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


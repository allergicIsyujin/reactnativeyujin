import React, { useContext ,useState} from 'react';
import { UserContext } from '../App.js';
import { Text, View, StyleSheet, TouchableOpacity, Image, ScrollView, TurboModuleRegistry } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';


export default function Jnformation() {
    const navigation = useNavigation();
    const {userId}=useContext(UserContext)
  alert(userId)//이거 지우셈
    const route = useRoute();
    const { photoUri } = route.params || {};
    const [foodName, setfoodName] = useState("치킨") //치킨을 임의로 저장해놓음, 찍은 사진의 정보들을 ai가 분석하여 여기에 담아두면됨.
    const [backgroundColor, setbackgroundColor] = useState(1) //음식을 먹어도된다면 1, 안된다면 0을 저장
   const [descriptions, setDescriptions] = useState([ //임의로 넣어놓은 음식의 정보들 id는 필요할지 필요없을지 모르겠음
    {id : 1, name : "닭고기"},
    {id : 2, name : "대두"},
    {id : 3, name : "계란"},
    {id : 4, name : "우유"}
   ]);


   const goToRecord = () => { //기록저장하기를 눌렀을때 기록으로 이동되며 data에 이미지 uri, 성분들, 음식이름, 배경색이 전달됨.
    const data = [
      { image: photoUri, description: descriptions, foodName : foodName, backgroundColor: backgroundColor}
  ];
  
  navigation.navigate('Record', {
      data,  // 배열로 전달
  });
};
  
    return (
      <View style={styles.container}>
      <LinearGradient colors={['#51CE54', '#0D7FFB']} style={styles.gradient}>
      <View>
          <Image style={styles.headerImg} source={require('./assets/cameraImg/header-img.png')} />
          <Text style={styles.title}>음식 정보</Text>
      </View>
      <View style={styles.main}>
        
      {photoUri ? (
                <Image source={{ uri: photoUri }} style={styles.foodImg} />
            ) : (
                <Text>No photo available</Text>
            )}
        <View style={styles.foodBox}>
            <Text style={styles.foodName}>치킨</Text>
            <View style={styles.foodData}>
                <Text style={styles.allergy}>닭고기</Text>
                <Text style={styles.allergy}>대두</Text> 
                <Text style={styles.allergy}>밀</Text> 
                <Text style={styles.allergy}>계란</Text> 
                <Text style={styles.allergy}>우유</Text> 
            </View> 
        </View>
        <TouchableOpacity style={styles.button1} 
              onPress={() => navigation.goBack()} // 이전 페이지로 이동
              activeOpacity={0.9}
            >
            <Image source={require('./assets/cameraImg/reTake.png')}></Image>
            <Text style={styles.buttonText}>다시 촬영하기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2} onPress={goToRecord}>
            <Image source={require('./assets/cameraImg/saveImg.png')}></Image>
            <Text style={styles.buttonText}>기록 저장하기</Text>
        </TouchableOpacity>
      </View>
      
    <View style={styles.footer}>
        <View style={styles.footerBar}>
        <TouchableOpacity style={styles.footerCenter} onPress={() => navigation.navigate('MainPage')} activeOpacity={0.9}>
            <Image source={require('./assets/cameraImg/Home.png')} style={styles.icon} />
            <Text style={styles.footerText}>홈</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerCenter} onPress={() => navigation.navigate('MyAllergy')} activeOpacity={0.9}>
            <Image source={require('./assets/cameraImg/CheckSquare.png')} style={styles.icon} />
            <Text style={styles.footerText}>알러지 등록</Text>
            </TouchableOpacity>
          <TouchableOpacity style={styles.footerCenter} onPress={() => navigation.navigate('Camera')} activeOpacity={0.9}>
            <Image source={require('./assets/cameraImg/Camera.png')} style={styles.icon} />
            <Text style={styles.selectText}>알러지 검색</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerCenter} onPress={() => navigation.navigate('Record')} activeOpacity={0.9}>
            <Image source={require('./assets/cameraImg/record.png')} style={styles.icon} />
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
  foodBox:{
    width:'98%',
    marginLeft:20,
    marginTop:20,
  },
  button2:{
    position:'absolute',
    left:190,
    bottom:110,
    width:150,
    padding:10,
    backgroundColor:'#0075FF',
    justifyContent:'space-around',
    flexDirection:'row',
    alignItems:'center',
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


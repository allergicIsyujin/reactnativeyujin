import React, { useState, useEffect,useContext } from 'react';
import { UserContext } from '../App.js';
import { Text, View, StyleSheet, TouchableOpacity, Image, ScrollView, TurboModuleRegistry } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';


export default function Record() {
  const navigation = useNavigation();
  const route = useRoute();
  const { data } = route.params || {};
  const {userId}=useContext(UserContext)
  alert(userId)//이거 지우셈
  
  const [foodList, setfoodList] = useState([]);

  useEffect(() => {
    if (data && data.length > 0) {
        // 기존 foodList에 새로운 데이터를 추가
        setfoodList(prevFoodList => [
            ...prevFoodList,
            ...data.map((item, index) => ({
                id: (prevFoodList.length + index + 1).toString(),
                name: data[0].foodName,
                backgroundColor: data[0].backgroundColor ? "#51CE54" : "#FF4444", 
                image: item.image,
                description: item.description,
            }))
        ]);
    }

}, [data]);
//받은 데이터를 foodList에 추가후 DB에 저장, 저장 후 저장한 데이터들을 모두 가져와서 보여주기
const goToResult = ((foodId)=>{
  navigation.navigate('Result',  {foodList, foodId : foodId})
})

    return (
      <View style={styles.container}>
      <LinearGradient colors={['#51CE54', '#0D7FFB']} style={styles.gradient}>
      <View>
          <Image style={styles.headerImg} source={require('./assets/recordImg/header-img.png')} />
          <Text style={styles.title}>기록</Text>
      </View>
      <View style={styles.main}>
        <View style={styles.mainbox}>
        <TouchableOpacity
          onPress={() => navigation.goBack()} // 이전 페이지로 이동
          activeOpacity={0.9}
          >
            <Image source={require('./assets/addAllergyImg/arrow_back.png')} />
          </TouchableOpacity>
          <ScrollView contentContainerStyle={styles.scrollView} style={styles.RecordList}>
              {foodList && foodList.length > 0 ? foodList.map((food) => ( //추후foodList가 아닌 DB에 있는것들을 가져와서 할 예정
                <View
                  key={food.id}
                  style={[
                    styles.RecordBox,{backgroundColor:food.backgroundColor}
                  ]}
                >
                  <Text style={styles.RecordBoxText}>{food.name}</Text>
                  <TouchableOpacity style={styles.View} onPress={() => goToResult(food.id)}>
                    <Text>상세보기</Text>
                  </TouchableOpacity>

                </View>
              )) : (<Text style={styles.noRecord}>아직 기록이 없습니다.</Text>)}

          </ScrollView>
        </View>
      </View>
    <View style={styles.footer}>
        <View style={styles.footerBar}>
        <TouchableOpacity style={styles.footerCenter} onPress={() => navigation.navigate('MainPage')} activeOpacity={0.9}>
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
    left: 175,
    fontWeight: '700',
  },
  main: {
    backgroundColor: 'white',
    width: '100%',
    borderTopRightRadius: 80,
    height: 650,
  },
  mainbox: {
    marginHorizontal: 20,
    marginTop: 10,
  },
  RecordList: {
    width: '100%',
    height: 510,
    marginTop: 20,
  },
  scrollView: {
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    flexGrow: 2,
  },
  RecordBox:{
    width: 150,
    height: 150,
    borderRadius: 10,
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 15,
    marginRight: 20,
  },
  View:{
    width:80,
    marginTop:5,
    backgroundColor:'white',
    alignItems:'center',
    borderRadius:10,
    paddingVertical: 5,   // 위와 아래에 5 dp 패딩 적용
    paddingHorizontal: 10, // 좌우에 10 dp 패딩 적용
  },
  RecordBoxText:{
    marginTop:40,
    marginBottom:8,
    color:'white',
    fontSize:22,
    fontWeight:'500'
  },
  noRecord:{
    width:'100%',
    textAlign:'center'
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


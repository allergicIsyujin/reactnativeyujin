import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
export default function App() {
  return (
    <View style={styles.container}>
      <LinearGradient colors={['#51CE54', '#0D7FFB']} style={styles.gradient}>
        <View>
          <Image source={require('./assets/img/header-img.png')} style = {styles.headerImg}></Image>
          <View style = {styles.logo}>
            <Image source={require('./assets/img/logo.png')}></Image>
            <Text style = {styles.h2Text}>자신의 알러지</Text>
          </View>
        </View>
        <View style={styles.main}>
          <Image style={styles.mainImg} source={require('./assets/img/back.png')}></Image>
          <Text style={styles.mainText}>자신의 알러지를 관리하여{'\n'}안전하고 맛있는 식사를 하세요.</Text>
          <Text style = {styles.pText}>언제든지 알러지를 추가할 수 있어요.</Text>
          <View style={styles.myAllergyList}>
            <View style = {styles.myAllergy}>
              <Image source={require('./assets/img/friedEggs.png')}></Image>
              <Text style={styles.allergyName}>계란</Text>
            </View>
            <View style = {styles.myAllergy}>
              <Image source={require('./assets/img/friedEggs.png')}></Image>
              <Text style={styles.allergyName}>계란</Text>
            </View>
            <View style = {styles.myAllergy}>
              <Image source={require('./assets/img/friedEggs.png')}></Image>
              <Text style={styles.allergyName}>계란</Text>
            </View>
          </View>
          <View style={styles.addAllergy}>
            <Image source ={require('./assets/img/PlusSquare.png')}></Image>
            <Text style={styles.addAllergyText}>알러지 추가하기</Text>
          </View>
        </View>
        <View style={styles.footer}>
          <View style={styles.footerBar}>
            <View style={styles.footerCenter}>
              <Image source={require('./assets/img/Home.png')} style={styles.icon} />
              <Text>홈</Text>
            </View>
            <View style={styles.footerCenter}>
              <Image source={require('./assets/img/CheckSquare.png')} style={styles.icon} />
              <Text>알러지 등록</Text>
            </View>
            <View style={styles.footerCenter}>
              <Image source={require('./assets/img/Camera.png')} style={styles.icon} />
              <Text>알러지 검색</Text>
            </View>
            <View style={styles.footerCenter}>
              <Image source={require('./assets/img/record.png')} style={styles.icon} />
              <Text>기록</Text>
            </View>
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
    width: 360,
    height: 800,
  },
  headerImg: {
    width: 360,
    marginBottom:20
  },
  logo :{
    display: 'flex',
    flexDirection: 'row', 
    alignItems: 'center',
    color: 'white',
    width: 230,
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  h2Text:{
    color:'white',
    fontSize:24,
    fontWeight: '800'
  },
  main:{
    backgroundColor: 'white', // 배경색 흰색
    borderTopRightRadius: 80, // 오른쪽 위 모서리 둥글게
    width: 360, // 너비 360px
    height: 400, // 높이 400px
  },
  mainImg:{
    marginVertical: 10, // 위아래 여백 10px
    marginHorizontal: 20, // 좌우 여백 20px
  },
  mainText:{
    fontSize: 20, // 폰트 크기 20px
    marginTop: 3, // 위쪽 여백 0px
    marginRight: 10, // 오른쪽 여백 10px
    marginLeft: 20, // 왼쪽 여백 10px
    fontWeight: '700'
  },
  pText : {
    marginVertical: 5, // 위아래 여백 10px
    marginHorizontal: 20, // 좌우 여백 10px
    marginBottom:15,
    fontSize: 14, // 폰트 크기 14px
    color: '#757575', // 텍스트 색상
  },
  myAllergyList:{
    width: 340, // 너비 340px
    marginHorizontal: 'auto', // 수평 중앙 정렬
    flexWrap: 'wrap', // 자식 요소들을 래핑
    flexDirection: 'row', // 자식 요소들을 수평으로 배치
    height: 220, // 높이 220px
    marginHorizontal: 20
  },
  allergyName:{
    color:'white'
  },
  myAllergy:{
    marginRight: 10, // 오른쪽 여백 10px
    marginBottom: 10, // 아래쪽 여백 10px
    backgroundColor: '#FF4444', // 배경색 빨간색
    width: 100, // 너비 100px
    height: 90, // 높이 90px
    borderRadius: 10, // 모서리 둥글게 10px
    flexDirection: 'column', // 자식 요소를 수직으로 배치
    alignItems: 'center', // 자식 요소를 수평으로 중앙 정렬
    justifyContent: 'space-around', // 자식 요소들 사이에 균등한 여백 추가
  },
  addAllergy:{
    position: 'absolute', // 절대 위치 지정
    alignItems: 'center',
    bottom: 100, // 화면 하단에서 100px
    left: 90, // 화면 왼쪽에서 90px
    flexDirection: 'row', // 자식 요소들을 가로 방향으로 배치
    justifyContent: 'space-around', // 자식 요소들을 가로 방향으로 균등하게 배치
    alignItems: 'center', // 자식 요소들을 세로 방향으로 중앙 정렬
    width: 180, // 너비 130px
    height: 50, // 높이 50px
    backgroundColor: '#0D7FFB', // 배경색 파란색
    borderRadius: 10, // 모서리 둥글게 10px
    paddingHorizontal: 15, // 좌우 여백 15px
  },
  addAllergyText:{
    fontSize:18,
    fontWeight:'700',
    color:'white'
  },
  footer: {
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    width: 360,
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    height: 50,
  },
  footerBar: {
    width: 350,
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
});

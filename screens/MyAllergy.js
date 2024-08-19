import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRoute } from '@react-navigation/native';

export default function MyAllergy({ navigation }) {

  const route = useRoute(); //useRoute로 등록했던 알러지정보들을 받아옴.
  const { selectedAllergies = [] } = route.params || {}; //selectedAllergies 에 선택한 알러지들을 저장

  return (
    <View style={styles.container}>
    <LinearGradient colors={['#51CE54', '#0D7FFB']} style={styles.gradient}>
    <View>
      
          <Image source={require('./assets/myAllergyImg/header-img.png')} style = {styles.headerImg}></Image>
          <View style = {styles.logo}>
            <Image source={require('./assets/myAllergyImg/logo.png')}></Image>
            <Text style = {styles.h2Text}>자신의 알러지</Text>
          </View>
        </View>
        <View style={styles.main}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()} // 이전 페이지로 이동
          activeOpacity={0.9}
        >
          <Image style={styles.mainImg} source={require('./assets/myAllergyImg/back.png')}></Image>
          </TouchableOpacity>

          <Text style={styles.mainText}>자신의 알러지를 관리하여{'\n'}안전하고 맛있는 식사를 하세요.</Text>  
          <Text style = {styles.pText}>언제든지 알러지를 추가할 수 있어요.</Text>
          <ScrollView contentContainerStyle={styles.scrollView} style={styles.myAllergyList} //ScrollView로 알러지가 화면을 초과해도 스크롤되게
          > 
          {selectedAllergies.length > 0 ? ( //전달된 등록된 알러지가 0보다 크다면 map함수를 이용해서 알러지들을 생성 selectedAllergies 이친구를 생성될때마다 DB에 저장시켜야할듯 알러지 id, img-icon, name 정도?
              selectedAllergies.map(allergy => (
                <View key={allergy.id} style={styles.myAllergy}>
                  <Image source={allergy.selectedImage} />
                  <Text style={styles.allergyName}>{allergy.name}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.noAllergies}>알러지 정보가 없습니다.</Text>
            )}
            

            </ScrollView>
          <TouchableOpacity style={styles.addAllergy} onPress={() => navigation.navigate('AddAllergy')} activeOpacity={0.9}>
            <Image source ={require('./assets/myAllergyImg/PlusSquare.png')}></Image>
            <Text style={styles.addAllergyText}>알러지 추가하기</Text>
            </TouchableOpacity>
        </View>
      <View style={styles.footer}>
        <View style={styles.footerBar}>
        <TouchableOpacity style={styles.footerCenter} onPress={() => navigation.navigate('Home')} activeOpacity={0.9}>
            <Image source={require('./assets/myAllergyImg/Home.png')} style={styles.icon} />
            <Text style={styles.footerText}>홈</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerCenter} onPress={() => navigation.navigate('MyAllergy')} activeOpacity={0.9}>
            <Image source={require('./assets/myAllergyImg/CheckSquare.png')} style={styles.icon} />
            <Text style={styles.selectText}>알러지 등록</Text>
            </TouchableOpacity>
          <TouchableOpacity style={styles.footerCenter} onPress={() => navigation.navigate('Camera')} activeOpacity={0.9}>
            <Image source={require('./assets/myAllergyImg/Camera.png')} style={styles.icon} />
            <Text style={styles.footerText}>알러지 검색</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerCenter} onPress={() => navigation.navigate('Record')} activeOpacity={0.9}>
            <Image source={require('./assets/myAllergyImg/record.png')} style={styles.icon} />
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
        width:'100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      gradient: {
        width:'100%',
        height: 800,
      },
      headerImg: {
        width:'100%',
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
        width:'100%', // 너비 360px
        height:350,
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
        width:'95%', // 너비 340px
        marginHorizontal: 'auto', // 수평 중앙 정렬
        flexWrap: 'wrap', // 자식 요소들을 래핑
        flexDirection: 'row', // 자식 요소들을 수평으로 배치
        marginHorizontal: 20,
        flex: 1,
        
      },
      scrollView: {
        width:'100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 10,
        
      },
      allergyName:{
        color:'white',
        fontSize: 16,
        fontWeight: '600',
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
        bottom: '10%', // 화면 하단에서 100px
        left: '26%', // 화면 왼쪽에서 90px
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


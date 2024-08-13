import React from 'react';
import { StyleSheet, Text,  ScrollView, View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
export default function App() {
    return (
      <View style={styles.container}>
        <LinearGradient colors={['#51CE54', '#0D7FFB']} style={styles.gradient}>
          <View >
            <Image style ={styles.headerImg} source={require('./assets/img/header-img.png')}></Image>
            <Text style={styles.title}>알러지등록</Text>
          </View>
          <View style={styles.main}>
            <View style = {styles.mainbox}>
              <Image source={require('./assets/img/arrow_back.png')}></Image>
              <ScrollView contentContainerStyle = {styles.scrollView} style = {styles.allergyList}>
                <View style={styles.allergyListBox}>
                  <Image source = {require('./assets/img/friedEggs.png')}></Image>
                  <Text>계란</Text>
                </View>
                <View style={styles.allergyListBox}>
                  <Image source = {require('./assets/img/loafBread.png')}></Image>
                  <Text>밀가루</Text>
                </View>
                <View style={styles.allergyListBox}>
                  <Image source = {require('./assets/img/jar.png')}></Image>
                  <Text>우유</Text>
                </View>
                <View style={styles.allergyListBox}>
                  <Image source = {require('./assets/img/meat3.png')}></Image>
                  <Text>닭고기</Text>
                </View>
                <View style={styles.allergyListBox}>
                  <Image source = {require('./assets/img/meat2.png')}></Image>
                  <Text>돼지고기</Text>
                </View>
                <View style={styles.allergyListBox}>
                  <Image source = {require('./assets/img/nuts.png')}></Image>
                  <Text>견과류</Text>
                </View>
                <View style={styles.allergyListBox}>
                  <Image source = {require('./assets/img/shrimp.png')}></Image>
                  <Text>새우</Text>
                </View>
                <View style={styles.allergyListBox}>
                  <Image source = {require('./assets/img/fish1.png')}></Image>
                  <Text>해산물</Text>
                </View>
                <View style={styles.allergyListBox}>
                  <Image source = {require('./assets/img/fish2.png')}></Image>
                  <Text>생선</Text>
                </View>
                <View style={styles.allergyListBox}>
                  <Image source = {require('./assets/img/grape.png')}></Image>
                  <Text>포도</Text>
                </View>
                <View style={styles.allergyListBox}>
                  <Image source = {require('./assets/img/banana.png')}></Image>
                  <Text>바나나</Text>
                </View>
                <View style={styles.allergyListBox}>
                  <Image source = {require('./assets/img/apple.png')}></Image>
                  <Text>사과</Text>
                </View>
                <View style={styles.allergyListBox}>
                  <Image source = {require('./assets/img/apple.png')}></Image>
                  <Text>사과</Text>
                </View>
                <View style={styles.allergyListBox}>
                  <Image source = {require('./assets/img/apple.png')}></Image>
                  <Text>사과</Text>
                </View>
                <View style={styles.allergyListBox}>
                  <Image source = {require('./assets/img/apple.png')}></Image>
                  <Text>사과</Text>
                </View>
                <View style={styles.allergyListBox}>
                  <Image source = {require('./assets/img/apple.png')}></Image>
                  <Text>사과</Text>
                </View>
                <View style={styles.allergyListBox}>
                  <Image source = {require('./assets/img/apple.png')}></Image>
                  <Text>사과</Text>
                </View>

                <View style={styles.allergyListBox}>
                  <Image source = {require('./assets/img/apple.png')}></Image>
                  <Text>사과</Text>
                </View>
                <View style={styles.allergyListBox}>
                  <Image source = {require('./assets/img/apple.png')}></Image>
                  <Text>사과</Text>
                </View>
              </ScrollView> 
            </View>
            <View style={styles.newaddAlltergy}>
                <Image source={require('./assets/img/PlusSquare.png')}></Image>
                <Text style={styles.newaddAlltergyText}>알러지 추가하기</Text>
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
      overflow:'hidden'
    },
    title:{
        color: '#FFFFFF', // 텍스트 색상 흰색
        fontSize: 25, // 폰트 크기 25px
        position: 'absolute', // 절대 위치
        top: 85, // 화면 상단에서 85px
        left: 120, // 화면 왼쪽에서 120px
        fontWeight:'700'
    },
    main:{
      backgroundColor: 'white', // 배경색 흰색
      width: 360, // 너비 360px
      borderTopRightRadius: 80, // 오른쪽 상단 모서리 반경 80px
      height: 650, // 높이 650px
    },
    mainbox:{
      marginHorizontal: 20,
      marginTop:10,
    },
    allergyList:{
      width: 340, // 원하는 너비 설정
      height: 400, // 원하는 높이 설정       
      marginTop: 20,   // flex-wrap: wrap (줄 바꿈 허용)
    },
    scrollView: {
      width:340,
      flexWrap: 'wrap', // 자식 요소들을 래핑
      flexDirection: 'row', // 자식 요소들을 수평으로 배치
      flexGrow: 2, // 콘텐츠가 늘어나면서 스크롤을 허용
    },
    allergyListBox :{
      backgroundColor: '#ffffff',           // 배경색: 흰색
      borderWidth: 3,                       // 테두리 두께: 3px
      borderColor: '#0D7FFB',               // 테두리 색상: 파란색
      width: 100,                           // 너비: 100px
      height: 90,                           // 높이: 90px
      borderRadius: 10,                     // 모서리 둥글기: 10px
      flexDirection: 'column',              // flex 방향: 세로
      alignItems: 'center',                 // 수평 정렬: 중앙
      justifyContent: 'space-around',       // 수직 정렬: 요소 사이 공간 균등 분배
      marginBottom: 10,       
      marginRight:10
    },
    newaddAlltergy:{
      position: 'absolute',            // 상대적 위치 설정
      bottom: 100,                     // 하단으로부터 100px
      left: 90,                        // 좌측으로부터 90px
      flexDirection: 'row',            // 가로 정렬
      justifyContent: 'space-around',  // 공간을 균등하게 분배
      alignItems: 'center',            // 중앙 정렬
      width: 180,                      // 너비 130px
      height: 50,                      // 높이 50px
      backgroundColor: '#0D7FFB',      // 배경색 파란색
      borderRadius: 10,                // 둥근 모서리 10px
      paddingHorizontal: 15,           // 좌우 패딩 15px
    },
    newaddAlltergyText:{
      fontWeight:'600',
      fontSize:16,
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
  
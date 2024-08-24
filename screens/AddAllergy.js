import { UserContext} from '../App.js';
import {IPContext} from '../App.js';
import React, { useState ,useContext, useEffect} from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, ScrollView, Modal, TouchableWithoutFeedback, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

import Home from '../assets/img/Home.svg'
import CheckSquareG from'../assets/img/CheckSquareG.svg'
import Camera from'../assets/img/Camera.svg'
import Record from'../assets/img/Record.svg'
import PlusSquare from'../assets/img/PlusSquare.svg'
import Arrow_back from '../assets/img/arrow_back.svg'
import CheckSave from '../assets/img/CheckSave.svg'

export default function AddAllergy() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const {userId}=useContext(UserContext)
  const {IP} = useContext(IPContext);
  let postName = []
  let i=0;
  const [selectedAllergies, setSelectedAllergies] = useState(new Set());
  useEffect(() => {

    const findNew = async () => {
      try {
        const respond = await fetch(`http://${IP}/newAllergy?userId=${userId}`);

        console.log(respond);
        
      } catch (error) {
        console.error(error);
        alert('알러지 수정에 실패하였습니다.');
      }
    }
    
    const fetchData = async () => {
      try {
        const respond = await fetch(`http://${IP}/myAllergy`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: userId,
          }),
        });

        const result = await respond.json();
        
        setSelectedAllergies(prevSelected => {
          const newSelected = new Set(prevSelected);
          let i=0
          result.forEach(allergy => {
            const foundAllergy = allergyList.find(item => item.name === allergy);
            if (foundAllergy) {
              newSelected.add(foundAllergy.id);
            }
          });
          
          return newSelected;
        });
        
      } catch (error) {
        console.error(error);
        alert('알러지 수정에 실패하였습니다.');
      }
    };

    fetchData();
    findNew();
  }, []);
  const handlePress = (id) => { //선택된 알러지 색깔바꾸기
    setSelectedAllergies(prevSelected => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(id)) {
        newSelected.delete(id); // 이미 선택된 항목을 클릭하면 선택 해제
      } else {
        newSelected.add(id); // 선택되지 않은 항목을 클릭하면 선택됨
      }
      return newSelected;
    });
  };

  const handleSubmit=async()=>{
  try{
      bool.forEach((value, index)=>{
        if (value) {
          postName[i] = (allergyList[index].name);
          i++;
        }
      });
      const respond = await fetch(`http://${IP}/save/allergy`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: userId,
          food: postName
        })
      })
      const textResponse = await respond.text(); // 응답 본문을 문자열로 읽기
      console.log(textResponse); // 응답된 텍스트 출력

      alert(textResponse);
    } catch (error) {
      console.error(error);
      alert('알러지 수정에 실패하였습니다.');
    }

   }
  let [bool, setBool] = useState([false, false, false, false, false, false, false, false, false, false, false, false]); 

  const OK = (id) => {
    setBool((prevBool) => {
      const updatedBool = [...prevBool];
      updatedBool[id - 1] = !updatedBool[id - 1];
      return updatedBool;
      
    });
  };


  const [isModalVisible, setIsModalVisible] = useState(false);
  const [allergyList, setAllergyList] = useState([ //기본알러지들의 아이디, 이름, 파란아이콘, 선택됐을때 아이콘(흰색)으로 구성해서 DB에 저장해야함.
    { id: '1', name: '계란', image: require('./assets/addAllergyImg/friedEggs.png'), selectedImage: require('./assets/addAllergyImg/friedEggswhite.png') },
    { id: '2', name: '밀가루', image: require('./assets/addAllergyImg/loafBread.png'), selectedImage: require('./assets/addAllergyImg/loafBreadwhite.png') },
    { id: '3', name: "우유", image: require('./assets/addAllergyImg/jar.png'), selectedImage: require('./assets/addAllergyImg/jarwhite.png') },
    { id: '4', name: '닭고기', image: require('./assets/addAllergyImg/meat3.png'), selectedImage: require('./assets/addAllergyImg/meat3white.png') },
    { id: '5', name: '돼지고기', image: require('./assets/addAllergyImg/meat2.png'), selectedImage: require('./assets/addAllergyImg/meat2white.png') },
    { id: '6', name: '견과류', image: require('./assets/addAllergyImg/nuts.png'), selectedImage: require('./assets/addAllergyImg/nutswhite.png') },
    { id: '7', name: '새우', image: require('./assets/addAllergyImg/shrimp.png'), selectedImage: require('./assets/addAllergyImg/shrimpwhite.png') },
    { id: '8', name: '해산물', image: require('./assets/addAllergyImg/fish1.png'), selectedImage: require('./assets/addAllergyImg/fish1white.png') },
    { id: '9', name: '생선', image: require('./assets/addAllergyImg/fish2.png'), selectedImage: require('./assets/addAllergyImg/fishwhite.png') },
    { id: '10', name: '포도', image: require('./assets/addAllergyImg/grape.png'), selectedImage: require('./assets/addAllergyImg/grapewhite.png') },
    { id: '11', name: '바나나', image: require('./assets/addAllergyImg/banana.png'), selectedImage: require('./assets/addAllergyImg/bananawhite.png') },
    { id: '12', name: '사과', image: require('./assets/addAllergyImg/apple.png'), selectedImage: require('./assets/addAllergyImg/applewhite.png') },
  ]);

  
  const [text, setText] = useState('');
  const navigation = useNavigation();
  

  //저장하기를 눌렀을때 정보를 전달하기
  const handleNavigateToMyAllergy = () => {
    // 선택된 알러지 항목만 필터링
    const selectedItems = allergyList.filter(allergy => selectedAllergies.has(allergy.id));
    handleSubmit();
    navigation.navigate('MyAllergy', {
      selectedAllergies: selectedItems // 선택된 알러지 항목만 전달
    });
  };



  //알러지 추가하기 부분
  const showModal = () => { //알러지 추가하기를 눌렀을때 검은화면보여주기
    setIsModalVisible(true);
  };

  const hideModal = () => { //검은화면 숨기기
    setIsModalVisible(false);
  };

  const handleAddAllergy = () => { //새로운 알러지 추가하기 눌렀을때 배열의 크기늘리고 입력받은것을 이름으로
    if (text.trim()) {
      // 새로운 알러지 항목 추가
      const newAllergy = {
        id: (allergyList.length + 1).toString(),
        name: text,
        image: require('./assets/addAllergyImg/foodIcon.png'),
        selectedImage: require('./assets/addAllergyImg/foodIconwhite.png'),
      };
      setBool([...bool, false]);
      setAllergyList([...allergyList, newAllergy]);
      setText('');
      hideModal();
    }
  };

  
  return (
    <View style={styles.container}>
      <Modal
        transparent={true}
        visible={isModalVisible}
        onRequestClose={hideModal}
        animationType="fade"
      >
        <TouchableWithoutFeedback onPress={hideModal}>
          <View style={styles.darkOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <Text style={styles.modalText}>알러지 추가하기</Text>
                <TextInput
                  style={styles.textInput}
                  value={text}
                  onChangeText={setText}
                  placeholder="여기에 텍스트를 입력하세요"
                />
                <TouchableOpacity onPress={handleAddAllergy} style={styles.LastAddButton}>
                  <Text style={styles.addText}>추가하기</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <LinearGradient colors={['#51CE54', '#0D7FFB']} style={styles.gradient}>
        <View>
          <Image style={styles.headerImg} source={require('./assets/addAllergyImg/header-img.png')} />
          <Text style={styles.title}>알러지등록</Text>
        </View>
        <View style={styles.main}>
          <View style={styles.mainbox}>
            <TouchableOpacity
              onPress={() => navigation.goBack()} // 이전 페이지로 이동
              activeOpacity={0.9}
            >
              <Arrow_back/>
            </TouchableOpacity>
            <ScrollView contentContainerStyle={styles.scrollView} style={styles.allergyList}>
              {allergyList.map((allergy) => (
                <TouchableOpacity
                  key={allergy.id}
                  style={[
                    styles.allergyListBox,
                    { backgroundColor: selectedAllergies.has(allergy.id) ? '#0075FF' : '#FFFFFF' }
                  ]}
                  onPress={() => {
                    handlePress(allergy.id);
                    OK(allergy.id);
                  }}
                >
                  <Image source={selectedAllergies.has(allergy.id) ? allergy.selectedImage : allergy.image} />
                  <Text style={[styles.name, {color:selectedAllergies.has(allergy.id) ? "#FFFFFF" : '#0075FF'}]}>{allergy.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <TouchableOpacity style={styles.newaddAlltergy} onPress={showModal}>
            <PlusSquare />
            <Text style={styles.newaddAlltergyText}>알러지 추가하기</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNavigateToMyAllergy} style={styles.save}>
            <CheckSave />
            <Text style={styles.newaddAlltergyText}>저장하기</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
        <View style={styles.footerBar}>
        <TouchableOpacity style={styles.footerCenter} onPress={() => navigation.navigate('MainPage')} activeOpacity={0.9}>
            <Home style={styles.icon} />
            <Text style={styles.footerText}>홈</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerCenter} onPress={() => navigation.navigate('MyAllergy')} activeOpacity={0.9}>
            <CheckSquareG style={styles.icon} />
            <Text style={styles.selectText}>알러지 등록</Text>
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
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    width: 300,
    height: 200,
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    marginTop: 35,
    marginBottom: 25,
    fontSize: 16,
    fontWeight: '700',
  },
  LastAddButton: {
    backgroundColor: '#0075FF',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 70,
  },
  addText: {
    color: 'white',
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    paddingHorizontal: 10,
    marginBottom: 20,
    borderRadius: 10,
  },
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
    left: 120,
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
  allergyList: {
    width: '98%',
    height: 400,
    marginTop: 20,
  },
  scrollView: {
    width: '98%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    flexGrow: 2,
  },
  allergyListBox: {
    width: '30%',
    height: 100,
    borderRadius: 10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    marginRight: 10,
    borderWidth: 3,
    borderColor: '#0075FF',
  },
  allergyListBoxContent: {
    alignItems: 'center',
  },
  save:{
    position: 'absolute',            // 상대적 위치 설정
      bottom: 100,                     // 하단으로부터 100px
      left: 190,                        // 좌측으로부터 90px
      flexDirection: 'row',            // 가로 정렬
      justifyContent: 'space-around',  // 공간을 균등하게 분배
      alignItems: 'center',            // 중앙 정렬
      width: 150,                      // 너비 130px
      height: 50,                      // 높이 50px
      backgroundColor: '#0D7FFB',      // 배경색 파란색
      borderRadius: 10,                // 둥근 모서리 10px
      paddingHorizontal: 10,
      flex:1,
    justifyContent:'center',
  },
  name: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
    
  },
  newaddAlltergy: {
    position: 'absolute',            // 상대적 위치 설정
      bottom: 100,                     // 하단으로부터 100px
      left: 20,                        // 좌측으로부터 90px
      flexDirection: 'row',            // 가로 정렬
      justifyContent: 'space-around',  // 공간을 균등하게 분배
      alignItems: 'center',            // 중앙 정렬
      width: 150,                      // 너비 130px
      height: 50,                      // 높이 50px
      backgroundColor: '#0D7FFB',      // 배경색 파란색
      borderRadius: 10,                // 둥근 모서리 10px
      paddingHorizontal: 10,  
  },
  newaddAlltergyText: {
    fontWeight:'600',
      fontSize:15,
      color:'white',
      marginLeft:5
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
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  footerCenter: {
    alignItems: 'center',
  },
  icon: {
    marginBottom: 5,
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
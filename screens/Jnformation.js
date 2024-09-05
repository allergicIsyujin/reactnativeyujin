import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../contexts.js'; // 유저 정보를 관리하는 컨텍스트
import { IPContext } from '../contexts.js'; // 서버 IP 주소를 관리하는 컨텍스트
import { Text, View, StyleSheet, TouchableOpacity, Modal, Image, TouchableWithoutFeedback } from 'react-native'; // React Native에서 사용하는 기본 컴포넌트
import { LinearGradient } from 'expo-linear-gradient'; // 그라데이션 배경을 위한 컴포넌트
import { useNavigation, useRoute } from '@react-navigation/native'; // 네비게이션을 위한 훅

import Home from '../assets/img/Home.svg';
import CheckSquare from '../assets/img/CheckSquare.svg';
import CameraG from '../assets/img/CameraG.svg';
import Record from '../assets/img/Record.svg';
import MiniCamera from '../assets/img/MiniCamera.svg';
import RecordSave from '../assets/img/RecordSave.svg';
import Loading from './roading.js'
import BigYes from '../assets/img/bigYes.svg'
import BigNo from '../assets/img/bigNo.svg'

export default function Jnformation() {
    const navigation = useNavigation(); // 네비게이션 객체를 가져옴
    const { userId } = useContext(UserContext); // 유저 ID를 가져옴
    const { IP } = useContext(IPContext); // 서버 IP 주소를 가져옴
    const route = useRoute(); // 현재 라우트 정보를 가져옴
    const { photoBase64 } = route.params || {}; // 이전 화면에서 전달된 Base64 이미지 데이터를 가져옴

    const [foodName, setFoodName] = useState("치킨"); // 음식 이름 상태 (기본값: 치킨)
    const [backgroundColor, setBackgroundColor] = useState(1); // 배경색 상태 (1: 초록색-파란색, 0: 빨간색)
    const [descriptions, setDescriptions] = useState([]); // 재료 목록 상태
    const [notIngredients, setNotIngredients] = useState([]); // 제외 재료 목록 상태
    const [loading, setloading] = useState(false);

    const [isModalVisible, setIsModalVisible] = useState(true);
    useEffect(() => {
        // 서버로 Base64 이미지를 전송
        fetch(`http://${IP}/base64`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userid: userId,
                food: photoBase64,
            }),
        })
        .then(setloading(true))
        .then(response => response.json()) // 응답을 JSON 형태로 파싱
        .then(json => {
            setFoodName(json.result.foodName); // 음식 이름 설정

            // "ok" 값에 따라 배경색 설정
            if (json.result.ok === "O") {
                setBackgroundColor(1);
            } else {
                setBackgroundColor(0);
            }

            // 재료 목록과 제외 재료 목록 설정
            const updatedDescriptions = json.result.ingredients.map((ingredient, index) => ({
                id: index + 1, // 고유 ID 부여
                name: ingredient,
            }));

            setDescriptions(updatedDescriptions); // 재료 목록 업데이트
            setNotIngredients(json.result.notIngredients || []); // 제외 재료 목록 업데이트, 기본값은 빈 배열
        })
        .then(()=>{
            setloading(false)
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            alert('데이터를 가져오는 데 실패했습니다.'); // 오류 시 알림 표시
        });
    }, [photoBase64, IP, userId]); // photoBase64, IP, userId가 변경될 때마다 이 효과 실행

    const save = () => {
        // 이미지를 서버에 저장 요청
        fetch(`http://${IP}/saveImage?userId=${encodeURIComponent(userId)}`)
            .then(response => response.json())
            .then(json => {
                // alert('성공적으로 저장되었습니다.'); // 성공 시 알림 표시
                navigation.navigate('Record');
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                alert('이미지 저장에 실패했습니다.'); // 오류 시 알림 표시
            });
    };

    const goToRecord = () => {
        const data = [
            {
                image: `data:image/png;base64,${photoBase64}`,
                description: descriptions,
                foodName: foodName,
                backgroundColor: backgroundColor,
            },
        ];

        navigation.navigate('Record', { data }); // Record 화면으로 데이터 전달 후 이동
    };
    const showModal = () => { //알러지 추가하기를 눌렀을때 검은화면보여주기
        setIsModalVisible(true);
      };
    
      const hideModal = () => { //검은화면 숨기기
        setIsModalVisible(false);
      };
    if (loading) {
        return <Loading  style={styles.view}/>;
      }
    return (
        <View style={styles.container}>
            <Modal
        transparent={true}
        visible={isModalVisible}
        onRequestClose={showModal}
        animationType="fade"
      >
        <TouchableWithoutFeedback onPress={hideModal}>
          <View style={styles.darkOverlay}>
            <TouchableWithoutFeedback>
              <View style={[styles.modalContent, {backgroundColor: backgroundColor ? '#51CE54' : '#FF4444'}]}>
                {backgroundColor ?
                    (<View style={styles.IconBox}>
                        <BigYes style={styles.Icon}/>
                        <Text style={styles.modalText}>드셔도 괜찮아요!</Text>
                        <View><Text style={styles.text}>많이 사용되는 레시피를 기준으로 만들었습니다</Text>
                        <Text style={styles.text}>좀더 상세히 검색 후 안전하게 드세요</Text>
                            </View>
                        </View>) :
                        (<View style={styles.IconBox}>
                            <BigNo style={styles.Icon2}/>
                            <Text style={styles.modalText}>먹으면 위험해요!</Text>
                            <View><Text style={styles.text}>많이 사용되는 레시피를 기준으로 만들었습니다</Text>
                        <Text style={styles.text}>좀더 상세히 검색 후 안전하게 드세요</Text>
                            </View>
                            </View>)
                }
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
            <LinearGradient 
                colors={backgroundColor === 1 ? ['#51CE54', '#0D7FFB'] : ['#FF4444', '#FF4444']} 
                style={styles.gradient}
            >
                <View>
                    <Image style={styles.headerImg} source={require('./assets/cameraImg/header-img.png')} />
                    <Text style={styles.title}>음식 정보</Text>
                </View>
                <View style={styles.main}>
                    {photoBase64 ? (
                        <Image source={{ uri: `data:image/png;base64,${photoBase64}` }} style={styles.foodImg} />
                    ) : (
                        <Text>No photo available</Text>
                    )}
                    <View style={styles.foodBox}>
                        <Text style={styles.foodName}>{foodName}</Text>
                        <View style={styles.foodData}>
                            {/* 재료 목록 표시, notIngredients에 포함된 재료는 빨간색으로 표시 */}
                            {descriptions.map((item) => (
                                <Text 
                                    key={item.id} 
                                    style={[
                                        styles.allergy, 
                                        notIngredients.includes(item.name) && { color: 'red' } // notIngredients가 포함된 경우 빨간색으로 표시
                                    ]}
                                >
                                    {item.name}
                                </Text>
                            ))}
                        </View>
                    </View>
                    <TouchableOpacity 
                        style={styles.button1} 
                        onPress={() => navigation.goBack()} // 이전 화면으로 이동
                        activeOpacity={0.9}
                    >
                        <MiniCamera />
                        <Text style={styles.buttonText}>다시 촬영하기</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button2} onPress={() => save()}>
                        <RecordSave />
                        <Text style={styles.buttonText}>기록 저장하기</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.footer}>
                    <View style={styles.footerBar}>
                        <TouchableOpacity 
                            style={styles.footerCenter} 
                            onPress={() => navigation.navigate('MainPage')} 
                            activeOpacity={0.9}
                        >
                            <Home style={styles.icon} />
                            <Text style={styles.footerText}>홈</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.footerCenter} 
                            onPress={() => navigation.navigate('MyAllergy')} 
                            activeOpacity={0.9}
                        >
                            <CheckSquare style={styles.icon} />
                            <Text style={styles.footerText}>알러지 등록</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.footerCenter} 
                            onPress={() => navigation.navigate('Camera')} 
                            activeOpacity={0.9}
                        >
                            <CameraG style={styles.icon} />
                            <Text style={styles.selectText}>알러지 검색</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.footerCenter} 
                            onPress={() => navigation.navigate('Record')} 
                            activeOpacity={0.9}
                        >
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
    IconBox:{
        flex:1,
        alignItems:'center',
    },
    text:{
        color:'white',
        fontWeight:'700',
        textAlign: 'center',
    },
    view:{
        zIndex:10
    },
    Icon2:{
        marginTop:25,
    },
    Icon:{
        marginTop:25,
    },
    darkOverlay: {
        width:'100%',
        height:'100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalContent: {
        
        width: 300,
        height: 240,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 10,
        alignItems: 'center',
      },
      modalText: {
        marginTop: 35,
        marginBottom: 25,
        fontSize: 25,
        fontWeight: '700',
        color:'white'
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
        left: 148,
        fontWeight: '700',
    },
    main: {
        backgroundColor: 'white',
        width: '100%',
        borderTopRightRadius: 80,
        height: 650,
        overflow: 'hidden',
    },
    foodImg: {
        width: '100%',
        height: 380,
    },
    foodData: {
        flexDirection: 'row',
        width: 350,
        flexWrap: 'wrap',
    },
    foodName: {
        fontSize: 24,
        fontWeight: '700',
    },
    allergy: {
        marginTop: 8,
        marginRight: 8,
    },
    button1: {
        position: 'absolute',
        left: 35,
        bottom: 110,
        width: 150,
        padding: 10,
        backgroundColor: '#0075FF',
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 15,
    },
    foodBox: {
        width: '98%',
        marginLeft: 20,
        marginTop: 20,
    },
    button2: {
        position: 'absolute',
        left: 195,
        bottom: 110,
        width: 150,
        padding: 10,
        backgroundColor: '#0075FF',
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
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
    footerText: {
        color: '#757575',
        fontWeight: '500',
    },
    selectText: {
        color: '#51CE54',
        fontWeight: '500',
    }
});
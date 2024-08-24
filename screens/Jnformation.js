import React, { useContext, useState,useEffect } from 'react';
import { UserContext } from '../App.js';
import {IPContext} from '../App.js';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';

import Home from '../assets/img/Home.svg'
import CheckSquare from'../assets/img/CheckSquare.svg'
import CameraG from'../assets/img/CameraG.svg'
import Record from'../assets/img/Record.svg'
import MiniCamera from'../assets/img/MiniCamera.svg'
import RecordSave from '../assets/img/RecordSave.svg'

export default function Jnformation() {
    const navigation = useNavigation();
    const { userId } = useContext(UserContext);
    const {IP} = useContext(IPContext);
    const route = useRoute();
    const { photoBase64 } = route.params || {}; // Base64 이미지 데이터 수신
    const [foodName, setfoodName] = useState("치킨"); // 임시로 설정된 음식 이름
    const [backgroundColor, setbackgroundColor] = useState(1); // 배경색: 1은 먹을 수 있음, 0은 먹을 수 없음
    useEffect(() => {
        // 데이터 전송
        fetch(`http://${IP}/base64`, {//{"ok": "O", "foodName": "짜장면", "ingredients": ["면", "춘장", "돼지고기", "양파", "호박", "당근"], "notIngredients": []}
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userid: userId,
                food: photoBase64
            })
        })
        .then(response => response.json())
        .then(json => {
            setfoodName(json.result.foodName); // 응답에서 음식 이름 설정

            // 새로운 descriptions 배열 생성
            const updatedDescriptions = json.result.ingredients.map((ingredient, index) => ({
                id: index + 1, // 고유 ID 부여
                name: ingredient
            }));

            setDescriptions(updatedDescriptions); // descriptions 상태 업데이트
            console.log(descriptions)
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            alert('로그인에 실패하셨습니다.');
        });
    }, [photoBase64]);
    const save=()=>{
        fetch(`http://${IP}/saveImage?userId=${encodeURIComponent(userId)}`)
         .then(response => response.json())
           .then(json => {
                alert('sucess');
             // 결과를 알림으로 표시
           })//navigation.navigate('MainPage')
           .catch(error => {
             console.error('Error fetching data:', error);
             alert('로그인에 실패하셨습니다.');
           });
       }
    const [descriptions, setDescriptions] = useState([
        { id: 1, name: "닭고기" },
        { id: 2, name: "대두" },
        { id: 3, name: "계란" },
        { id: 4, name: "우유" }
    ]);

    const goToRecord = () => { 
        const data = [
            { image: `data:image/png;base64,${photoBase64}`, description: descriptions, foodName: foodName, backgroundColor: backgroundColor }
        ];
        
        navigation.navigate('Record', { data });
    };

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#51CE54', '#0D7FFB']} style={styles.gradient}>
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
                            {descriptions.map((item) => (
                                <Text key={item.id} style={styles.allergy}>{item.name}</Text>
                            ))}
                        </View>
                    </View>
                    <TouchableOpacity 
                        style={styles.button1} 
                        onPress={() => navigation.goBack()}
                        activeOpacity={0.9}
                    >
                        <MiniCamera />
                        <Text style={styles.buttonText}>다시 촬영하기</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button2} onPress={()=>save()}>
                        <RecordSave />
                        <Text style={styles.buttonText}>기록 저장하기</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.footer}>
        <View style={styles.footerBar}>
        <TouchableOpacity style={styles.footerCenter} onPress={() => navigation.navigate('MainPage')} activeOpacity={0.9}>
            <Home style={styles.icon} />
            <Text style={styles.footerText}>홈</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerCenter} onPress={() => navigation.navigate('MyAllergy')} activeOpacity={0.9}>
            <CheckSquare style={styles.icon} />
            <Text style={styles.footerText}>알러지 등록</Text>
            </TouchableOpacity>
          <TouchableOpacity style={styles.footerCenter} onPress={() => navigation.navigate('Camera')} activeOpacity={0.9}>
            <CameraG style={styles.icon} />
            <Text style={styles.selectText}>알러지 검색</Text>
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
        left: 30,
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
        left: 190,
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

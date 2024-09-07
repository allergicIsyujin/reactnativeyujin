import React, { useState, useCallback, useContext } from 'react';
import { UserContext } from '../contexts.js';
import { IPContext } from '../contexts.js';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import Home from '../assets/img/Home.svg';
import CheckSquare from '../assets/img/CheckSquare.svg';
import CameraG from '../assets/img/CameraG.svg';
import Record from '../assets/img/Record.svg';
import MiniCamera from '../assets/img/MiniCamera.svg';
import Check from '../assets/img/Check.svg';

export default function Camera() {
    const navigation = useNavigation();
    const { userId } = useContext(UserContext);
    const [imageUri, setImageUri] = useState(null);
    const [error, setError] = useState(null);
    const { IP } = useContext(IPContext);

    useFocusEffect(
        useCallback(() => {
            const takePhoto = async () => {
                // 카메라 권한 요청
                const { status } = await ImagePicker.requestCameraPermissionsAsync();
                if (status !== 'granted') {
                    setError('죄송합니다, 카메라 권한이 필요합니다.');
                    return;
                }

                // 사진 촬영
                let result = await ImagePicker.launchCameraAsync({
                    base64: false,  // Base64 데이터 비활성화
                    quality: 0.4,
                });

                if (!result.canceled) {
                    const uri = result.assets[0].uri; // URI 데이터
                    const fileName = uri.split('/').pop(); // 파일명 추출

                    // 새로운 폴더 위치 설정 (앱의 로컬 파일 시스템 내에 images 폴더)
                    const folderUri = FileSystem.documentDirectory + 'screens/assets/image/'; // 폴더 URI

                    // 폴더가 없으면 생성
                    await FileSystem.makeDirectoryAsync(folderUri, { intermediates: true });

                    // 파일을 지정한 폴더로 이동
                    const newUri = folderUri + fileName;
                    await FileSystem.moveAsync({
                        from: uri,
                        to: newUri,
                    });

                    setImageUri(newUri); // 새 URI 저장
                    console.log('Image saved to:', newUri); // URI 출력
                }
            };

            takePhoto();

            return () => {
                // 정리 함수 (선택 사항)
            };
        }, [])
    );

    const navigateJnformation = () => {
        if (imageUri) {
            navigation.navigate('Jnformation', { photoUrl: imageUri });
        } else {
            setError('사진이 촬영되지 않았습니다.');
        }
    };

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#51CE54', '#0D7FFB']} style={styles.gradient}>
                <Image style={styles.headerImg} source={require('./assets/cameraImg/header-img.png')} />
                {imageUri && (
                    <Image
                        source={{ uri: imageUri }}
                        style={styles.image}
                    />
                )}
                <View style={styles.buttonBox}>
                <TouchableOpacity
                    style={styles.button1}
                    onPress={() => navigation.goBack()}
                    activeOpacity={0.9}
                >
                    <MiniCamera />
                    <Text style={styles.buttonText}>다시 촬영하기</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button2} onPress={navigateJnformation}>
                    <Check />
                    <Text style={styles.buttonText}>사진 사용하기</Text>
                </TouchableOpacity>
                </View>
                
                <View style={styles.white}></View>
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
    
    white: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        zIndex: 0
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
    buttonBox:{
        zIndex:10,
        flex:1,
        flexDirection:'row',
        justifyContent:'space-around',
        width:'90%',
        marginLeft:'5%',
        position:'absolute',
        bottom:'15%',
    
    },
    button1: {
        width: 150,
        padding: 10,
        backgroundColor: '#0075FF',
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        zIndex: 1
    },
    button2: {
        width: 150,
        padding: 10,
        backgroundColor: '#0075FF',
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        zIndex: 1
    },
    image: {
        width: '100%',
        height: '50%',
        marginTop: '10%',
    },
    buttonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
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
    },
});

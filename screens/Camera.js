import React, { useState, useCallback, useContext } from 'react';
import { UserContext } from '../App.js';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';

export default function Camera() {
    const navigation = useNavigation();
    const { userId } = useContext(UserContext);
    const [imageBase64, setImageBase64] = useState(null);
    const [error, setError] = useState(null);

    useFocusEffect(
        useCallback(() => {
            const takePhoto = async () => {
                // 권한 요청
                const { status } = await ImagePicker.requestCameraPermissionsAsync();
                if (status !== 'granted') {
                    setError('죄송합니다, 카메라 권한이 필요합니다.');
                    return;
                }

                // 사진 촬영
                let result = await ImagePicker.launchCameraAsync({
                    base64: true,  // Base64 데이터 요청
                    quality: 1,
                });

                if (!result.canceled) {
                    const base64Image = result.assets[0].base64; // Base64 데이터
                    setImageBase64(base64Image); // Base64 데이터 저장
                    console.log(base64Image); // Base64 데이터 출력
                }
            };

            takePhoto();

            return () => {
                // Clean-up function (optional)
            };
        }, [])
    );

    const navigateJnformation = () => {
        if (imageBase64) {
            navigation.navigate('Jnformation', { photoBase64: imageBase64 });
        } else {
            setError('No photo taken.');
        }
    };

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#51CE54', '#0D7FFB']} style={styles.gradient}>
                {imageBase64 && (
                    <Image 
                        source={{ uri: `data:image/png;base64,${imageBase64}` }} 
                        style={styles.image} 
                    />
                )}
                
                <TouchableOpacity style={styles.button} onPress={navigateJnformation}>
                    <Image source={require('./assets/cameraImg/search.png')} />
                    <Text style={styles.buttonText}>조사하기</Text>
                </TouchableOpacity>

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
    button: {
        position: 'absolute',
        left: 130,
        bottom: 110,
        width: 120,
        padding: 10,
        backgroundColor: '#0075FF',
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        paddingHorizontal: 15,
    },
    image: {
        width: '100%',
        height: 400,
        marginTop: 150,
    },
    buttonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
    },
    title: {
        color: '#FFFFFF',
        fontSize: 25,
        position: 'absolute',
        top: 85,
        left: 175,
        fontWeight: '700',
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

//home은 아직 이상하게 합칠라하면 오류가나서 일욜에 온이한테 물어보면서 합칠예정 + 검색 기능도 구현해야함 근데 검색기능은 현호가 한다.
//이거 잘 합칠 수 있을려나 모르겠다.


import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, ScrollView, Modal, TouchableWithoutFeedback, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function AddAllergy() {
  
  const navigation = useNavigation();
  return (
        
        <View style={styles.footer}>
          <View style={styles.footerBar}>
            <TouchableOpacity style={styles.footerCenter} onPress={() => navigation.navigate('Home')} activeOpacity={0.9}>
              <Image source={require('./assets/homeImg/Home.png')} style={styles.icon} />
              <Text style={styles.selectText}>홈</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerCenter} onPress={() => navigation.navigate('MyAllergy')} activeOpacity={0.9}>
              <Image source={require('./assets/homeImg/CheckSquare.png')} style={styles.icon} />
              <Text style={styles.footerText}>알러지 등록</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerCenter} onPress={() => navigation.navigate('Camera')} activeOpacity={0.9}>
              <Image source={require('./assets/homeImg/Camera.png')} style={styles.icon} />
              <Text style={styles.footerText}>알러지 검색</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerCenter} onPress={() => navigation.navigate('Record')} activeOpacity={0.9}>
              <Image source={require('./assets/homeImg/record.png')} style={styles.icon} />
              <Text style={styles.footerText}>기록</Text>
            </TouchableOpacity>
          </View>
        </View>
  );
}

const styles = StyleSheet.create({
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

import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {
  return (
    <View style={styles.container}>
      <LinearGradient colors={['#51CE54', '#0D7FFB']} style={styles.gradient}>
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

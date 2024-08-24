// import React, { useState } from 'react';
// import { View, TextInput } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';

// export default function App() {
//   // 서울의 위도와 경도
//   const seoulRegion = {
//     latitude: 37.5665,
//     longitude: 126.9780,
//     latitudeDelta: 0.05,
//     longitudeDelta: 0.05,
//   };

//   // region을 initialRegion으로 초기화
//   const [region, setRegion] = useState(seoulRegion);

//   const markers = [
//     {
//       coordinate: { latitude: 37.5665, longitude: 126.9780 },
//       title: 'Marker Title',
//       description: 'Marker Description',
//     },
//   ];

//   const searchRestaurants = (query) => {
//     // 검색 로직을 여기에 추가
//     console.log('Search for:', query);
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <TextInput
//         placeholder="Search for a menu"
//         onSubmitEditing={(event) => searchRestaurants(event.nativeEvent.text)}
//         style={{ height: 40, marginTop: 10, borderColor: 'gray', borderWidth: 1, paddingLeft: 8 }}
//       />
//       <MapView
//         style={{ flex: 1 }}
//         region={region} // region을 설정하여 지도 상태를 유지
//         onRegionChangeComplete={(newRegion) => setRegion(newRegion)} // region이 변경될 때 업데이트
//       >
//         {markers.map((marker, index) => (
//           <Marker
//             key={index}
//             coordinate={marker.coordinate}
//             title={marker.title}
//             description={marker.description}
//           />
//         ))}
//       </MapView>
//     </View>
//   );
// }

//스택형식으로 @react-navigation/native, @react-navigation/stack 두개 install해서 진행시킴
import * as React from 'react';
import { Text, View, Button, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useState, createContext } from 'react';

import MyAllergy from './screens/MyAllergy';
import AddAllergy from './screens/AddAllergy';
import Record from './screens/Record';
import Result from './screens/Result';
import Camera from './screens/Camera';
import Jnformation from './screens/Jnformation';
import Login from './screens/Login';
import BeforeMain from './screens/BeforeMain';
import SignUp from './screens/SignUp'
import MainPage from './screens/MainPage'
import Search from './screens/Search'

const Stack = createStackNavigator();
export const UserContext = createContext();
export const IPContext = createContext();

export default function App() {
  const [userId, settingId] = useState(null)
  const [IP, settingIP] = useState("10.150.151.116:3000");
  console.log(userId)
  return ( //기본은 home으로 지정후, 새로생기는 파일마다 이동가능하게 컴포넌트설정.
    <UserContext.Provider value={{ userId, settingId }}>
    <IPContext.Provider value={{IP, settingIP}}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainPage"> 
      <Stack.Screen
          name='Login'
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='BeforeMain'
          component={BeforeMain}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='SignUp'
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MainPage"
          component={MainPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Search'
          component={Search}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MyAllergy"
          component={MyAllergy}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddAllergy"
          component={AddAllergy}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Record'
          component={Record}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Result'
          component={Result}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Camera'
          component={Camera}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Jnformation'
          component={Jnformation}
          options={{ headerShown: false }}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
    </IPContext.Provider>
    </UserContext.Provider>
  );
}
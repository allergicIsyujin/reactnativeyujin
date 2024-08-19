//스택형식으로 @react-navigation/native, @react-navigation/stack 두개 install해서 진행시킴
import * as React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


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

const Stack = createStackNavigator();

export default function App() {
  
  
  
  return ( //기본은 home으로 지정후, 새로생기는 파일마다 이동가능하게 컴포넌트설정.
    <NavigationContainer>
      <Stack.Navigator initialRouteName="BeforeMain"> 
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
  );
}
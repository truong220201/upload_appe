import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import {enableScreens} from 'react-native-screens';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import front from './app/screens/MoDau/front';
import chontrinhdo from './app/screens/TestForm/chontrinhdo';
//layer trang chủ 
import Home from './app/screens/Home/Home';
//layer sau khi ấn vào từng danh mục tại menu
import menuScreen from './app/screens/List/menuScreen';
//layer footer
import bTabs from './bottomTabs';
//layer hướng dẫn trước khi kiểm tra
import huongdan from './app/screens/HuongDan/huongdan';
//layer kiểm tra
import testScreen from './app/screens/BaiTest/Test/testScreen';
//xem ket qua
import ketqua from './app/screens/BaiTest/KetQua/ketqua';
//
import xemlai from './app/screens/BaiTest/KetQua/XemLai/xemlaibaitest';
//test
import testTimer from './app/screens/TestForm/testTimer';
//dang nhap dang ki
import LoginScreen from './app/screens/DangNhapDangKy/dangnhap';
import SignUpScreen from './app/screens/DangNhapDangKy/dangki';
//
import luachon from './app/screens/List/luachon';
//
import listbt from './app/screens/List/listbt';
//
import ProfileScreen from './app/screens/User/userInfo';
//
import gioiThieu from './app/screens/TestForm/gioithieu';
//
import speech from './app/screens/HocSpeech/speech';
import speechadd from './app/screens/HocSpeech/speechadd';
import sound from './app/screens/HocSpeech/sound';
import learnspeech from './app/screens/HocSpeech/learnspeech';
//thanh tich
import thanhTich from './app/screens/TestForm/thanhtich';

const Stack = createNativeStackNavigator();
//set màu cho screen
const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'red',
  },
};

export default class App  extends React.Component {
  render(){
    return (
      <NavigationContainer>
        <Stack.Navigator  initialRouteName='front' screenOptions={{headerShown: true}}>
          <Stack.Screen name = "front" component = {front} options={{headerShown: false}} />
          <Stack.Screen name = "chontrinhdo" component = {chontrinhdo} options={{title:''}} />
          <Stack.Screen name = "home" component = {Home} options={{headerShown: false}} />
          <Stack.Screen name = "menuScreen" component = {menuScreen}  options={{title:'',headerTransparent:true,headerShadowVisible:false,headerTintColor:'white'}}  />
          <Stack.Screen name = "huongdan" component = {huongdan}  options={{title:'',headerTransparent:true,headerShadowVisible:false,headerTintColor:'black'}} />

          <Stack.Screen name = "testScreen" component = {testScreen} options={{headerShown: false,title : '',headerShadowVisible:false,
          headerStyle:{
              backgroundColor:'#fff',
          },
          headerRight:()=>(<TouchableOpacity style={styles.btnNopbai}>
                            <Text style={{color:'white',fontSize:15,}}>Nộp bài</Text>
                          </TouchableOpacity>)
          }} />
          <Stack.Screen name = "tm" component = {testTimer} options={{headerShown: false}} />
          <Stack.Screen name = "btab" component = {bTabs} options={{headerShown: false}} />
          <Stack.Screen name = "kq" component = {ketqua} options={{headerShown: false}} />
          <Stack.Screen name = "xemLaiTestScreen" component = {xemlai} options={{headerShown: false}} />
          <Stack.Screen name = "dangnhap" component = {LoginScreen} options={{headerShown: true,title:'',headerTransparent:true,headerShadowVisible:false,headerTintColor:'white'}} />
          <Stack.Screen name = "dangky" component = {SignUpScreen} options={{headerShown: true,title:'',headerTransparent:true,headerShadowVisible:false,headerTintColor:'white'}} />
          <Stack.Screen name = "luachon" component = {luachon} options={{headerShown: true,title:'Kiến thức cần thiết cho bạn',headerTransparent:true,headerShadowVisible:false,headerTintColor:'#009f00'}} />
          <Stack.Screen name = "listbt" component = {listbt} options={{headerShown: true,title:'Chi tiết',headerTransparent:true,headerShadowVisible:false,headerTintColor:'#009f00'}} />


          <Stack.Screen name = "ps" component = {ProfileScreen} options={{headerShown: true,title:'',headerTransparent:true,headerShadowVisible:false,headerTintColor:'white'}}  />
          
          <Stack.Screen name = "gioithieu" component = {gioiThieu} options={{headerShown: true,title:'',headerTransparent:true,headerShadowVisible:false,headerTintColor:'white'}}  />
          <Stack.Screen name = "speech" component = {speech}  options={{headerShown: true,title:'',headerTransparent:true,headerShadowVisible:false,headerTintColor:'white'}} />
          <Stack.Screen name = "speechadd" component = {speechadd}  options={{headerShown: true,title:'',headerTransparent:true,headerShadowVisible:false,headerTintColor:'white'}} />
          <Stack.Screen name = "sound" component = {sound}  options={{headerShown: true,title:'',headerTransparent:true,headerShadowVisible:false,headerTintColor:'white'}} />
          <Stack.Screen name = "learnspeech" component = {learnspeech}  options={{headerShown: true,title:'',headerTransparent:true,headerShadowVisible:false,headerTintColor:'white'}} />
          <Stack.Screen name = "thanhtich" component = {thanhTich}  options={{headerShown: true,title:'',headerTransparent:true,headerShadowVisible:false,headerTintColor:'white'}} />
         

        </Stack.Navigator>
        
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnNopbai:{
    backgroundColor:'#4fad68',
    borderRadius:5,
    width: 100,
    height:35,
    alignItems:'center',
    justifyContent:'center',
    elevation:2,
  },
  timer:{
    alignSelf:'center',
    width: 150,
  },
});

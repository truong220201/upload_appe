import React, { useState } from 'react';
import { Animated,TouchableOpacity,TouchableHighlight,ScrollView, Text, View,Button,StyleSheet,Image,ImageBackground,Dimensions } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';

export default class DanhSach extends React.Component{ 
    
  render(){
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const { navigation } = this.props;
    return (
    <ImageBackground style = {styles.vw1a} source={{uri:'https://scontent.fhan5-3.fna.fbcdn.net/v/t39.30808-6/285335816_113406344719178_1405762868185025302_n.jpg?stp=dst-jpg_p526x296&_nc_cat=106&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=f93jzUdCQEMAX_kIJZ6&_nc_ht=scontent.fhan5-3.fna&oh=00_AT_6elmCCcbMUfcVrPgs7JWXX330QyeX1SzNEwx_qzwWPw&oe=629CD9E4'}}>
    <LinearGradient colors={[ '#e6e6e60a' , '#e6e6e60a' , '#e6e6e60a' , '#fff']} style={styles.container}>
        <View style = {{flex:2,width:'100%',alignItems:'center',top:windowHeight/5}}>
            <Animatable.Text animation="slideInDown" iterationCount={1} direction="alternate">
                <Text style={{color:'green',fontSize:50,fontWeight:'bold',fontFamily: 'Roboto'}}>PiLight</Text>
            </Animatable.Text>
        </View> 
            <Image style={{ width:windowWidth/2.4,height:windowHeight/14,top:-100,marginLeft:'-29%'}} source={{uri:'https://scontent.fhan3-5.fna.fbcdn.net/v/t39.30808-6/285316037_113215248071621_543985734232839707_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=oPiK3WcTmoIAX8JGy1p&tn=GI5d99hiD6ljzCNj&_nc_ht=scontent.fhan3-5.fna&oh=00_AT-R7Gkf34-7qGfpTGIsIHtuHJBQt3MmyLRuBNlcb0xy5g&oe=629D574C'}}/>
            <Image style={{ width:windowWidth/2.2,height:windowHeight/17,top:'19%',marginRight:'30%'}} source={{uri:'https://scontent.fhan3-3.fna.fbcdn.net/v/t39.30808-6/283967784_113120864747726_6560668842287762676_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=MPC8x5MtjMoAX9Wz9kQ&_nc_ht=scontent.fhan3-3.fna&oh=00_AT96ZTzZ_ztrWg2UWGV-sI4OLL6s0eUNjk0HJrPcjox32A&oe=629D6BF5'}}/>
        <View style={{flex:2,width:'100%',alignItems:'center',justifyContent:'center',justifyContent:'flex-end'}}>
            
           
            <TouchableHighlight style={styles.btnStart} onPress={()=>navigation.navigate('home',{uid:'0',email:'Anonymous'})} underlayColor="white">
                <View>
                    <Text style={styles.btnTextStart}>BẮT ĐẦU NGAY NÀO</Text>
                </View> 
            </TouchableHighlight> 
            <TouchableHighlight style={styles.btnLoggin} onPress={()=>navigation.navigate('dangnhap')} underlayColor="white">
                <View>
                    <Text style={styles.btnTextLoggin}>TÔI ĐÃ CÓ TÀI KHOẢN</Text>
                </View>
            </TouchableHighlight>
        </View>
        
    </LinearGradient>
    </ImageBackground>
)
}}; 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent:'center',
      },
      vw1a:{
          height:'100%',
          width:'100%',
          zIndex:100,
      },
    btnStart: {
        marginBottom: 20,
        width: '90%',
        height:'17%',
        alignItems: 'center',
        backgroundColor: '#6bdb90',
        justifyContent:'center',
        borderRadius:30,
        elevation:2,
    },
    btnLoggin: {
        marginBottom: 30,
        width: '90%',
        height:'17%',
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent:'center',
        borderRadius:30,
        elevation:2,
    },
    btnTextStart: {
        textAlign: 'center',
        color: 'white',
        fontSize:18,
    },
    btnTextLoggin: {
        textAlign: 'center',
        color: '#69d69e',
        fontSize:20,
    }
  });

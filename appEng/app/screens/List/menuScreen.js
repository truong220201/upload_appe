import React, { useState } from 'react';
import { Dimensions,Animated,TouchableOpacity,TouchableHighlight,ScrollView, Text, View,Button,StyleSheet,Image,ImageBackground } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from 'react-native-elements';

import * as Animatable from 'react-native-animatable';

//css
import { styles } from '../Css/CssList/CssMenu';

export default class layerMenu extends React.Component{ 
  render(){
      
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const { navigation ,route} = this.props;
    const { loaiId, ten,id,name,uid,email} = route.params;
    this.uid=uid;
    this.email=email;
    const tsp = {
        from: {
          opacity: 0,
          left:700,
        },
        to: { 
          opacity: 1,
          left:0
        },
      }; 
      const pst = {
        from: {
          opacity: 0,
          left:-700,
        },
        to: { 
          opacity: 1,
          left:0
        },
      }; 
    return (
    <ImageBackground style={styles.container} source={{uri:'https://png.pngtree.com/png-vector/20191109/ourlarge/pngtree-abc-blocks-basic-alphabet-knowledge-flat-color-icon-vector-png-image_1968303.jpg'}}>
        <LinearGradient style={styles.inContainer} colors={[ '#40d7779e' , '#40d7779e' , '#ffffff9e' , '#fff']} >
            <View style={styles.vw1}>
                <Text style={styles.txtTitle}></Text>                                                                           
            </View>
            <View style={styles.vw2}>
                <Animatable.Text animation={pst} style={{width: windowWidth,}} >
                    <View style={{width:windowWidth}}>
                        <TouchableOpacity onPress={()=>{navigation.navigate('gioithieu',{id:0,ten:0,uid:this.uid,email:this.email})}} style={styles.btnInfo}>
                            <View style={{height:'100%',flex:1,justifyContent:'center'}}>
                                <Icon color={'#6dde9e'} size={35} name='lightbulb-outline'/>
                            </View>
                            <View style={{height:'100%',flex:4,justifyContent:'center'}}>
                                <Text style={{fontSize:20,fontWeight:'bold'}}>Giới thiệu</Text>
                            </View>
                            <View style={{height:'100%',flex:1,justifyContent:'center'}}>
                                <Icon color={'#88e7c6'} size={35} name='done'/>
                            </View> 
                        </TouchableOpacity>
                    </View>
                </Animatable.Text>
                <Animatable.Text animation={tsp} style={{width: windowWidth,}} >
                    <View style={{width:windowWidth}}>
                        <TouchableOpacity onPress={()=>{navigation.navigate('huongdan',{id:id,ten:ten,uid:this.uid,email:this.email,socau:10,tg:15})}} style={styles.btnInfo}>
                            <View style={{height:'100%',flex:1,justifyContent:'center'}}>
                                <Icon color={'#6dde9e'} size={35} name='auto-awesome'/>
                            </View>
                            <View style={{height:'100%',flex:4,justifyContent:'center'}}>
                                <Text style={{fontSize:20,fontWeight:'bold'}}>Làm bài test</Text>
                            </View>
                            <View style={{height:'100%',flex:1,justifyContent:'center'}}>
                                <Icon color={'#88e7c6'} size={35} name='done'/>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Animatable.Text>
                
            </View>
        </LinearGradient>
    </ImageBackground>
)
}};

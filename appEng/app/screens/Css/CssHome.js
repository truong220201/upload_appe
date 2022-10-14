import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
        footer: {
            height:60,
            backgroundColor: '#fff',
            alignItems: 'center',
            flexDirection:'row',
            elevation:3,
          },
          c4: { 
            padding:10,
            flex: 10,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection:'row',
          },
        container: {
          flex: 1,
          backgroundColor: '#fff',
          alignItems: 'center',
        },
        vw1:{
            height:170,
            padding:10,
            width:'100%',
            backgroundColor:'#f5f5f500',
            zIndex:100,
            flexDirection:'column',
            paddingTop:40,
            borderWidth:2,
            borderColor:'white'
        },
        vw1a:{
            height:170,
            width:'100%',
            backgroundColor:'#f5f5f500',
            zIndex:100,
            flexDirection:'column',
            borderRadius:20,
            borderWidth:1
        },
        vw2:{
            flex:11,
            width:'100%',
        },
        content:{
            alignItems:'center',
            justifyContent:'center',
            width:'100%',
            flexWrap:'wrap',
            flexDirection:'row'
        },
        circle:{
            width:100,
            height:100,
            borderRadius:50,
        },
        vTxtLoai:{ 
            alignItems:'center',
            padding:10,
            
        },
        txtLoai:{
            color:'#757575',
            fontSize:15,
            fontWeight:'bold'
        }
      });
    
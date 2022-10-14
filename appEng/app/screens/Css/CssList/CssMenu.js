import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent:'center',
      zIndex:1,
    },
    inContainer: {
        width:'100%',
        height:'100%',
        alignItems: 'center',
        justifyContent:'center',
        zIndex:2,
        padding:10,
    },
    vw1:{
        paddingLeft:'10%',
        width:'100%',
    },
    vw2:{
        alignItems: 'center',
        width:'100%',
        flex:7,
    },
    txtTitle:{
        marginTop:'30%',
        fontSize:40,
        color:'#fff',
        fontWeight:'bold',
    },
    btnInfo:{
        width:'95%',
        height:80,
        borderRadius:20,
        margin: 10,
        backgroundColor:'#fff',
        elevation:2,
        flexDirection:'row',
    }
  });

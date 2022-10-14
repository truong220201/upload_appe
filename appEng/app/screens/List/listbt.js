import React, { useState } from 'react';
import { Dimensions,Animated,TouchableOpacity,TouchableHighlight,ScrollView, Text, View,Button,StyleSheet,Image,ImageBackground,ActivityIndicator,Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from 'react-native-elements';
import { firebaseApp } from '../../../components/firebaseConfig';
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore"; 
import HTMLView from 'react-native-htmlview';
import { CheckBox} from 'react-native-elements';

import * as Animatable from 'react-native-animatable';

//css 
import { styles } from '../Css/CssList/CssListbt';

export default class listbt extends React.Component{ 
    constructor(props) {
        super(props);
        const { route,navigation } = this.props;
        this.nvt = navigation;
        const {listt,uid,email} = route.params;
        this.uid=uid;
        this.email=email;
        //console.log("tesst id list",listt)
        //this.itemRef = getDatabase(firebaseApp);
        //console.log(this.itemRef);
        this.thing = listt;
        //
        //
        console.log("things id list",this.thing)
        this.state = {
            savet:[],
            keys:[],
            item:[],
            nameqs:[],
            leng:0,
            borderColorC:[],
            isLoading:true,
            check:[],
            chontca:true,
            //kiem tra xem co du lieu khong
            kiemtradulieu:0
            };
      }
      async listenForItems(itemRef){
        const db = getFirestore(firebaseApp);
        //console.log(db);
        //const docRef = doc(db, "Quiz", "03ZnOo7bgWhJvJU9Th9G");
        //const docSnap = await getDoc(docRef);
        const querySnapshot = await getDocs(collection(db, "Category_mo_ta_chi_tiet"));
        querySnapshot.forEach((doc) => {
          //console.log(`${doc.id} => ${doc.data()}`);
          //console.log(`${doc.data().Title}`);
          //console.log(`length: ${doc.data().Id_category_dvkt}`);
          [...Array(7)].map((o,n) => {
          if(this.thing[n]==`${doc.data().Id_category_dvkt}`){
            this.setState({
                //item:this.state.item.push(data)
                //item:Object.keys(`${doc.data().Title}`)
                keys:[...this.state.keys,`${doc.id}`],
                item:[...this.state.item,`${doc.data().Name.slice(3).split('_').join('')}`],
                //nameqs:[...this.state.item,`${doc.data().name_Question}`],
                savet:[...this.state.savet,`${doc.id}`],
                check:[...this.state.check,true],
                leng:`${doc.id.length}`,
                borderColorC:[...this.state.borderColorC,"#ffffff00"],
                isLoading:false,
                kiemtradulieu:1,
              })
        }})
        }
        );
        
        if(this.state.kiemtradulieu==0){
            console.log('ok')
            Alert.alert(
                "Thông báo",
                "Chưa có dữ liệu",
                [
                    {
                        text: "về trang chủ",
                        onPress: () => this.nvt.navigate('home',{uid:this.uid,email:this.email}),
                        style: "cancel",
                    },
                
                ],
            );
        }
        //console.log('item:'+this.state.item);
        //console.log('length:'+this.state.leng);
    }
    nopbai(n,a){
        var arr = [...this.state.check];
        arr[a] = !this.state.check[a];
        let dem=0;
        this.setState({check:arr})
        console.log("Running, a = ",a);
        if(this.state.savet[a]==0){
            this.state.savet[a]=n;
        }
        else{
            this.state.chontca=false
            this.state.savet[a]=0;
        }
        //chon tat ca = true neu tat ca duoc tich
        [...Array(this.state.item.length)].map((o,n) => {
            if(this.state.savet[n]==0){
                dem++;
            }
        })
        //
        if(dem==0){
            this.state.chontca=true
        }
        console.log('savet: ',this.state.savet);
        //console.log('check: ',this.state.check);
        //console.log('color: ',this.state.borderColorC);
    };
    chontc(cd){
        var arr = [...this.state.check];
        if(this.state.chontca == false){
            [...Array(cd)].map((o,n) => {
                arr[n] = true;
                this.state.savet[n]=this.state.keys[n];
                
            })
        }else{
            [...Array(cd)].map((o,n) => {
                arr[n] = false;
                this.state.savet[n]=0;
                
            })
        }
        this.setState({check:arr})
        this.state.chontca = !this.state.chontca;
        console.log('savet: ',this.state.savet);
    }
    btntieptuc(svet,cd){
        console.log('svet:',svet)
        let dem = 0;
        [...Array(cd)].map((o,n) => {
            if(this.state.check[n] !== false){
                dem++;
            }
        })
        if(dem==0){
            Alert.alert(
                "Nhắc nhở",
                "Bạn chưa chọn mục nào.",
                [
                    {
                        text: "Được",
                        onPress: () => null,
                        style: "cancel",
                    },
                
                ],
            );
        }else{
            this.nvt.navigate('menuScreen',{id:this.state.savet,ten:this.state.item,uid:this.uid,email:this.email,})
        }
        
    }
  render(){
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const { navigation } = this.props;
    var l = this.state.leng;
    const colorsB = this.state.borderColorC;
    //console.log(this.state.keys);
    const chieudai = this.state.item.length;
    //console.log('chieu dai : ',chieudai);
    const fadeIn = {
        from: {
          opacity: 0,
          left:300,
        },
        to: { 
          opacity: 1,
          left:0
        },
    }; 
    const fadeInLast = {
        from: {
          opacity: 0,
          
          left:700,
        },
        to: { 
          opacity: 1,
          left:0
        },
    }; 
    return (
        <ImageBackground style={styles.container} source={{uri:'https://media.istockphoto.com/photos/open-book-hardback-books-on-wooden-table-education-background-back-picture-id591810668?k=20&m=591810668&s=612x612&w=0&h=XAE8mlyqycD2LLcptfWlaj-rXhl4JuZvohRBCI2fniU='}}>
    <LinearGradient colors={[ '#aef6d68a' , '#aef6d68a' , '#aef6d68a' , '#fff']} style={styles.inContainer}>
        <View style = {styles.vw1}>
        </View>
        {this.state.isLoading ? <ActivityIndicator style={styles.vw2} size="large" color="#00ff00" />:(
        <View style={styles.vw2}>
            <ScrollView  showsVerticalScrollIndicator={false}>
                <View style={{height:80,}}></View>
                
                <View style={{width:windowWidth-20}} >
                {
                    //Số hàng ngang
                    [...Array(chieudai)].map((o,n) => {
                        return(
                            /*
                            <View key={n} style={{height:windowHeight/4,padding:20,flexDirection:'row'}}>
                                {
                                    //Số phần tử nằm trong hàng ngang đó 
                                    [...Array(2)].map((o,n) => {
                                        //Lấy id sau khi click
                                        return(
                                            <TouchableOpacity key={n} onPress={()=>navigation.navigate('menuScreen',{loaiId: 1})} style={{flex:1,alignItems:'center'}}>
                                                <Image
                                                    style={styles.circle}
                                                    source={{uri:'https://www.clipartmax.com/png/middle/171-1715839_purchase-book-icon-book-icon-green-png.png'}}
                                                />
                                                <View style={styles.vTxtLoai}>
                                                    <Text style={styles.txtLoai}>Phát âm</Text>
                                                </View>
                                            </TouchableOpacity>
                                        )
                                    }
                                    )
                                }
                            </View>
                            */
                            <Animatable.Text animation={fadeIn} style={{width: windowWidth,}} key={n} >
                            <View key={n} style={{width:windowWidth}}>

                                  <CheckBox
                                        title={<View style={{flexDirection:'row'}}><View style={{width:10}}></View><HTMLView value={this.state.item[n]}/></View>}
                                        checked={this.state.check[n]}
                                        onPress={() => this.nopbai(this.state.keys[n],n)}
                                        size={30}
                                        containerStyle={{borderRadius:10,backgroundColor:'#fff',elevation:4,borderWidth:0}}
                                        checkedColor='#009f00'
                                        uncheckedColor='#009f00'
                                    />      
                                                                                                             
                            </View>
                            </Animatable.Text>
                        )
                    }
                    )
                }
                
                </View>
                
                <View style={{width:windowWidth-20}}>
                    <Animatable.Text animation={fadeInLast} style={{width: windowWidth,}}>
                        <View style={{width:windowWidth}}>
                            <CheckBox
                                title='Chọn tất cả'
                                checked={this.state.chontca}
                                onPress={() => this.chontc(chieudai)}
                                size={30}
                                containerStyle={{borderRadius:10,backgroundColor:'#fff',borderWidth:0,borderColor:'#ffffff00',elevation:4,}}
                                checkedColor='#009f00'
                                uncheckedColor='#009f00'
                            />      
                        </View>      
                    </Animatable.Text>
                </View>
                </ScrollView >
                <View style={{position:'absolute',top:'80%',left:'5%'}}>
                
            </View>
                <LinearGradient  start={{x: 0, y: 0.75}} end={{x: 1, y: 0.25}} colors={[ '#6bdb91' , '#6bdb91' , '#6bdb91' , '#b9f5dc']}  style={{borderWidth:0,
                                                                                                                    height:50,
                                                                                                                    width:'95%',
                                                                                                                    alignSelf:'center',
                                                                                                                    borderColor:'#1CC625',
                                                                                                                    borderRadius:10,
                                                                                                                    marginBottom:'6%',
                                                                                                                    elevation:1,}} >
                <TouchableOpacity onPress={()=>this.btntieptuc(this.state.savet,this.uid)} style={{alignItems:'center',}}>
                    <View style={{height:'100%',justifyContent:'center'}}>
                        <Text style={{fontSize:20,color:'#fff'}}>Tiếp tục</Text>
                    </View>
                </TouchableOpacity>      
                </LinearGradient>
                  
        </View>
        )}
       
    </LinearGradient>
    </ImageBackground>
)

}
componentDidMount(){
    this.listenForItems(this.itemRef);
}
};

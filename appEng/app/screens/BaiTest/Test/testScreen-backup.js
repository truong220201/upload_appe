import React, { useState } from 'react';
import { Dimensions,TouchableOpacity,ScrollView, Text, View,Button,StyleSheet,Alert,BackHandler,ActivityIndicator,SafeAreaView} from 'react-native';
import { Icon } from 'react-native-elements';
import { firebaseApp } from '../../../../components/firebaseConfig';
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore"; 
import CountDown from 'react-native-countdown-component';
import RenderHtml from 'react-native-render-html';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RadioButtons,SegmentedControls } from 'react-native-radio-buttons';
import { LinearGradient } from 'expo-linear-gradient';
import { doc, setDoc } from "firebase/firestore"; 
import HTMLView from 'react-native-htmlview';


const Stack = createNativeStackNavigator();

export default class testScreen extends React.Component{ 
    
    constructor(props) {
        super(props);
        //this.itemRef = getDatabase(firebaseApp);
        //console.log(this.itemRef);
        const { route,navigation } = this.props;
        this.nvt = navigation;
        const { baitap,n,ten,uid,email,itemK,nameqs,item,opt0,opt1,opt2,opt3,trueAns,socau} = route.params;
        //console.log('baitap:',opt0);
        console.log('uid form test:',uid)

        //doi mau
        this.tagsStyles = {
            span: {
              color:'black',
              fontSize:18,
            },
          };
          this.tagsStylesB = {
            span: {
              color:'black',
              fontSize:17,
            },
          };
          this.tagsStylesC = {
            span: {
                color:'#fff',
                fontSize:17,
              },
          }
        //
        //khai bao cac bien
        this.uid=uid;
        this.email=email;
        this.i = baitap;
        this.detai= ten;
        this.num = n;
        this.diems = 0;
        //

        //state
        this.state = {
            socau:socau,
            isLoading:true,
            hideBack:'flex',
            hideNext:'flex',
            timer:500,
            keys:[],
            //id question
            item:item,
            //
            itemQ:1,
            opt0:opt0,
            opt1:opt1,
            opt2:opt2,
            opt3:opt3,
            itemK:itemK,
            nameqs:nameqs,
            leng:0,
            trueAns:trueAns,
            //test
            q:'',
            a1:'',
            a2:'',
            a3:'',
            a4:'',
            //
            selectedOption:'',
            optList:[],
            o:['','','',''],
            ans:'',
            answ:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        };
        
        this.opt = this.state.options;
      }
     
      //Thay doi bai tap
      check(inum){
        console.log('bai : ',inum)
        console.log('length: ',this.state.item.length)
        //console.log('inum: ',inum)
        if(this.state.item.length>=inum){
            //console.log('itemK: ',this.state.itemK[inum-1]);
            //console.log('item: ',this.state.item);
            this.listenForItems(inum);
        }else{
            Alert.alert(
                "Thông báo",
                "Phần này chưa có đủ bài tập...",
                [
                    {
                        text: "Ok",
                        onPress: () => null,
                        style: "cancel",
                    }
                ],
            );
        }
        
    };

    //reset sau moi lan lap
    reset(){    
        this.setState ({
            o:[],
            q:'',
            ans:'',
            });
            //loại bỏ số 1 sau mảng item sau mỗi lần lặp
            const valueToRemove = 1;
            const new_arr = this.state.itemK.filter(item => item !== valueToRemove);
            this.setState({
                itemK:new_arr,
            })     
    };

    //dat va lay du lieu user
    async setUser(email,diem,uid){
        const db = getFirestore(firebaseApp);
        console.log('uiddddddd:',uid)
        await setDoc(doc(db, "User",uid), {
            Email: email,
            Diem:diem,
            Uid: uid,
        });
    }


    async getUser(uid){
        const db = getFirestore(firebaseApp);
        const querySnapshotUser = await getDocs(collection(db, "User"));

        querySnapshotUser.forEach((doc) => {
            //console.log(`name qs : ${doc.data().Id_cate_mtct}`);

            console.log('uida:',uid)
            console.log('user: ',`${doc.data().Uid}`);
            if(`${doc.data().Uid}`==uid){
                if(`${doc.data().Uid}`==0){
                    this.diems=0;
                    this.setUser(this.email,this.diems,uid)
                }else{
                    this.diems=this.diems+parseInt(`${doc.data().Diem}`);
                    this.setUser(this.email,this.diems,uid)
                }
            }else{
                this.setUser(this.email,this.diems,uid)
            }
        })
    }

    
    

    //so sanh va set du lieu cho cau hoi duoc chi dinh
    listenForItems(inum){
        if(this.state.item.length>=inum){
        [...Array(this.state.item.length)].map((o,n) => {
            if(this.state.item[n]==this.state.itemK[inum-1]){
                //console.log('ok ',this.state.opt1[n]);
                this.setState({
                    //item:this.state.item.push(data)
                    //item:Object.keys(`${doc.data().Title}`)
                    //re-render khi su dung shouldComponentUpdate
                    itemK:[...this.state.itemK,1],
                    //
                    itemQ:inum,
                    q:this.state.nameqs[inum-1],
                    o:[this.state.opt0[n],this.state.opt1[n],this.state.opt2[n],this.state.opt3[n]],
                    ans:this.state.trueAns[n],
                    //answ:[...this.state.answ[inum-1]=this.state.trueAns[inum-1]],
                    //opt0:[...this.state.opt0,`${doc.data().Option_ans[0]}`],
                    isLoading:false,
                })
                //console.log('helloc');
            }
        })
        console.log('itemK :'+this.state.itemK);
        //console.log('length:'+this.state.leng);
        }else{
            Alert.alert(
                "Thông báo",
                "Phần này chưa có đủ bài tập...",
                [
                    {
                        text: "Ok",
                        onPress: () => this.goto(this.state.itemQ),
                        style: "cancel",
                    }
                ],
            );
        }
    }


























    //dap an duoc chon
    setSelectedOption(selectedOption){
        this.setState({
            optList:[...this.state.optList,selectedOption],
            //answ:[...this.state.answ[this.state.itemQ-1]=this.state.trueAns[this.state.itemQ-1]],
            
            selectedOption,
        });
        this.state.answ[this.state.itemQ-1] = selectedOption;
        console.log(this.state.answ);
    }
    

    renderContainer(optionNodes){
        return <View>{optionNodes}</View>;
    }
        




















    //xu ly su kien cho nhung button chuyen bai tap
    goto(g){
        //this.check(g);
        this.reset();
        this.listenForItems(g);
        
    };
    goNext(g){
        
        if(g>10){
            this.reset();
            this.listenForItems(1);
            
            
        }else{
            this.reset();
            this.listenForItems(g);
        }
    };
    goBack(g){
        
        if(g<1){
            this.reset();
            this.listenForItems(10)
            
        }else{
            this.reset();
            this.listenForItems(g);
            

        }
    };

    //su kien cho nut back, exit
    qsExit = () =>
        Alert.alert(
            "Nhắc nhở",
            "Bạn muốn hủy bài kiểm tra?",
            [
                {
                    text: "Không",
                    onPress: () => null,
                    style: "cancel",
                },
                {
                    text: "Có",
                    onPress: ()=>{this.nvt.navigate('huongdan',{id:this.i,ten:this.detai})},
                    style: "cancel",
                },
            ],
            {
            cancelable: true,
            onDismiss: () =>
                Alert.alert(
                "This alert was dismissed by tapping outside of the alert dialog."
                ),
            }
        );
    backAction = () => {
        //Khong ho tro tieng Viet
        Alert.alert("Hold on!", "Are you sure you want to go back?", [
            {
            text: "Cancel",
            onPress: () => null,
            style: "cancel"
            },
            { text: "YES", onPress: ()=>{this.nvt.navigate('huongdan',{id:this.i,ten:this.detai})} }
        ]);
        return true;
    };











    //tinh diem sau khi nop bai
    dvt(){
        for(var n=0;n<this.state.item.length;n++){
            for(var m=0;m<this.state.item.length;m++){
                if(this.state.answ[n]==this.state.trueAns[m]){
                    this.diems++;
                }else{
                    //console.log('hihi')
                }
            }
        }
                
    }


    //luu diem len firestore
    luudiem(){
        this.getUser()
        console.log(this.uid)
    }



    //su kien nut nop bai
    nopbai(){
        Alert.alert(
            "Nhắc nhở",
            "Bạn muốn nộp bài?",
            [
                {
                    text: "Không",
                    onPress: () => null,
                    style: "cancel",
                },
                {
                    text: "Có",
                    onPress: ()=>{
                        this.getUser(this.uid);
                            console.log("nop bai");
                            this.dvt();
                            //console.log('diem: ',this.diems);
                            //console.log("da lam: ",this.state.answ);
                            this.nvt.navigate('kq',{diem:this.diems,item:this.state.item,itemK:this.state.itemK,ds:this.state.o,bailam:this.state.answ,cauhoi:this.state.nameqs,d0:this.state.opt0,d1:this.state.opt1,d2:this.state.opt2,d3:this.state.opt3,dapan:this.state.trueAns,socau:this.state.socau,uid:this.uid,email:this.email});
                    },
                    style: "cancel",
                },
            ],
            {
            cancelable: true,
            onDismiss: () =>
                Alert.alert(
                "This alert was dismissed by tapping outside of the alert dialog."
                ),
            }
        );
        console.log(this.uid)
        
    };









    //-----------




    //life cycle
    componentDidMount(){
        this.listenForItems(this.num);
        //Timer
        this.interval = setInterval(
            () => this.setState((prevState)=> ({ timer: prevState.timer - 1 })),
            1000
          );
        //BackHandler
        this.backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        this.backAction
        );
    }
    componentDidUpdate(){
        if(this.state.timer === 1){ 
          clearInterval(this.interval);
        }
    }
    //tranh render lai khong can thiet
    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.itemK !== nextState.itemK) {
          return true;
        }
        return false;
    }
    componentWillUnmount(){
        clearInterval(this.interval);

        this.backHandler.remove();
    }
    























    

  render(){
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const { route,navigation } = this.props;
    const { baitap,name} = route.params;
    const i = baitap;
    var l = this.state.itemQ;
    console.log('answ: ',this.state.answ[this.state.itemQ])
    const question = {html: this.state.q};
    const questiona = this.state.q
    //console.log(this.tagsStyles);
    //console.log(this.state.o);
    console.log('render');
    //console.log('o:',this.state.o);
    //console.log('o:',this.state.o)


    if(l==1){
        this.state.hideBack='none';
    }else if(l==10){
        this.state.hideNext='none';
    }else{
        this.state.hideNext='flex';
        this.state.hideBack='flex';
    }
    return (
        
        
    <SafeAreaView style={styles.container}>
        <View style={styles.vw1}>

            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',margin:10,}}>
                <TouchableOpacity style={{marginLeft:10,flex:1,justifyContent:'flex-start',flexDirection:'row'}} onPress={()=>this.qsExit()}>
                    <Icon name = {'arrow-back-ios'} size={20} color={'black'} style={{margin:5,}} />
                </TouchableOpacity>
                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',flex:1,}}>
                    <CountDown
                        size={17}
                        until={15*60} 
                        onFinish={()=>this.nopbai()}
                        digitStyle={{backgroundColor: '#FFF',}}
                        digitTxtStyle={{color: '#53ad71'}}
                        timeLabelStyle={{color: 'red',fontWeight:'300'}}
                        separatorStyle={{color: '#53ad71'}}
                        timeToShow={['M', 'S']}
                        timeLabels={{m: null, s: null}}
                        showSeparator
                        />  
                    <Icon name = {'alarm'} size={20} color={'#1CC625'} style={{margin:5,}} />
                </View>
                <View style={{flex:1,justifyContent:'flex-end',flexDirection:'row',paddingRight:5,}}>
                    <TouchableOpacity onPress={()=>this.nopbai()} style={styles.btnNopbai}>
                        <Text style={{color:'#fff',fontSize:15,}}>Nộp bài</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView  horizontal={true} showsHorizontalScrollIndicator={false} >
                {
                            
                    [...Array(this.state.socau)].map((o,n) => {
                        
                        if(n+1==l){
                            return(
                                <TouchableOpacity key={this.baitap} onPress={()=>null} style={styles.btnCList}>
                                    <Text style={{color:'#fff',fontSize:15,}}>{n+1}</Text>
                                </TouchableOpacity>
                            )
                        }else{
                            if(this.state.answ[n] !=0){
                                return(
                                    <TouchableOpacity key={this.baitap} onPress={()=>this.goto(n+1)} style={styles.btnDList}>
                                        <Text style={{color:'#fff',fontSize:15,}}>{n+1}</Text>
                                    </TouchableOpacity>
                                )
                            }else{
                                return(
                                    <TouchableOpacity key={this.baitap} onPress={()=>this.goto(n+1)} style={styles.btnList}>
                                        <Text style={{color:'#b9b9b9',fontSize:15,}}>{n+1}</Text>
                                    </TouchableOpacity>
                                )
                            }
                        }
                    }
                    )
                }
            </ScrollView>
        </View>
        <View style={{flex:5,}}>
        {this.state.isLoading ? <ActivityIndicator style={styles.vw2} size="large" color="#00ff00" />:(
        <ScrollView style={{width:windowWidth,}} showsScrollIndicator={false}>
            <View style={styles.vw2}>   
                <Text style={styles.txtLevel}>Câu {this.state.itemQ}</Text>
                
                    <HTMLView
                    stylesheet={this.tagsStyles}
                    value={questiona}
                />

            </View>
           
            <View style={{marginLeft: 20,marginRight:20,}}>
            <RadioButtons
                options={ this.state.o }
                onSelection={ this.setSelectedOption.bind(this) }
                selectedOption={this.state.selectedOption }
                renderOption={ 
                    (option, selected, onSelect, index)=>{
                        /*const s = selected ? { borderWidth:2,
                                                borderColor:'#1CC625',
                                                borderRadius:7,
                                                padding:15,
                                                flexDirection:'row',
                                                marginBottom:'6%',} : { borderWidth:2,
                                                    borderColor:'#f0f0f0',
                                                    borderRadius:7,
                                                    padding:15,
                                                    flexDirection:'row',
                                                    marginBottom:'6%',};
                                                    */
                        const windowWidth = Dimensions.get('window').width;
                        //console.log("num: ",this.state.itemQ);
                        //console.log("num: ",this.state.answ[this.state.itemQ-1]);
                        if(option==this.state.answ[this.state.itemQ-1]){
                            return (
                                <LinearGradient key={index} start={{x: 0, y: 0.75}} end={{x: 1, y: 0.25}} colors={[ '#6bdb91' , '#6bdb91' , '#6bdb91' , '#b9f5dc']}  style={{borderWidth:0,
                                                                                                                    borderColor:'#1CC625',
                                                                                                                    borderRadius:10,
                                                                                                                    padding:15,
                                                                                                                    marginBottom:'6%',
                                                                                                                    elevation:1,}} >
                                    <TouchableOpacity onPress={onSelect} style={{flexDirection:'row',}} >
                                        <Text style={styles.abcd}></Text>
                                        <View style={{top:5,}}>
                                            
                                            <HTMLView
                                            stylesheet={this.tagsStylesC}
                                            value={option}
                                        />
                                        </View>
                                    </TouchableOpacity>
                                </LinearGradient>
                            );
                        }else{
                            return (
                                <TouchableOpacity onPress={onSelect} key={index} style={{//borderWidth:1,
                                                                                        //borderColor:'#b9b9b9',
                                                                                        elevation:5,
                                                                                        backgroundColor:'white',
                                                                                        borderRadius:10,
                                                                                        padding:15,
                                                                                        flexDirection:'row',
                                                                                        marginBottom:'6%',}}>
                                    <Text style={styles.abcd}></Text>
                                    <View style={{top:5,}}>
                                        
                                        <HTMLView
                                        stylesheet={this.tagsStylesB}
                                            value={option}
                                        />
                                    </View>
                                </TouchableOpacity>
                            );
                        }
                        
                        }
                 }
                index={9}
                renderContainer={ this.renderContainer }
            />
            


            </View>
            
        </ScrollView>
        )}
        <View style={styles.vw4}>
                <TouchableOpacity  onPress={()=>this.goBack(this.state.itemQ-1)} style={{display:this.state.hideBack,
                                                                                        flexDirection:'row',
                                                                                        height:'58%',
                                                                                        alignItems:'center',
                                                                                        justifyContent:'center',
                                                                                        flex:1,
                                                                                        justifyContent:'flex-start',}}>
                    <View style={styles.btnNext}>
                        <Icon name = {'arrow-back-ios'} size={20} color={'#53ad71'} style={{margin:5,}} />
                    </View>
                    <Text style={styles.txtNext}>Câu trước đó</Text>
                </TouchableOpacity>
                <TouchableOpacity  onPress={()=>this.goNext(this.state.itemQ+1)} style={{display:this.state.hideNext,
                                                                                        flexDirection:'row',
                                                                                        height:'58%',
                                                                                        alignItems:'center',
                                                                                        justifyContent:'center',
                                                                                        flex:1,
                                                                                        justifyContent:'flex-end',
                                                                                    }}>
                    <Text style={styles.txtNext}>Câu kế tiếp</Text>
                    <View style={styles.btnNext}>
                        <Icon name = {'arrow-forward-ios'} size={20} color={'#53ad71'} style={{margin:5,}} />
                    </View>
                </TouchableOpacity>
                
            </View>
        </View>
        
    </SafeAreaView>
)
}


};


const html = StyleSheet.create({
    span:{
    }
})
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent:'center',
      zIndex:1,
    },
    txtTitle:{
        top:40,
        margin:10,
        fontSize:24,
    },
    vw1:{
        alignItems:'center',
        width:'100%',
        height:20,
        borderBottomWidth:1,
        borderBottomColor:'#b5b5b5',
        marginTop:20,
        flex:1,
    },
    vw1a:{
    },
    
    vw2:{
        width:'100%',
        flex:2,
        padding:20,
        justifyContent:'center',
    },
    vw3:{
        width:'100%',
        flex:10,
        padding:10,
    },
    vw4:{
        width:'100%',
        flex:2,
        flexDirection:'row',
        alignItems:'center',
        padding:5,

    },
    contentView:{
        borderWidth:2,
        borderColor:'#f0f0f0',
        borderRadius:7,
        padding:15,
        flexDirection:'row',
        marginBottom:'6%',
    },
    
    txtLevel:{
        color:'#858585',
        fontSize:20,
        //marginBottom:'2%',
        flexDirection:'row',
    },
    txtQuestion:{
        
    },
    abcd:{
        color:'#1CC625',
        fontSize:20,
        marginRight:8,
    },
    txtAnswer:{
        marginLeft:5,
        color:'#575757',
        fontSize:20,
    },
    viewBtnNext:{
        flexDirection:'row',
        height:'58%',
        alignItems:'center',
        justifyContent:'center',
        flex:1,
        justifyContent:'flex-end',
    },
    viewBtnPrev:{
        flexDirection:'row',
        height:'58%',
        alignItems:'center',
        justifyContent:'center',
        flex:1,
        justifyContent:'flex-start',
        
    },
    txtNext:{
        color:'#b5b5b5',
        fontSize:18,
    },
    btnCList:{
        borderWidth:0,
        margin:5,
        height:50,
        width: 50,
        borderRadius:30,
        //borderColor:'#1CC625',
        backgroundColor:'#63cc7b',
        alignItems:'center',
        justifyContent:'center',
    },
    btnDList:{
        borderWidth:0,
        margin:5,
        height:50,
        width: 50,
        borderRadius:30,
        //borderColor:'#1CC625',
        backgroundColor:'#79c98b8f',
        alignItems:'center',
        justifyContent:'center',
    },
    btnList:{
        borderWidth:1,
        margin:5,
        height:50,
        width: 50,
        borderRadius:30,
        borderColor:'#b9b9b9',
        alignItems:'center',
        justifyContent:'center',
    },
    btnNext:{
        borderWidth:2,
        margin:5,
        height:50,
        width: 50,
        borderRadius:30,
        borderColor:'#1CC625',
        alignItems:'center',
        justifyContent:'center',
    },
    btnPrev:{
        borderWidth:2,
        margin:5,
        height:50,
        width: 50,
        borderRadius:30,
        borderColor:'#1CC625',
        alignItems:'center',
        justifyContent:'center',
    },
    btnNopbai:{
        backgroundColor:'#fff',
        borderRadius:5,
        width: 100,
        height:35,
        alignItems:'center',
        justifyContent:'center',
        elevation:2,
        //borderWidth:1,
        backgroundColor:'#63cc7b'
      },
    
  });

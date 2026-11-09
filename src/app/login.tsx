import { Text, View, StyleSheet, TextInput,Button } from "react-native";
import { useEffect,useState,useRef } from "react";
import { Animated } from "react-native";
import { useWindowDimensions } from "react-native";
import { useRouter,useLocalSearchParams } from "expo-router";
import * as SecureStore from "expo-secure-store"
// import otpVerify from "./otpVerify.js";

import axios from "axios"
import {pendingSign,otpSign,loginUrl,forgetPassword,passwordupdate} from "../../api.js"
export default function Index() {
  const router=useRouter()
    let [login,setLogin]=useState(true)
    let [name,setName]=useState<string>("")
    let [email,setEmail]=useState<string>("")
    let [password,setPassword]=useState<string>("")
    let [load,setLoad]=useState<boolean>(false)
    let [isErr,setIsErr]=useState<boolean>(false)
    let [errMsg,setErrMsg]=useState<string>("")
    let {width,height}=useWindowDimensions()
    
    const translateY=useRef(new Animated.Value(50)).current

    const {msg}=useLocalSearchParams<{msg:string}>("");
    useEffect(()=>{
  if(msg=="success-sign"){
  setLogin(true)
 }
    },[msg])
   

  useEffect(()=>{

    translateY.setValue(50)
    Animated.timing(translateY,{
      toValue:0,duration:500,useNativeDriver:true
    }).start()
  },[login])

  let logCon={
    width:width*.8,
    height:height*.5,
   
  }
  let active={
    color:"white",
    transform:[{scale:1.5}],
    fontWeight:"bold"
  
  }
  let nml={
    color:"whitesmoke",
    transform:[{scale:1}]
  }

  let signF=async()=>{
    
    setLoad(true)
    // let info=await axios(pendingSign)
    if(!name||!email||!password){

      setLoad(false)
      setIsErr(true)
      setErrMsg("please enter name,email,password")
      return
    }
    try{
    
      let data={name,email,password}
      
    let info=await axios.post(`${pendingSign}`,data)
 if(info.status==200){
  setLoad(false)
  setErrMsg("")
router.push({pathname:'/otpVerify',params:{email:email,purpose:"sign"}}) } 

    }catch(err:any){
      setIsErr(true)
      setLoad(false)
      setErrMsg(err.response.data.message)
    }
    
  }
  let loginF=async()=>{
     setLoad(true)
    if(!email||!password){

      setLoad(false)
       setIsErr(true)
      setErrMsg("please enter email,password")
      return
    }
    try{
      let data={email,password}
      let info=await axios.post(loginUrl,data)
if(info.status==200){
  setLoad(false)
  // console.log(info.data)
  await SecureStore.setItemAsync("token",info.data.token)
  router.push('/dashboard')
}
    }catch(err:any){
      setIsErr(true)
      setErrMsg(err.response.data.message)
    }
  }
let forgetF=async()=>{
   setLoad(true)
if(!email){

   setLoad(false)
    setIsErr(true)
      setErrMsg("please enter email")
      return
    }
   
    try{
       let data:{email:string}={email:email}
       let info=await axios.post(`${forgetPassword}`,data)
       
 if(info.status==200){
  setLoad(false)
  setErrMsg("")
  console.log(info)
router.push({pathname:'/otpVerify',params:{email:email,purpose:"update"}}) } 

    }catch(err:any){
      setIsErr(true)
      setErrMsg(err.response.data.message)
    }
}
  return (
    <View style={styles.container}>
      <View style={{position:"absolute",flexDirection:"row",top:100,columnGap:20,alignSelf:"center"}}>
        <Text style={login?active:nml} onPress={()=>setLogin(true)}>Login</Text>
      <Text style={login?nml:active} onPress={()=>setLogin(false)}>Sign</Text></View>
      <Animated.View style={{transform:[{translateY}]}}>
      <View style={[styles.logCon,logCon]}>
        
         {login?(<View style={{flex:3,justifyContent:"center",rowGap:20}}><View><Text style={{color:"navy"}}>Email</Text><TextInput placeholder="Enter Email" value={email} onChangeText={(value:string)=>setEmail(value)} style={{borderBottomWidth:2,borderBottomColor:"navy"}}/></View>
        <View><Text style={{color:"navy"}}>Password</Text><TextInput placeholder="Enter User Password" style={{borderBottomWidth:2,borderBottomColor:"navy"}} value={password} onChangeText={(value:string)=>setPassword(value)}/></View>
  </View>):(<View style={{flex:3,justifyContent:"space-around"}}><View><Text style={{color:"navy"}}>Name</Text><TextInput placeholder="Enter User Name" style={{borderBottomWidth:2,borderBottomColor:"navy"}} value={name} onChangeText={(value:string)=>setName(value)}/></View>
        <View><Text style={{color:"navy"}}>Email</Text><TextInput placeholder="Enter Email" style={{borderBottomWidth:2,borderBottomColor:"navy"}} value={email} onChangeText={(value:string)=>setEmail(value)}/></View>
        <View><Text style={{color:"navy"}}>Password</Text><TextInput placeholder="Enter User Password" style={{borderBottomWidth:2,borderBottomColor:"navy"}} value={password} onChangeText={(value:string)=>setPassword(value)}/></View>
        </View>)}
        

        
        <View style={{flex:1,justifyContent:"center"}}>
            {login?(<><View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}><Text style={{color:"skyblue"}} onPress={forgetF}>{`${!load||!isErr?"Forget Password":""}`}</Text>
            <Button title="LOGIN" onPress={loginF} disabled={load||isErr}/>
            </View></>):(<>
            <View style={{flexDirection:"row",justifyContent:"space-between"}}><Text style={{color:"skyblue"}}></Text><Button title="SIGN" onPress={signF} disabled={load||isErr}/></View></>)}
        </View>
      </View>
      </Animated.View>
      {isErr&&<View style={[styles.msg]}>
        <Text>{errMsg}</Text>
        <Button title="ok" onPress={()=>{setIsErr(false)}}/>
        </View>}
         {/* <Button title="check" onPress={()=>{router.push({pathname:'/otpVerify',params:{email:"a@gmail.com",purpose:"sign"}}) } 
}/> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:"navy"
  },
  logCon:{
// borderWidth:1,
borderRadius:"10%",
// borderColor:"red",
backgroundColor:"whitesmoke",
padding:20

  },
  msg:{
position:"absolute",
top:100,
width:"80%",
left:"10%",
padding:20,
justifyContent:"center",
alignItems:"center",
backgroundColor:"white",
borderRadius:10

  }
});

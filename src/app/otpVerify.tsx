import { View,Text, TextInput,Button,StyleSheet } from "react-native"
import {SafeAreaProvider,SafeAreaView} from "react-native-safe-area-context"
import { useLocalSearchParams,useRouter } from "expo-router";
import { useRef,useEffect, useState } from "react";
import {otpSign,passwordupdate} from "../../api.js"
import axios from "axios";

// import { Button } from "expo-router/build/react-navigation";
export default function otpVerify(){
    // const INPREF=useRef<TextInput>(null)
    const router=useRouter()
        let [password,setPassword]=useState<string>("")
      let [isErr,setIsErr]=useState<boolean>(false)
    let [errMsg,setErrMsg]=useState<string>("")
    let [load,setload]=useState<boolean>(false)
const [otp,setOtp]=useState<string>("")
    // INPREF.current?.focus()
const {email,purpose}=useLocalSearchParams<{email:String,purpose:string}>();
const otpSendSign=async()=>{
    setload(true)
    if(!otp){
        setIsErr(true)
        setErrMsg("please enter otp")
        setload(false)
        return
    }if(otp.length!==4){
         setIsErr(true)
        setErrMsg("please enter 4 digit otp")
                setload(false)
return
    }
    try{
let data={email,otp}
    const info=await axios.post(otpSign,data)
    if(info.status==201){

      setIsErr(true)
        setErrMsg("password change successfully")
        setTimeout(()=>{
setIsErr(false)
setload(false)
setErrMsg("")
router.replace({pathname:'/login',params:{msg:"success-sign"}})
        },2000)
    }
    }catch(err:any){
        setIsErr(true)
        setErrMsg(`${err.response.data.message}`)
        setload(false)
    }
    
}
const passwordUpdateOtpSend=async()=>{
    setload(true)
    if(!otp){
        setIsErr(true)
        setErrMsg("please enter otp")
        setload(false)
        return
    }if(otp.length!==4){
         setIsErr(true)
        setErrMsg("please enter 4 digit otp")
                setload(false)
                return

    }
    if(!password){
         setIsErr(true)
        setErrMsg("please enter password")
                setload(false)
                return
    }
    try{
let data={email,otp,password}
    const info=await axios.post(passwordupdate,data)
    if(info.status==200){

      setIsErr(true)
        setErrMsg("password change successfully")
        setTimeout(()=>{
setIsErr(false)
setload(false)
setErrMsg("")
router.replace({pathname:'/login',params:{msg:"success-sign"}})
        },2000)
    }
    }catch(err:any){
        setIsErr(true)
        setErrMsg(`${err.response.data.message}`)
        setload(false)
    }
    
}

    return(<SafeAreaProvider style={{flex:1}}>
        <SafeAreaView style={{flex:1}}>
        <View style={{padding:20,flex:1}}>
{purpose=="sign"?<Text style={{fontSize:20,fontWeight:"bold"}}>OTP Verification for : {email}</Text>:<Text style={{fontSize:20,fontWeight:"bold"}}>Forget Password : {email}</Text>}
            </View>
            <View style={{padding:20,flex:2}}>
            <View style={{rowGap:10}}>
                <Text>Enter Otp</Text>
                <TextInput keyboardType="number-pad" maxLength={4} value={otp} onChangeText={(value:string)=>setOtp(value)} style={{borderBottomColor:"navy",borderBottomWidth:2}}/>
               {purpose=="update"&&<TextInput value={password} placeholder="enter new password" onChangeText={(value:string)=>setPassword(value)} style={{borderBottomColor:"navy",borderBottomWidth:2}}/>}
               {purpose=="sign"?<Button title="send" onPress={otpSendSign}/>:<Button title="update" onPress={passwordUpdateOtpSend}/>} 
            </View>
             {isErr&&<View style={[styles.msg]}>
                    <Text>{errMsg}</Text>
                    <Button title="ok" onPress={()=>{setIsErr(false)}} disabled={load}/>
                    </View>}
        </View>
        </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles=StyleSheet.create({
  msg:{
position:"absolute",
top:100,
width:"90%",
left:"10%",
padding:10,
justifyContent:"center",
alignItems:"center",
backgroundColor:"white",
borderRadius:10

  }
})
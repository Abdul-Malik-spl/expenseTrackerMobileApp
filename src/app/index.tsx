import { Text, View, StyleSheet} from "react-native";
import { useEffect} from "react";
import { Animated } from "react-native";
import { useRouter,useLocalSearchParams } from "expo-router";
import * as SecureStore from "expo-secure-store"
// import {pendingSign,otpSign,loginUrl,forgetPassword,passwordupdate} from "../../api.js"
export default function Index() {
  let router=useRouter()
    useEffect(()=>{
let checkingtoken=async()=>{
    let ifToken=await SecureStore.getItemAsync("token")
    if(ifToken){
router.replace('/dashboard')
return
    }else{
      router.replace('/login')
    }

}
checkingtoken()
    },[])
  return(<View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
<Text>WELCOME TO</Text>
<Text>Malik App</Text>
  </View>)
}
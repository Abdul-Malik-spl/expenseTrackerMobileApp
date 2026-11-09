import {View,Text,StyleSheet} from 'react-native'
import {dashboard} from '../../../api.js'
import { useEffect,useState } from 'react'
import axios from 'axios'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useRouter } from 'expo-router'
import * as SecureStore from "expo-secure-store"

export default function Profile(){
    let router=useRouter()
 let [userData,setUserData]=useState<any>({})

    useEffect(()=>{

async function getData(){
    try{
    let token=await SecureStore.getItemAsync("token")
let user=await axios.get(dashboard,{
    method:"GET",
    headers:{Authorization:`Bearer ${token}`}
})
setUserData(user.data.data)
    }catch(err:any){
console.log(err.response.data.message)
    }
}
getData()
    },[])
    const formatTime=(isoString?:string)=>{
        if(!isoString) return '-'
        const date=new Date(isoString)
        return date.toLocaleString('en-US',{
            month:"short",
            day:"2-digit",
            year:'numeric',
            hour:'2-digit',
            minute:'2-digit',
            hour12:true
        })

    }
    const logout=async()=>{
        await SecureStore.deleteItemAsync("token")
        router.replace('/login')
    }
    return(<View style={styles.pf}>
       <View style={styles.container}>
            <View style={styles.box}><Ionicons name="person-outline" size={32} color="navy"/><Text style={styles.txt}>{(userData?.name)?.toUpperCase()}</Text></View>
            <View style={styles.box}><Ionicons name="mail-outline" size={32} color="navy"/><Text style={[styles.txt,{fontSize:10}]}>{userData?.email}</Text></View>
            <View style={styles.box}><Ionicons name="time-outline" size={32} color="navy"/><Text style={[styles.txt,{fontSize:10}]}>{formatTime(userData?.createdAt)}</Text></View>
            <View style={[styles.box,{borderBottomWidth:0}]}><Ionicons name="exit-outline" size={32} color="navy" onPress={logout}/><Text onPress={logout} style={[styles.txt,{fontSize:10,}]}>LOGOUT</Text></View>
       </View>
    </View>)
}

const styles=StyleSheet.create({
    pf:{
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    },
    container:{
            borderWidth:1,
            borderColor:"navy",
            borderRadius:10,
            width:"90%"
    },
    box:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        gap:10,
        borderBottomWidth:2,
       padding:10,
    },
    txt:{
fontSize:30,
fontWeight:"bold",
color:"navy"
    }
})
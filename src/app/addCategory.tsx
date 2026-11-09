import { Ionicons } from '@expo/vector-icons'
import {View,Text, StyleSheet, TextInput, TouchableOpacity,ScrollView,FlatList, Button} from 'react-native'
import { useRouter } from 'expo-router'
import {SafeAreaProvider,SafeAreaView} from 'react-native-safe-area-context'
import { COLORS } from '@/constants/colors'
import { useState,useEffect } from 'react'
import {categories} from '../../api.js'
import axios from 'axios'
import * as SecureStore from "expo-secure-store"
export default function AddCategory(){
    let [arrcolor,setArrColor]=useState<any>(["maroon","green","pink","navy","orange"])
    let [name,setName]=useState<string>("")
    let [type,setType]=useState<string>("")
    let [color,setColor ]=useState<string>("")
    let [icon,setIcon]=useState<string>("")
    let [err,setErr]=useState<boolean>(false)
    let [errMsg,setErrMsg]=useState<string>("")
    let [load,setLoad]=useState<boolean>(false)
    let router=useRouter()
    const iconNames=["restaurant","fast-food","cart","bag","car","bus","airplane","home","wallet","cash","card","medkit","school","book","fitness","game-controller","gift","paw","phone-portrait","briefcase"] as const
 // name type icon color
  async function addCategory(){
    setLoad(true)
if(name.length==0){
setErr(true)
setErrMsg("Please Enter Name Field")
    return
} if(!type||!icon||!color){
    setErr(true)
setErrMsg("Please Enter Give All Info Type Color Icon")
}
let Name=name.trim().toUpperCase()
let data={name:Name,type,color,icon}
let token=await SecureStore.getItemAsync("token")
try{
let res=await axios.post(categories,data,{headers:{Authorization:`Bearer ${token}`}})

if(res.status==201){
setErr(true)
setErrMsg(res.data.message)
}
}catch(err:any){
    setErr(true)
    setErrMsg(err.response.data.message)

}
finally{
setLoad(false)
}
  }
  function errOkBtn(){
    setErrMsg("")
    setErr(false)
  }
    return(
        <SafeAreaProvider style={{flex:1}}>
            <SafeAreaView style={{flex:1}}>
<View style={{flex:.05,justifyContent:"center",paddingStart:10}}>
    <Text style={{fontWeight:"500"}} onPress={()=>router.back()}>back</Text></View>
         <View style={styles.formView}>
            <View style={styles.formContainer}>
                <View style={styles.rowView}><Text style={styles.rowTxt}>Name</Text>
                <TextInput style={[styles.rowInp,{borderBottomWidth:1}]} value={name} onChangeText={(name)=>setName(name)}/></View>
                <View style={styles.rowView}><Text style={styles.rowTxt}>Type</Text>
                <View style={[styles.insideopt,{marginVertical:10}]}>
                    <TouchableOpacity onPress={()=>setType("income")} style={[{backgroundColor:"rgba(0,250,0,.3)"},styles.incexp,type=="income"?{borderWidth:1,borderColor:"green"}:""]}><Text>Income</Text></TouchableOpacity>
                    <TouchableOpacity onPress={()=>setType("expense")} style={[{backgroundColor:"rgba(250,0,0,.3)"},styles.incexp,type=="expense"?{borderWidth:1,borderColor:"red"}:""]}><Text>Expense</Text></TouchableOpacity>
                    </View></View>
                <View style={[styles.rowView]}><Text style={styles.rowTxt}>Color</Text>
                <View style={styles.colorcon}>
                    {arrcolor.map((a:string,b:number)=>(
                        <TouchableOpacity key={b} style={[styles.colorBox,{backgroundColor:a},color==a&&{borderWidth:2,borderColor:"white",outlineWidth:2,outlineColor:a}]} onPress={()=>setColor(a)}></TouchableOpacity>
                    ))}
                </View>
                </View>
                <View style={styles.rowView}><Text style={styles.rowTxt}>Icon</Text>
                                 <FlatList data={iconNames} numColumns={4} keyExtractor={(item)=>item}
                                 style={{width:"100%",maxHeight:200}}
                    renderItem={({item})=>(
                        <TouchableOpacity style={[{flex:1,alignItems:"center",justifyContent:"center",padding:15},item==icon&&{borderWidth:1,borderColor:color||"black",borderRadius:"50%"}]} onPress={()=>setIcon(item)}>
                            <Ionicons name={item} size={28} color={color||"black"}/>
                        </TouchableOpacity>
                    )}/>
                </View>
                    <View style={{alignItems:"center",justifyContent:"center"}}>
                        <Button title="Add" onPress={addCategory}/>
                    </View>
            </View>
           
         </View>
          {err&&<View style={styles.errbox}>
                <Text>{errMsg}</Text>
                <Button title='ok' onPress={errOkBtn}/>
                    </View>}
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

let styles=StyleSheet.create({
    formView:{
// backgroundColor:COLORS.whitesmoke,
flex:.8,
alignItems:"center",
justifyContent:"center"
    },
    formContainer:{
padding:15,
borderRadius:20,
backgroundColor:COLORS.card,
width:"85%",
// borderWidth:1,
alignItems:"stretch",
justifyContent:"flex-start",
rowGap:10,
boxShadow:"1px 1px 5px navy"
    },rowView:{
// flexDirection:"column",
// backgroundColor:"red",
// alignItems:"center",
// justifyContent:"space-around"
width:"100%",
// rowGap:5,
// backgroundColor:"red"
    },rowTxt:{
        fontWeight:"bold"
    },rowInp:{

        width:"100%",
        // backgroundColor:"rgba(6,0,256,.3)"

    },
    insideopt:{
        flexDirection:"row",
    },
    incexp:{
marginHorizontal:10,
padding:4,
borderRadius:10,
// boxShadow:"medium"
    },
    colorcon:{
flexDirection:"row",
gap:10
    },colorBox:{
        height:10,width:20,paddingHorizontal:20,paddingVertical:10,marginVertical:10
    },
    sv:{
        height:100,
        width:200,
        flexDirection:"column",
        flexWrap:"wrap",
        backgroundColor:"red"
    },
    errbox:{
        position:"fixed",
        top:100,
        width:"90%",
        marginHorizontal:"auto",
        alignItems:"center",
        justifyContent:"center",
        gap:10,
        padding:10
    }
})
import {View,Text,StyleSheet,Button,ScrollView,TouchableOpacity} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import {useRouter} from "expo-router"
import { useState,useEffect } from "react"
import {categories} from "../../../api.js"
import * as SecureStore from "expo-secure-store"
import axios from "axios"
import { COLORS } from "@/constants/colors.js"
export default function Categories(){
    let router=useRouter()
    let [load,setLoad]=useState<boolean>(false)
    let [err,setErr]=useState<boolean>(false)
    let [errmsg,setErrMsg]=useState<string>("")
    // let [getStatus,setGetStatus]=useState<string>("")
    let [showingStatus,setShowingStatus]=useState<string>("all")
    let [categoryList,setCategoryList]=useState<any>([])
useEffect(()=>{

    setLoad(true)

async function getCategories(){
    
    try{
            let token=await SecureStore.getItemAsync("token")
      let config={
             headers:{Authorization:`Bearer ${token}`}
        }
        let res=await axios.get(categories,{...config,params:{status:showingStatus}})
        if(res.status==200){
            setCategoryList(res.data.data)
            setLoad(false)
            setErr(false)
        }
}catch(err:any){
    setLoad(false)
    setErr(true)

    console.log("API ERROR:", err.message)
    console.log("ERROR RESPONSE:", err.response?.data)

    setErrMsg(
        err.response?.data?.message || err.message || "Something went wrong"
    )
}
}
getCategories()
},[showingStatus])
console.log(categoryList)
    return (
        <ScrollView style={{flex:1}}>
            <View style={styles.headerBar}>
            <TouchableOpacity onPress={()=>setShowingStatus("all")} style={[styles.barbtn,{borderStartStartRadius:20},showingStatus=="all"&&{backgroundColor:COLORS.navy}]}><Text style={[showingStatus=="all"&&{color:"white"}]}>All</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=>setShowingStatus("income")} style={[styles.barbtn,showingStatus=="income"&&{backgroundColor:COLORS.navy}]}><Text style={[showingStatus=="income"&&{color:"white"}]}>Income</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=>setShowingStatus("expense")} style={[styles.barbtn,{borderEndStartRadius:20},showingStatus=="expense"&&{backgroundColor:COLORS.navy}]}><Text style={[showingStatus=="expense"&&{color:"white"}]}>Expense</Text></TouchableOpacity>
            </View>
            <View style={{flex:1,height:500,gap:15}}>
                {categoryList.length>0?categoryList?.map((data:any,ind:number)=>(
                    <View key={ind} style={[styles.catview,{borderTopColor:data.color,borderBottomColor:data.color}]}>
                    <View>
                        <Ionicons name={data.icon} size={28} color={data.color}/><Text style={{fontWeight:"bold"}}>{data.name}</Text>
                    </View>
                    <View style={[styles.typeShow,data.type=="income"?{boxShadow:`1px 1px 10px green,-1px -1px 10px green`,backgroundColor:"green"}:
                        {boxShadow:`1px 1px 10px red,-1px -1px 10px red`,backgroundColor:"red"}]}>
                        <Text style={{color:"white"}}>{data.type}</Text>
                    </View>
                    <View style={{flexDirection:"row",gap:15}}>
                        <Ionicons name="create-outline" size={22} color="black"/> <Ionicons name="trash-outline" size={22} color="red"/>
                    </View>
                    </View>
                )):<Text style={{color:COLORS.whitesmoke,textAlign:"center"}}>No categories added please add first</Text>}
            </View>
            <TouchableOpacity style={[styles.addcatbtn]} onPress={()=>router.push("/addCategory")}><Ionicons name="add" size={32} color="white" /></TouchableOpacity>
            {err&&<View style={styles.errBox}><Text>{errmsg}</Text>
            <Button title="ok"/></View>}
        </ScrollView>
    )
}

const styles=StyleSheet.create({
errBox:{
    position:"fixed",
    top:20,
    width:"90%",
    padding:10,
    borderRadius:20,
    alignItems:"center",
    justifyContent:"center"
},
headerBar:{
height:100,
flexDirection:"row",
alignItems:"center",
justifyContent:"center",

},
barbtn:{
paddingHorizontal:15,
paddingVertical:10,
alignItems:"center",
justifyContent:"center",
backgroundColor:COLORS.whitesmoke,

},
addcatbtn:{
    backgroundColor:COLORS.navy,
    padding:10,
    width:50,
    height:50,
    borderRadius:"50%",
    position:"absolute",
    right:10,bottom:10
},catview:{
    height:70,
    width:"90%",
    marginHorizontal:"auto",
    backgroundColor:COLORS.card,
    borderTopWidth:5,
    // borderBottomWidth:1,
    borderRadius:20,
    boxShadow:'1px 1px 2px black',justifyContent:"space-between",
    alignItems:"center",
    paddingHorizontal:10,
    flexDirection:"row"
},typeShow:{
    paddingHorizontal:3,
    paddingVertical:2,
    borderRadius:50,


}
})
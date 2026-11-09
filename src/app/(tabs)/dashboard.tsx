import { View,Text,StyleSheet,ScrollView } from "react-native";
import {SafeAreaProvider,SafeAreaView} from "react-native-safe-area-context"
import { useEffect,useState } from "react";
import { COLORS } from "../../constants/colors";
import axios from "axios";

import {dashboard,overAllSummery,categorySummery,monthlySummery} from '../../../api.js'
import * as SecureStore from "expo-secure-store"
import { Ionicons } from "@expo/vector-icons";
import { Color } from "expo-router";

function getErrorMessage(error:unknown):string{
    if(axios.isAxiosError(error)){
        return error.response?.data?.message||error.message
    }
    return "something went wrong"
}

export default function Dashboard(){
  
     let [load,setLoad]=useState<boolean>(false)
        let [isErr,setIsErr]=useState<boolean>(false)
        let [dashboardData,setDashboardData]=useState<any>({})
        let [overAllData,setOverAllData]=useState<any>({})
        let [categoryData,setCategoryData]=useState<any>({})
        let [monthlyData,setMonthlyData]=useState<any>({})
        let [errMsg,setErrMsg]=useState<{dashboard:string,allSummery:string,categorySummery:string,monthlySummery:string}>({dashboard:"",allSummery:"",categorySummery:"",monthlySummery:""})
        

    useEffect(()=>{

async function getData(){
    try{
    let token=await SecureStore.getItemAsync("token")
    let config={
             headers:{Authorization:`Bearer ${token}`}
        }
// let user=await axios.get(dashboard,{
//     method:"GET",
//     headers:{Authorization:`Bearer ${token}`}
// })
// setUserData(user.data.data)
let year=new Date().getFullYear()
let result=await Promise.allSettled([
    axios.get(dashboard,config),
    axios.get(overAllSummery,config),
    axios.get(categorySummery,config),
    axios.get(monthlySummery,{...config,params:{year}}),

])
// dashboard
const dashboardResult=result[0];
switch(dashboardResult.status){
    case "fulfilled":setDashboardData(dashboardResult.value.data.data)
    break;
    case "rejected":setErrMsg(prev=>({...prev,dashboard:getErrorMessage(dashboardResult.reason)}))
    break;
}
// overlall
const overAllResult=result[1];
switch(overAllResult.status){
    case "fulfilled":setOverAllData(overAllResult.value.data.data)
    break;
    case "rejected":setErrMsg(prev=>({...prev,allSummery:getErrorMessage(overAllResult.reason)}))
    break;
}
//category
const categoryResult=result[2];
switch(categoryResult.status){
    case "fulfilled":setCategoryData(categoryResult.value.data.data)
    break;
    case "rejected":setErrMsg(prev=>({...prev,categorySummery:getErrorMessage(categoryResult.reason)}))
    break;
}
//monthly summery
const monthlyResult=result[3];
switch(monthlyResult.status){
    case "fulfilled":setMonthlyData(monthlyResult.value.data.data)
    break;
    case "rejected":setErrMsg(prev=>({...prev,monthlySummery:getErrorMessage(monthlyResult.reason)}))
    break;
}

    }catch(err:any){
console.log(err.response.data.message)
    }
}
getData()
    },[])
     console.log(dashboardData,overAllData,categoryData,monthlyData)

    return <SafeAreaProvider style={{flex:1}}>
        <SafeAreaView style={{flex:1}}>
        <ScrollView style={{flex:1}}>
            <View style={styles.greetingBox}>
                <Text style={styles.greetingMsg}>Welcome To Expense Tracker</Text>
                <Text style={styles.greetingName}>{dashboardData?.name?dashboardData.name.charAt(0).toUpperCase()+dashboardData.name.slice(1).toLowerCase():""}</Text>
            </View>
            <View style={styles.mainCard}>
            <View style={styles.mainPart}>
                <Text style={{color:COLORS.whitesmoke}}>Balance</Text>
                <Text style={styles.balanceTxt}>{COLORS.rs} {overAllData?.balance?overAllData.balance:"0"}</Text></View>
            <View style={[styles.mainPart,{flexDirection:"row",alignItems:"center",justifyContent:"space-around"}]}>
                <View style={styles.inesp}>
                    <Text style={{color:COLORS.whitesmoke,fontWeight:"bold"}}>Incom</Text>
                    <Text style={{color:COLORS.white}}>{COLORS.rs} {overAllData?.totalIncome?overAllData.balance:"0"}</Text>
                </View>
                <View style={styles.inesp}>
                     <Text style={{color:COLORS.whitesmoke,fontWeight:"bold"}}>Expense</Text>
                     <Text style={{color:COLORS.white}}>{COLORS.rs} {overAllData?.totalExpense?overAllData.balance:"0"}</Text>
                                        
                </View>
            </View>
            </View>
            </ScrollView>
        </SafeAreaView>
    </SafeAreaProvider>
}

let styles=StyleSheet.create({
    greetingBox:{
        padding:10
    },
greetingMsg:{
    color:COLORS.inactive
},
greetingName:{
    color:COLORS.navy,
    fontSize:30,
    fontWeight:"bold"
},
mainCard:{
backgroundColor:COLORS.navy,
width:"90%",
height:170,
marginHorizontal:"auto",
borderRadius:10,
padding:15
},
mainPart:{
flex:1,
},
balanceTxt:{
color:"white",
fontSize:32

},inesp:{
    backgroundColor:COLORS.primary,
    paddingHorizontal:10,
    paddingVertical:5,
    width:120,
    borderRadius:10

}
})
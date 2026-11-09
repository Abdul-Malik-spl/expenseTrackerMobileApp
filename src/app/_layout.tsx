import { Stack } from "expo-router";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Layout() {
  return (
    <SafeAreaProvider>
<Stack screenOptions={{headerShown:false}}/>
    </SafeAreaProvider>
  )

}

    /*
    <Drawer
    initialRouteName='index'
      screenOptions={{
        headerStyle: {
          backgroundColor: '#2563EB',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        drawerActiveTintColor: '#2563EB',
        drawerInactiveTintColor: '#555555',
        drawerLabelStyle: {
          fontSize: 16,
        },
      }}
    >
        <Drawer.Screen
        name="index"
        options={{
          drawerItemStyle:{display:'none'},
      headerShown:false,
      swipeEnabled:false
        }}/>

      <Drawer.Screen
        name="dashboard"
        options={{
          drawerLabel: 'Home',
          title: 'Home',
        }}
      />
      <Drawer.Screen
      name='profile'
      options={{
        drawerLabel:"Profile",
        title:"PROFILE"
      }}
      />

      <Drawer.Screen
        name="login"
        options={{
          drawerItemStyle:{display:'none'},
      headerShown:false,
      swipeEnabled:false
        }}/>
           <Drawer.Screen
        name="otpVerify"
        options={{
          drawerItemStyle:{display:'none'},
      headerShown:false,
      swipeEnabled:false
        }}/>
         
      </Drawer>
    */ 
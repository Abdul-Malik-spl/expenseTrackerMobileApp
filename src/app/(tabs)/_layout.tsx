import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Layout() {
  let insets=useSafeAreaInsets()
  return (
    <Tabs
      screenOptions={{
        headerShown: true,

        headerStyle: {
          backgroundColor: COLORS.navy,
        },

        headerTintColor: COLORS.white,

        headerTitleStyle: {
          fontWeight: "bold",
        },

        tabBarStyle: {
          backgroundColor: COLORS.white,
          height: 75,
          paddingBottom:22,
          paddingTop: 5,
        },

        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.inactive,

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
        },
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Home",
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="home-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="transactions"
        options={{
          title: "Transactions",
          tabBarLabel: "Transactions",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="swap-horizontal-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="categories"
        options={{
          title: "Categories",
          tabBarLabel: "Categories",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="pricetags-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="person-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tabs>
  );
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
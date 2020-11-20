import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';

import Login from './src/Login';
import Home from './src/Home/Tabs/index';
import Favoritos from './src/Home/Tabs/Favoritos';
import Perfil from './src/Home/Tabs/Perfil';
import Cadastro from './src/Cadastro';
import Verification from './src/Verification';
import VoucherDetail from './src/Home/Tabs/VoucherDetail';
import Swiper from './src/swiper/index';
import meusVouchers from './src/Home/Tabs/inner-routes/meusVouchers';
import typeUser from './src/Cadastro/typeUser';
import pessoaJuridica from './src/Cadastro/pessoaJuridica';
import VoucherCrud from './src/Home/Tabs/VoucherCrud';
import firebase from './firebaseConfig';

import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const user = firebase.auth().currentUser;

function Tabs() {

  const [cnpj, setCnpj] = useState();

  useEffect(() => {
    (async () => {
      await firebase.database().ref(`users/${user.uid}`).once("value", function(snapshot) {
        if (snapshot.val().cnpj) {
          setCnpj(snapshot.val().cnpj)
        } else {
          setCnpj('')
        }
      })
     })();
  }, [])
  
  if (cnpj) {
    return(
      <Tab.Navigator 
        activeColor="#fff"
        initialRouteName="Vouchers"
        shifting={true}
        screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;
  
          if (route.name === 'Vouchers') {
            iconName = focused ? 'ticket' : 'ticket-outline';
          } else if (route.name === 'Favoritos') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === 'Perfil') {
            iconName = focused ? 'account-circle' : 'account-circle-outline';
          }
  
          return <MaterialCommunityIcons name={iconName} size={26} color={color} />;
          },
      })}>
        <Tab.Screen 
          name="Vouchers" 
          component={VoucherCrud} 
          options={{
            tabBarColor: "#1b263b",
        }}/>
        <Tab.Screen name="Favoritos" 
          component={Favoritos}
          options={{
            tabBarColor: "#c12a21",
        }}/>
        <Tab.Screen name="Perfil" 
          component={Perfil}       
          options={{
            tabBarColor: "#81b29a",
        }}/>
      </Tab.Navigator>
    )
  } else {
    return(
      <Tab.Navigator 
        activeColor="#fff"
        initialRouteName="Vouchers"
        shifting={true}
        screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;
  
          if (route.name === 'Vouchers') {
            iconName = focused ? 'ticket' : 'ticket-outline';
          } else if (route.name === 'Favoritos') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === 'Perfil') {
            iconName = focused ? 'account-circle' : 'account-circle-outline';
          }
  
          return <MaterialCommunityIcons name={iconName} size={26} color={color} />;
          },
      })}>
        <Tab.Screen 
          name="Vouchers" 
          component={Home} 
          options={{
            tabBarColor: "#1b263b",
        }}/>
        <Tab.Screen name="Favoritos" 
          component={Favoritos}
          options={{
            tabBarColor: "#c12a21",
        }}/>
        <Tab.Screen name="Perfil" 
          component={Perfil}       
          options={{
            tabBarColor: "#81b29a",
        }}/>
      </Tab.Navigator>
    )
  }
  
}

export default function App() {   

  const [firstTime, setFirstTime] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('JaLogado').then(value => {
      if (value == null) {
        AsyncStorage.setItem('JaLogado', 'true');
        setFirstTime(true)
      }else {
        setFirstTime(false)
      }
    })
    console.log(user);
  }, [])

  if (firstTime == null) {
    return null;
  } else if (firstTime == true) {
    return(
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Swiper">
          <Stack.Screen name="Login" component={Login} options={{headerShown: false, }}/>
          <Stack.Screen name="Swiper" component={Swiper} options={{headerShown: false, }}/>
          <Stack.Screen name="typeUser" component={typeUser} options={{headerShown: false, }}/>
          <Stack.Screen name="Vouchers" component={Tabs} options={{headerShown: false, }}/>
          <Stack.Screen name="Cadastro" component={Cadastro} options={{headerShown: false, }}/>
          <Stack.Screen name="pessoaJuridica" component={pessoaJuridica} options={{headerShown: false, }}/>
          <Stack.Screen name="Verification" component={Verification} options={{headerShown: false, }}/>
          <Stack.Screen name="Voucher" component={VoucherDetail} options={{
            title: "Detalhes",
            headerStyle: {
              backgroundColor: '#1b263b',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitleAlign: "center"
            }}/>
          <Stack.Screen name="meusVouchers" component={meusVouchers} options={{
            title: "Meus Vouchers",
            headerStyle: {
              backgroundColor: '#1b263b',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitleAlign: "center"
          }}/>
        </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
    )
  } else {
    return(
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} options={{headerShown: false, }}/>
          <Stack.Screen name="Vouchers" component={Tabs} options={{headerShown: false, }}/>
          <Stack.Screen name="typeUser" component={typeUser} options={{headerShown: false, }}/>
          <Stack.Screen name="Cadastro" component={Cadastro} options={{headerShown: false, }}/>
          <Stack.Screen name="pessoaJuridica" component={pessoaJuridica} options={{headerShown: false, }}/>
          <Stack.Screen name="Verification" component={Verification} options={{headerShown: false, }}/>
          <Stack.Screen name="Voucher" component={VoucherDetail} options={{
            title: "Detalhes",
            headerStyle: {
              backgroundColor: '#1b263b',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitleAlign: "center"
          }}/>
          <Stack.Screen name="meusVouchers" component={meusVouchers} options={{
            title: "Meus Vouchers",
            headerStyle: {
              backgroundColor: '#1b263b',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitleAlign: "center"
          }}/>
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}
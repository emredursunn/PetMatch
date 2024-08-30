import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SignInScreen from '../screens/auth/SignIn'
import SignupScreen from '../screens/auth/SignUp'


export type AuthStackParams = {
    SignIn:undefined,
    SignUp:undefined,
    forgotPassword:undefined
}

const AuthStack = createNativeStackNavigator<AuthStackParams>()

const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator initialRouteName='SignIn'>
        <AuthStack.Screen name='SignIn' component={SignInScreen}/>
        <AuthStack.Screen name='SignUp'component={SignupScreen}/>
        {/* <AuthStack.Screen name='forgotPassword'/> */}
    </AuthStack.Navigator>
  )
}

export default AuthStackNavigator

import React from "react";
import { RootNavigation } from "./src/navigation/RootNavigation";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";

export default function App() {
  return( 
  <>
  <StatusBar backgroundColor="transparent"/>
  <SafeAreaView style={{flex:1}}>
  <RootNavigation />
  </SafeAreaView>
  </>
  )
}

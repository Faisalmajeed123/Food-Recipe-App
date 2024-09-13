import { StyleSheet,LogBox } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from './src/Screens/Welcome';
import Home from './src/Screens/Home';
import RecipeDetails from './src/Screens/RecipeDetails';


const Stack = createNativeStackNavigator();

const App = () => {

  LogBox.ignoreAllLogs();

  return (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name='welcome' component={Welcome}/>
      <Stack.Screen name='home' component={Home}/>
      <Stack.Screen name='recipedetails' component={RecipeDetails}/>
    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})
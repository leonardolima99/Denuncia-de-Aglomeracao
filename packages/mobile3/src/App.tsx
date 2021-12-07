import React, { useState, useEffect } from 'react'
/* import AppLoading from 'expo-app-loading'; */
import { StatusBar } from 'react-native'
/* import RNBootSplash from 'react-native-bootsplash' */

import { NavigationContainer } from '@react-navigation/native'

/* import { AuthProvider } from './contexts/auth' */

/* import {Roboto_400Regular, Roboto_500Medium} from '@expo-google-fonts/roboto';
import {Ubuntu_700Bold, useFonts} from '@expo-google-fonts/ubuntu'; */

import Routes from './routes'

export default function App() {
  const [loaded, setLoaded] = useState(false)
  /*  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Ubuntu_700Bold,
  });

  if (!fontsLoaded) {
    return <Text>Carregando fontes...</Text>;
  } */
  useEffect(() => {
    const init = async () => {
      setLoaded(true)
    }

    init() /* .finally(async () => {
      RNBootSplash.hide({ fade: true })
    }) */
  }, [])
  return (
    <>
      {loaded && (
        <StatusBar
          barStyle="dark-content"
          translucent={true}
          backgroundColor="transparent"
        />
      )}

      <NavigationContainer>
        {/* <AuthProvider> */}
        <Routes />
        {/* </AuthProvider> */}
      </NavigationContainer>
    </>
  )
}

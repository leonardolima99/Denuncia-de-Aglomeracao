import React, { useState, useEffect } from 'react'
import { StatusBar, useColorScheme } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import RNBootSplash from 'react-native-bootsplash'

/* import { AuthProvider } from './contexts/auth' */

import Routes from './routes'
import { Colors } from 'react-native/Libraries/NewAppScreen'

type hide = (config?: { fade?: boolean }) => Promise<void>

export default function App() {
  const [loaded, setLoaded] = useState(false)

  const isDarkMode = useColorScheme() === 'dark'

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter
  }

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

      <NavigationContainer onReady={() => RNBootSplash.hide({ fade: true })}>
        {/* <AuthProvider>
        </AuthProvider> */}
        <Routes />
      </NavigationContainer>
    </>
  )
}

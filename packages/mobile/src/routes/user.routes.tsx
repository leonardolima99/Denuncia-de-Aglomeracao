import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Home from '../pages/Home'
import Denunciations from '../pages/Denunciations'
import BackToMap from '../pages/BackToMap'
import NewDenunciation from '../pages/NewDenunciation'

import { RootStackParamList } from '../types/navigation'
import { View } from 'react-native'

const UserStack = createStackNavigator()

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface RootParamList extends RootStackParamList {}
  }
}

const UserRoutes: React.FC = () => (
  <View style={{ flex: 1, backgroundColor: 'black' }}>
    <UserStack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: false
      }}
    >
      <UserStack.Screen name="Home" component={Home} />
      <UserStack.Screen name="Denunciations" component={Denunciations} />
      <UserStack.Screen name="BackToMap" component={BackToMap} />
      <UserStack.Screen name="NewDenunciation" component={NewDenunciation} />
    </UserStack.Navigator>
  </View>
)

export default UserRoutes

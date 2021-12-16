import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Home from '../pages/Home'
import Denunciations from '../pages/Denunciations'
import { RootStackParamList } from '../types/navigation'

const UserStack = createStackNavigator()

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface RootParamList extends RootStackParamList {}
  }
}

const UserRoutes: React.FC = () => (
  <UserStack.Navigator screenOptions={{ headerShown: false }}>
    <UserStack.Screen name="Home" component={Home} />
    <UserStack.Screen name="Denunciations" component={Denunciations} />
  </UserStack.Navigator>
)

export default UserRoutes

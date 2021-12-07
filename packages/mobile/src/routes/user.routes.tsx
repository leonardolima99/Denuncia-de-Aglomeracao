import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Home from '../pages/Home'

const UserStack = createStackNavigator()

const UserRoutes: React.FC = () => (
  <UserStack.Navigator screenOptions={{ headerShown: false }}>
    <UserStack.Screen name="Home" component={Home} />
  </UserStack.Navigator>
)

export default UserRoutes

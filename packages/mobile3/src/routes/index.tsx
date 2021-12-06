import React from 'react'
import { View, ActivityIndicator } from 'react-native'

import { useAuth } from '../contexts/auth'

import AdminRoutes from './admin.routes'
import UserRoutes from './user.routes'
import SignRoutes from './sign.routes'

const Routes: React.FC = () => {
  const { signed, user, loading } = useAuth()

  if (loading) {
    return (
      // eslint-disable-next-line react-native/no-inline-styles
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#f15a57" />
      </View>
    )
  }

  if (!signed) {
    return <SignRoutes />
  }
  return user?.level === 2 ? <AdminRoutes /> : <UserRoutes />
}

export default Routes

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Home from '../pages/Home';
import SignIn from '../pages/SignIn';
import CreateAccount from '../pages/CreateAccount';

const SignStack = createStackNavigator();

const SignRoutes: React.FC = () => (
  <SignStack.Navigator headerMode="none">
    <SignStack.Screen name="SignIn" component={SignIn} />
    <SignStack.Screen name="CreateAccount" component={CreateAccount} />
    <SignStack.Screen name="Home" component={Home} />
  </SignStack.Navigator>
);

export default SignRoutes;

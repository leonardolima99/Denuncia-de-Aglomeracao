import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Home from '../pages/Home';
import Denunciations from '../pages/Denunciations';
import BackToMap from '../pages/BackToMap';
import Detail from '../pages/Detail';
import NewDenunciation from '../pages/NewDenunciation';
import SignIn from '../pages/SignIn';

const UserStack = createStackNavigator();

const UserRoutes: React.FC = () => (
  <UserStack.Navigator headerMode="none">
    <UserStack.Screen name="Home" component={Home} />
    <UserStack.Screen name="Denunciations" component={Denunciations} />
    <UserStack.Screen name="Detail" component={Detail} />
    <UserStack.Screen name="BackToMap" component={BackToMap} />
    <UserStack.Screen name="NewDenunciation" component={NewDenunciation} />
    <UserStack.Screen name="SignIn" component={SignIn} />
  </UserStack.Navigator>
);

export default UserRoutes;

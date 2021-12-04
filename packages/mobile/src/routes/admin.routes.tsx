import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Home from '../pages/Home';
import Denunciations from '../pages/Denunciations';
import BackToMap from '../pages/BackToMap';
import NewDenunciation from '../pages/NewDenunciation';
import Detail from '../pages/Detail';
import SignIn from '../pages/SignIn';

const AdminStack = createStackNavigator();

const AdminRoutes: React.FC = () => (
  <AdminStack.Navigator headerMode="none">
    <AdminStack.Screen name="Home" component={Home} />
    <AdminStack.Screen name="Denunciations" component={Denunciations} />
    <AdminStack.Screen name="BackToMap" component={BackToMap} />
    <AdminStack.Screen name="NewDenunciation" component={NewDenunciation} />
    <AdminStack.Screen name="Detail" component={Detail} />
    <AdminStack.Screen name="SignIn" component={SignIn} />
  </AdminStack.Navigator>
);

export default AdminRoutes;

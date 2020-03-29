import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainDeliveriesScreen from '../MainDeliveryScreen';
import DetailedDelivery from '../DetailedDelivery';
import ProblemsScreen from '../ProblemsScreen';
import InformProblemScreen from '../InformProblemScreen';
import ConfirmDeliveryScreen from '../ConfirmDeliveryScreen';

const DeliveriesStack = createStackNavigator();

const DeliveriesScreen = () => (
  <DeliveriesStack.Navigator headerMode="none" initialRouteName="Main">
    <DeliveriesStack.Screen name="Main" component={MainDeliveriesScreen} />
    <DeliveriesStack.Screen
      name="DetailedDelivery"
      component={DetailedDelivery}
    />
    <DeliveriesStack.Screen name="ViewProblems" component={ProblemsScreen} />
    <DeliveriesStack.Screen
      name="InformProblem"
      component={InformProblemScreen}
    />
    <DeliveriesStack.Screen
      name="ConfirmDelivery"
      component={ConfirmDeliveryScreen}
    />
  </DeliveriesStack.Navigator>
);

export default DeliveriesScreen;

import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DeliveriesScreen from '../DeliveriesScreen';
import PerfilScreen from '../PerfilScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ThemeContext } from 'styled-components';

const Tab = createBottomTabNavigator();
const MainScreen = () => {
  const { primary } = React.useContext(ThemeContext);
  return (
    <Tab.Navigator
      initialRouteName="Entregas"
      tabBarOptions={{
        activeTintColor: primary,
        labelStyle: {
          fontSize: 15,
          marginBottom: 10,
          marginTop: -8,
        },

        allowFontScaling: true,
        adaptive: true,
        style: {
          paddingVertical: 0,
          height: 60,
        },
      }}>
      <Tab.Screen
        name="Entregas"
        options={{
          tabBarLabel: 'Entregas',
          tabBarIcon: ({ color, size }) => (
            <Icon name="view-headline" color={color} size={size} />
          ),
        }}
        component={DeliveriesScreen}
      />
      <Tab.Screen
        name="Meu Perfil"
        options={{
          tabBarLabel: 'Meu Perfil',
          tabBarIcon: ({ color, size }) => (
            <Icon name="account-circle" color={color} size={size} />
          ),
        }}
        component={PerfilScreen}
      />
    </Tab.Navigator>
  );
};

export default MainScreen;

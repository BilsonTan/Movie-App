import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainTabNavigator from './main';

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <MainTabNavigator />
    </NavigationContainer>
  );
}

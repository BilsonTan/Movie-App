import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/home';
import WatchlistScreen from '../screens/watchlist';
import DetailsScreen from '../screens/details';
import { HomeTabBarIcon, WatchlistTabBarIcon } from '../components/icons';
import { DetailsProvider } from '../context/details-context';
import { SafeAreaView } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const WatchlistStack = createNativeStackNavigator();

function HomeStackNavigator() {
  return (
    <DetailsProvider>
      <HomeStack.Navigator screenOptions={{ headerShown: false }}>
        <HomeStack.Screen name="HomeTab" component={HomeScreen} />
        <HomeStack.Screen name="Details" component={DetailsScreen} />
      </HomeStack.Navigator>
    </DetailsProvider>
  );
}

function WatchlistStackNavigator() {
  return (
    <WatchlistStack.Navigator screenOptions={{ headerShown: false }}>
      <WatchlistStack.Screen name="WatchlistTab" component={WatchlistScreen} />
    </WatchlistStack.Navigator>
  );
}

export default function MainTabNavigator() {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: '#032541',
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeStackNavigator}
          options={{
            tabBarIcon: HomeTabBarIcon,
            tabBarIconStyle: {
              margin: 20,
              paddingBottom: 20,
            },
          }}
        />
        <Tab.Screen
          name="Watchlist"
          component={WatchlistStackNavigator}
          options={{
            tabBarIcon: WatchlistTabBarIcon,
            tabBarIconStyle: {
              margin: 20,
              paddingBottom: 20,
            },
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

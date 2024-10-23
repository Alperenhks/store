import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Search from '../screens/Search';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const tabBarOptions = {
  tabBarActiveTintColor: '#FF5714',
  tabBarInactiveTintColor: 'gray',
  tabBarLabel: '',
};

const BottomTabs = () => (
  <Tab.Navigator initialRouteName="Ana Sayfa" screenOptions={tabBarOptions}>
    <Tab.Screen
      name="Ana Sayfa"
      component={HomeScreen}
      options={{
        headerShown: false, 
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="home-outline" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Search"
      component={Search}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="search-outline" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Sepetim"
      component={CartScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="cart-outline" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Favorilerim"
      component={FavoritesScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="heart-outline" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Profil"
      component={ProfileScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="person-outline" size={size} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default BottomTabs;

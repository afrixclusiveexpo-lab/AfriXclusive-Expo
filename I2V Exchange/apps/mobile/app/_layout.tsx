import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AppProvider, useApp } from '../src/context';
function Navigation() { const { dark } = useApp(); return <><StatusBar style={dark ? 'light' : 'dark'}/><Stack screenOptions={{ headerShown: false }}><Stack.Screen name="(tabs)"/><Stack.Screen name="auth" options={{ presentation: 'modal' }}/><Stack.Screen name="profile"/><Stack.Screen name="project/[id]"/><Stack.Screen name="watchlist"/><Stack.Screen name="compare"/></Stack></>; }
export default function Layout() { return <AppProvider><Navigation/></AppProvider>; }

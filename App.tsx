import React from 'react';
import RootNavigator from './src/navigation/root';
import { MovieProvider } from './src/context/movie-context';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <MovieProvider>
        <RootNavigator />
      </MovieProvider>
    </SafeAreaProvider>
  );
}

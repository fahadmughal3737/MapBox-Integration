import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {World} from './src/screens/map/worldMap';
const Stack = createNativeStackNavigator();
import MapboxGL from '@rnmapbox/maps';
const App = () => {
  useEffect(() => {
    MapboxGL.setConnected(true);
    MapboxGL.setWellKnownTileServer('Mapbox');

    MapboxGL.setAccessToken(
      'pk.eyJ1IjoiZmFoYWRtdWdoYWwzNzM3IiwiYSI6ImNsZHN2NDVkdTIwNHo0MW4wcnVhZHJscGMifQ.zY1a69BlrCFXTgwDCug1vw',
    );
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="World"
          component={World}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;

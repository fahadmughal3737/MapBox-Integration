import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Chart } from './src/screens/map/Chart';
import { VictoryTest } from './src/screens/map/VictoryTest';
import { TempDataSet } from './src/screens/map/tempdataset';
const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen
          name="Temp"
          component={TempDataSet}
          options={{ headerShown: false }}
        /> */}
        <Stack.Screen
          name="VictoryTest"
          component={VictoryTest}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Chart"
          component={Chart}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;

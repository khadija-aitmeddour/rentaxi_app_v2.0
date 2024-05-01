import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LocalInput from './screens/LocationInput';
import MapScreen from './screens/MapScreen';
import ReservationScreen from './screens/ReservationScreen';

function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Reservation" component={ReservationScreen} />
        <Stack.Screen 
        name="Location" 
        component={LocalInput} 
        options={{
          title: 'Customize your ride',
          headerStyle: {
            elevation: 0, // Hide the shadow
          },
        }}/>
        <Stack.Screen 
        name="Map" 
        component={MapScreen} 
        options={{
          title: 'Finalize your request!',
          headerStyle: {
            elevation: 0, // Hide the shadow
          },
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LocalInput from './screens/LocationInput';
import MapScreen from './screens/MapScreen';
import ReservationScreen from './screens/ReservationScreen';
import PendingRequest from './screens/PendingRequest';
import Signup from './screens/Signup';

function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
        name="Signup" 
        component={Signup} 
        options={{
          title: '',
          headerStyle: {
            elevation: 0, 
            height:0,
          },
        }}/>
        <Stack.Screen 
        name="Reservation" 
        component={ReservationScreen} 
        options={{
          title: '',
          headerStyle: {
            elevation: 0, 
            height: 0,
          },
        }}/>
        <Stack.Screen 
        name="Location" 
        component={LocalInput} 
        options={{
          title: 'Customize your ride',
          headerStyle: {
            elevation: 0, 
          },
        }}/>
        <Stack.Screen 
        name="Map" 
        component={MapScreen} 
        options={{
          title: 'Finalize your request!',
          headerStyle: {
            elevation: 0, 
          },
        }}/>
        <Stack.Screen 
        name="Request" 
        component={PendingRequest} 
        options={{
          title: 'Searching for driver...',
          headerStyle: {
            elevation: 0, 
          },
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
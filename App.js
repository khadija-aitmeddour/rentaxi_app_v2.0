import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import LocalInput from './screens/LocationInput';
import MapScreen from './screens/MapScreen';
import ReservationScreen from './screens/ReservationScreen';
import PendingRequest from './screens/PendingRequest';
import Signup from './screens/Signup';
import LocationInput from './screens/LocationInput';
import Home from './screens/Home';
import Profile from './screens/Profile';
import MyRides from './screens/MyRides';
import PhoneSignIn from './screens/PhoneSignIn';



const HomePage = () => {
  const Tab = createBottomTabNavigator();
  return(
    <Tab.Navigator
         initialRouteName='Home'
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;
        
              if (route.name === 'Home') {
                iconName = 'home';
              } else if (route.name === 'Book Taxi') {
                iconName = 'add';
              } else if (route.name === 'My Profile') {
                iconName = 'person';
              }else if (route.name === 'My Rides') {
                iconName = 'book';
              }
        
              return <Icon name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'black',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: {
              display: 'flex',
              paddingBottom: 5,
              paddingTop: 5,
              height: 55,
              elevation: 5,
            },
            headerShown: true,
          })}>
        
      
        {/* tab screeeeeens !!! */}
        <Tab.Screen 
          name="Home" 
          component={Home} 
          options={{headerShown:false}}/>
        <Tab.Screen 
          name="Book Taxi" 
          component={ReservationScreen} 
          options={{headerShown:false}}/>
        <Tab.Screen 
          name="My Rides" 
          component={MyRides} 
          options={{headerShown:false}}/>
        <Tab.Screen 
          name="My Profile" 
          component={Profile}
          options={{
            headerStyle: {
              elevation:3,
            }
          }}
          />
       
      </Tab.Navigator>
     
  );
}

function App() {
  const Stack = createStackNavigator();
 
  return (
   
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
        name="PhoneSignIn" 
        component={PhoneSignIn} 
        options={{
          title: '',
          headerStyle: {
            elevation: 0, 
            height:0,
          },
        }}/>

        <Stack.Screen 
        name="HomePage" 
        component={HomePage} 
        options={{
          headerShown: false,
        }}/>

        <Stack.Screen 
        name="Location" 
        component={LocalInput} 
        options={{
          title: 'Customize your ride',
          headerStyle: {
            elevation: 0, 
          },
          headerShown: true,
        }}/>
        <Stack.Screen 
        name="Map" 
        component={MapScreen} 
        options={{
          title: 'Finalize your request!',
          headerStyle: {
            elevation: 0, 
          },
          headerShown: true,
        }}/>
        <Stack.Screen 
        name="Request" 
        component={PendingRequest} 
        options={{
          title: '',
          headerStyle: {
            elevation: 0, 
          },
          headerShown: false,
        }}/>
      </Stack.Navigator> 
      </NavigationContainer> 

  );
}

export default App;


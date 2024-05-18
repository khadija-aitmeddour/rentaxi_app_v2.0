import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import LocalInput from './screens/LocationInput';
import MapScreen from './screens/MapScreen';
import ReservationScreen from './screens/ReservationScreen';
import PendingRequest from './screens/PendingRequest';
import SignupScreen from './screens/SignupScreen';
import Home from './screens/Home';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config';
import SplashScreen from './screens/SplashScreen';
import SignInTypeScreen from './screens/SignInTypeScreen';
import GetStarted from './screens/GetStarted';
import LoginScreen from './screens/LoginScreen';
import DriverApplicationScreen from './screens/DriverApplicationScreen';
import AddTaxiScreen from './screens/AddTaxiScreen';
import { UserProvider } from './context/UserContext';
import Profile from './screens/Profile';
import MenuScreen from './screens/MenuScreen';
import Notification from './screens/Notification';

const HomePage = () => {
  const Tab = createBottomTabNavigator();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async (uid) => {
      const endpoint = `http://192.168.0.119:3000/users/${uid}`

      await fetch(endpoint)
        .then(response => response.json())
        .then(data => {
          setUser(data);
        })

    }
    if (auth.currentUser != null) {
      const uid = auth.currentUser.uid
      getUser(uid);
    }
  }, [user]);

  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Book Taxi') {
            iconName = 'add';
          } else if (route.name === 'Menu') {
            iconName = 'menu';
          } else if (route.name === 'My Rides') {
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
        options={{ headerShown: false }}
        initialParams={user}

      />
      <Tab.Screen
        name="Book Taxi"
        component={ReservationScreen}
        options={{ headerShown: false }} />
      <Tab.Screen
        name="My Rides"
        component={Notification}
        options={{ headerShown: false }} />
      <Tab.Screen
        name="Menu"
        component={MenuScreen}
        options={{
          headerStyle: {
            elevation: 3,
          },
          headerShown: false,
        }}
        initialParams={user}

      />

    </Tab.Navigator>

  );
}

function App() {


  const Stack = createStackNavigator();


  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (initializing) setInitializing(false);
    });

    return unsubscribe;
  }, []);

  if (initializing) {
    return null;
  }

  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="splash"
            component={SplashScreen}
            options={{
              title: '',
              headerStyle: {
                elevation: 0,
                height: 0,
              },
            }} />


          <Stack.Screen
            name="GetStarted"
            component={GetStarted}
            options={{
              title: '',
              headerStyle: {
                elevation: 0,
                height: 0,
              },
            }} />
          <Stack.Screen
            name="SignupScreen"
            component={SignupScreen}
            options={{
              title: '',
              headerStyle: {
                elevation: 0,
                height: 0,
              },
            }} />
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{
              title: '',
              headerStyle: {
                elevation: 0,
                height: 0,
              },
            }} />
          <Stack.Screen
            name="SignInTypeScreen"
            component={SignInTypeScreen}
            options={{
              title: '',
              headerStyle: {
                elevation: 0,
                height: 0,
              },
            }} />
          <Stack.Screen
            name="DriverApplicationScreen"
            component={DriverApplicationScreen}
            options={{
              title: 'Application Form',
              headerStyle: {
                elevation: 0,
              },
            }} />
          <Stack.Screen
            name="AddTaxiScreen"
            component={AddTaxiScreen}
            options={{
              title: 'Taxi Informations',
              headerStyle: {
                elevation: 0,
              },
            }} />

          <Stack.Screen
            name="HomePage"
            component={HomePage}
            options={{
              headerShown: false,
            }} />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{
              title: '',
              
              headerStyle: {
                elevation: 0,
                backgroundColor: '#FFDC1C',
                height: 30,

              },
              headerShown: true,
            }} />

          <Stack.Screen
            name="Location"
            component={LocalInput}
            options={{
              title: 'Customize your ride',
              headerStyle: {
                elevation: 0,
              },
              headerShown: true,
            }} />
          <Stack.Screen
            name="Map"
            component={MapScreen}
            options={{
              title: 'Finalize your request!',
              headerStyle: {
                elevation: 0,
              },
              headerShown: true,
            }} />
          <Stack.Screen
            name="Request"
            component={PendingRequest}
            options={{
              title: '',
              headerStyle: {
                elevation: 0,
              },
              headerShown: false,
            }} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}

export default App;


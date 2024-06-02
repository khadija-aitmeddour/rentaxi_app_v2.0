import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import LocalInput from './screens/reservationScreens/LocationInput';
import MapScreen from './screens/reservationScreens/MapScreen';
import ReservationScreen from './screens/ReservationScreen';
import PendingRequest from './screens/reservationScreens/PendingRequest';
import SignupScreen from './screens/authentificationScreens/SignupScreen';
import Home from './screens/Home';
import { useContext, useEffect, useState, useRef } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config';
import SignInTypeScreen from './screens/authentificationScreens/SignInTypeScreen';
import GetStarted from './screens/GetStarted';
import LoginScreen from './screens/authentificationScreens/LoginScreen';
import DriverApplicationScreen from './screens/authentificationScreens/DriverApplicationScreen';
import AddTaxiScreen from './screens/authentificationScreens/AddTaxiScreen';
import { UserProvider } from './context/UserContext';
import Profile from './screens/Profile';
import MenuScreen from './screens/MenuScreen';
import ReservationDetailsScreen from './screens/reservationScreens/ReservationDetailsScreen';
import * as Notifications from 'expo-notifications';
import { registerForPushNotificationsAsync } from './hooks/usePushNotifications';
import { useNavigation } from '@react-navigation/native';
import NotFound from './screens/NotFound';
import { UserContext } from './context/UserContext';
import { ReservationProvider } from './context/ReservationContext';
import ClientDetailsScreen from './screens/ClientDetailsScreen';
import DriverDetailsScreen from './screens/DriverDetails';
import AdminDashboard from './screens/adminScreens/AdminDashboard';
import ApplicationDetails from './screens/adminScreens/ApplicationDetails';
import { localhost } from './localhostConfig';
import ReservationManagmntScreen from './screens/reservationScreens/ReservationManagmntScreen';


const HomePage = () => {
  const Tab = createBottomTabNavigator();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const getUser = async (uid) => {
      const endpoint = `${localhost}/users/${uid}`
      console.log(endpoint)

      await fetch(endpoint)
        .then(response => response.json())
        .then(data => {
          setUser(data);
          console.log('user fetched successfully')

        })

    }
    if (auth.currentUser != null) {
      const uid = auth.currentUser.uid
      console.log('fetching the user from db....')
      getUser(uid);
    }
  }, []);

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(undefined);
  const notificationListener = useRef();
  const responseListener = useRef();
  const navigation = useNavigation();
  const notificationReceivedTime = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then(token => setExpoPushToken(token || ''))
      .catch(error => setExpoPushToken(error.message));
    setUser({ ...user, expoPushToken: expoPushToken })
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
      notificationReceivedTime.current = new Date();
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      const { reservationDetails } = response.notification.request.content.data;

      const currentTime = new Date();
      const timeElapsed = (currentTime - notificationReceivedTime.current) / 1000;

      if (timeElapsed > 12) {
        navigation.navigate('Not Found');
      } else {
        navigation.navigate('ReservationDetails', { reservationDetails });
      }
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

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
          } else if (route.name === 'Reservations') {
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
        name="Reservations"
        component={ReservationManagmntScreen}
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
      <ReservationProvider>
        <NavigationContainer>
          <Stack.Navigator>
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
              name="AdminDashboard"
              component={AdminDashboard}
              options={{
                headerShown: false,
              }} />
            <Stack.Screen
              name="ApplicationDetails"
              component={ApplicationDetails}
              options={{
                headerShown: false,
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
            <Stack.Screen
              name="ReservationDetails"
              component={ReservationDetailsScreen}
              options={{
                title: '',
                headerStyle: {
                  elevation: 0,
                },
                headerShown: false,
              }} />
            <Stack.Screen
              name="Not Found"
              component={NotFound}
              options={{
                headerShown: false,
              }} />
            <Stack.Screen
              name="ClientInfos"
              component={ClientDetailsScreen}
              options={{
                headerShown: false,
              }} />
            <Stack.Screen
              name="DriverInfos"
              component={DriverDetailsScreen}
              options={{
                headerShown: false,
              }} />

          </Stack.Navigator>
        </NavigationContainer>
      </ReservationProvider>
    </UserProvider>
  );
}

export default App;


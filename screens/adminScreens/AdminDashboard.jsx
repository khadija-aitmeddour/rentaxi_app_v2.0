import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, Alert, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { set } from 'firebase/database';
const AdminDashboard = () => {
  const Tab = createBottomTabNavigator();
 
  

  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Notifications') {
            iconName = 'notifications';
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
        options={{ headerShown: false }} />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{ headerShown: false }} />

    </Tab.Navigator>
  );
};

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>
      
         
    </View>
  );
}

const Notifications = ({ navigation }) => {

  const recentRides = [
    { id: 1, destination: 'Airport', date: 'May 1, 2024' },
    { id: 2, destination: 'Downtown', date: 'April 28, 2024' },
    { id: 3, destination: 'Shopping Mall', date: 'April 25, 2024' },
    { id: 4, destination: 'Shopping Mall', date: 'April 25, 2024' },
    { id: 5, destination: 'Shopping Mall', date: 'April 25, 2024' },
    { id: 6, destination: 'Shopping Mall', date: 'April 25, 2024' },
  ];
  const [applications, setApplications] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const getApplications = async () => {
    const enpoint = 'http://192.168.0.119:3000/applications';
    const response = await fetch(enpoint);
    const applications = await response.json();
    setApplications(applications);
  }

  useEffect(() => {
    getApplications(); 
  }, [refreshing]);

  return (
    <ScrollView contentContainerStyle={styles.container}
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }
    >
      <Text style={styles.title}>Notifications</Text>
      {applications.map(application => (
              <TouchableOpacity 
              key={application.id} 
              style={styles.recentRideCard}
              onPress={() => {
                
                navigation.navigate('ApplicationDetails', { application })}}
              >
                <Text>{application.fullName}</Text>
                <Text>{application.email}</Text>
                <Text>{application.phone}</Text>
              </TouchableOpacity>
            ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  requestItem: {
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
    borderRadius: 8,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  recentRidesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFDC1C',
    marginBottom: 10,
  },
  recentRideCard: {
    backgroundColor: '#ffffff',
    padding: 5,
    borderRadius: 8,
    marginBottom: 15,
    width: 300,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
});

export default AdminDashboard;

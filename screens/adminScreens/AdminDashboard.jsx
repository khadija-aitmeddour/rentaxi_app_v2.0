import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { localhost } from '../../localhostConfig';



const AdminDashboard = ({ navigation }) => {

  const [applications, setApplications] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    });
  }, []);

  const getApplications = async () => {
    const enpoint = `${localhost}/applications`;
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
     
      <View style={{ paddingTop:  50, alignItems: 'center', backgroundColor: '#FFDC1C', height: 150, borderBottomStartRadius: 15, borderBottomEndRadius: 15 }}>
        <Icon name="person-circle" size={40} color="#000" />
        <Text style={styles.welcomeMessage}>Admin Dashboard</Text>

      </View>
      <View style={{ alignItems: 'flex-start', padding: 20, paddingTop: 30, backgroundColor: "#fff" }}>
        <ScrollView>
          <Text style={styles.notificationsTitle}>Drivers pending requests</Text>
          {applications.map(application => (
            <TouchableOpacity
              key={application.id}
              style={styles.applicationCard}
              onPress={() => {

                navigation.navigate('ApplicationDetails', { application })
              }}
            >
              <Text>{application.fullName}</Text>
              <Text>{application.email}</Text>
              <Text>{application.phone}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
         <TouchableOpacity 
         onPress={() => {navigation.navigate('LoginScreen')}}
         style={{position: "absolute", bottom: 20, right: 20}}>
            <Icon name="log-out" size={30} color="#000" />
         </TouchableOpacity>
    </ScrollView>

  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",

  },
  welcomeMessage: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
 
  
  notificationsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFDC1C',
    marginBottom: 10,
  },
  applicationCard: {
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

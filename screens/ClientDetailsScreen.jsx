import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Image,  Linking, TouchableOpacity } from 'react-native';
import { localhost } from '../localhostConfig';


const ClientDetailsScreen = ({ navigation, route }) => {
  const { uid } = route.params;
  const [user, setUser] = useState(null); 
  console.log(route )
  const callNow = () => {
    Linking.openURL(`tel:${user.phone}`);
  };

  const cancelReservation = () => {
   
    console.log('Reservation cancelled');
    navigation.navigate('Home');
  };
  useEffect(() => {
  const getClientInfo = async () => {
    const endpoint = `${localhost}/users/${uid}`;
    await fetch(endpoint)
      .then(response => response.json())
      .then(data => {
        setUser(data);
        console.log('user', data);
      }).catch(error => console.log(error));
  }
  getClientInfo();
}, [uid]);

  return (
    <View style={styles.container}>
      {user ? (
        <>
        
           <Image source={require('../images/success.png')} />
           <Text style={styles.successMessage}>Reservation made successfully ! </Text>
           <Text style={[styles.successMessage, {marginBottom: 20}]}>{user.username} is waiting...</Text>
          <Image source={{ uri: user.photo }} style={styles.profilePicture} />
          <Text style={styles.username}>{user.username}</Text>
          <TouchableOpacity style={{flexDirection: 'row'}} onPress={callNow}>
              <Image source={require('../images/call.png')} style={{ width: 25, height: 25 }}/>
              <Text style={styles.phone}>{user.phone}</Text>
              {/* <Text style={styles.callButtonText}>Call {user.username}</Text> */}
            </TouchableOpacity>
         
          <View style={{ width: "100%", height: "30%", alignItems: 'center', justifyContent: 'flex-end' }}>
            <TouchableOpacity style= {styles.callButton} onPress={() => {navigation.navigate('Home')}}>
               <Text style={styles.callButtonText}>Go to Dashboard</Text> 
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={cancelReservation}>
              <Text style={styles.cancelButtonText}>Cancel Reservation</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <Text>Loading client details...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 20,
    backgroundColor: '#fff',
  },
  successMessage: {
    fontSize: 20,
    color: '#40C057',
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  phone: {
    fontSize: 18,
    marginBottom: 20,
    paddingStart:2,
  },
 
 
  callButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  callButton: {
    backgroundColor: '#40C057',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
    width: "70%",
    alignItems: 'center',
  },
  callButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  cancelButton: {
    backgroundColor: '#FA5252',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
    width: "70%",
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default ClientDetailsScreen;

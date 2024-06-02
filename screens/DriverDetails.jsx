import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Linking, TouchableOpacity, BackHandler } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { localhost } from '../localhostConfig';

const DriverDetailsScreen = ({ route }) => {
  const { driverUid } = route.params;
  const [user, setUser] = useState(null);
  const navigation = useNavigation();

  const callNow = () => {
    Linking.openURL(`tel:${user.phone}`);
  };

  const cancelReservation = () => {
    console.log('Reservation cancelled');
    navigation.navigate('Home');
  };

  useEffect(() => {
    const getClientInfo = async () => {
      const endpoint = `${localhost}/users/${driverUid}`;
      await fetch(endpoint)
        .then(response => response.json())
        .then(data => {
          setUser(data);
          console.log('user', data);
        }).catch(error => console.log(error));
    };
    getClientInfo();
  }, [driverUid]);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate('Home');
        return true; 
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [navigation])
  );

  return (
    <View style={styles.container}>
      {user ? (
        <>
         
          <Image source={require('../images/success.png')} />
          <Text style={styles.comingText}>Reservation made successfully!</Text>
          <Text style={[styles.comingText, {marginBottom: 20}]}>Driver {user.username} is on the way!</Text>
          <Image source={{ uri: user.photo }} style={styles.profilePicture} />
          <Text style={styles.username}>{user.username}</Text>
          <TouchableOpacity style={{flexDirection: 'row'}} onPress={callNow}>
              <Image source={require('../images/call.png')} style={{ width: 25, height: 25 }}/>
              <Text style={styles.phone}>{user.phone}</Text>
             
          </TouchableOpacity>
          
          <View style={{ width: "100%", height: "30%", alignItems: 'center', justifyContent: 'flex-end' }}>
            <TouchableOpacity style={styles.callButton} onPress={() => {navigation.navigate('Home')}}>
              <Text style={styles.callButtonText}>Go to Dashboard</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={cancelReservation}>
              <Text style={styles.cancelButtonText}>Cancel Reservation</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <Text>Loading driver details...</Text>
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
  comingText: {
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

export default DriverDetailsScreen;

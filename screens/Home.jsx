import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import { UserContext } from '../context/UserContext';
import { localhost } from '../localhostConfig';

const Home = ({ navigation }) => {

  const { user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState('Yuki');
  const [photo, setPhoto] = useState('https://picsum.photos/200/300');
  const [reservations, setReservations] = useState([]); 

  useEffect(() => {

    setUsername(user.username);
    setPhoto(user.photo);
    const getReservations = async (uid) => {
      const endpoint = `${localhost}/reservations/${uid}`;
      await fetch(endpoint)
      .then(response => response.json()) 
      .then(data => {
        setReservations(data);
      })
      .catch(error => console.log(error));
    }
    getReservations(user.uid); 
  }, [reservations]);
    

  return (

    <View style={styles.container}>
      {user.typeUser === 'customer' && (
        <ScrollView>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => navigation.navigate('Profile')}
          >
            <Image
              source={{ uri: photo }}
              style={styles.profilePic}
              resizeMode="cover"
            />

          </TouchableOpacity>
          <View style={{ alignItems: 'center', backgroundColor: '#FFDC1C', height: 300, borderBottomStartRadius: 15, borderBottomEndRadius: 15 }}>

            <Text style={styles.welcomeMessage}>Welcome {username}! </Text>

            <Text style={{ fontFamily: 'monospace' }}>Wanna go somewhere? Let's go!</Text>
            <TouchableOpacity
              style={styles.bookTaxiButton}
              onPress={() => navigation.navigate('Book Taxi')}
            >
              <Image source={require('../images/taxiIcon2.png')} />
              <Text style={styles.buttonText}>RenTaxi Now !</Text>
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: 'flex-start', padding: 20, paddingTop: 30, backgroundColor: "#fff" }}>
            <ScrollView>
              <Text style={styles.recentRidesTitle}>Recent Rides</Text>
              {/* <View style= {styles.line}/>  */}
              {reservations.map(reservation => (
                <View key={reservation.numRes} style={styles.recentRideCard}>
                  <Text>{reservation.pickupLocation}</Text>
                  <Text>{reservation.pickoffLocation}</Text>
                  <Text>{reservation.resDate}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </ScrollView>
      )}
      {user.typeUser === 'driver' && (
        <ScrollView>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => navigation.navigate('Profile')}
          >
            <Image
              source={{ uri: photo }}
              style={styles.profilePic}
              resizeMode="cover"
            />

          </TouchableOpacity>
          <View style={{ alignItems: 'center', backgroundColor: '#FFDC1C', height: 200, borderBottomStartRadius: 15, borderBottomEndRadius: 15 }}>

            <Text style={styles.welcomeMessage}>Hey Driver {username}! </Text>
            <Text style={{ fontFamily: 'monospace' }}>Ready to drive? Let's go!</Text>

          </View>

          <View style={{ alignItems: 'flex-start', padding: 20, paddingTop: 30, backgroundColor: "#fff" }}>
            <ScrollView>
              <Text style={styles.recentRidesTitle}>Recent Rides</Text>
              {/* <View style= {styles.line}/>  */}
              {reservations.map(reservation => (
                <View key={reservation.numRes} style={styles.recentRideCard}>
                  <Text>{reservation.pickupLocation}</Text>
                  <Text>{reservation.pickoffLocation}</Text>
                  <Text>{reservation.resDate}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </ScrollView>
      )}

    </View>
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
    paddingTop: 80
  },
  profileButton: {
    position: 'absolute',
    top: 35,
    right: 15,
    width: 55,
    height: 55,
    borderRadius: 35,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    zIndex: 10,


  },
  profilePic: {
    width: 65,
    height: 65,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#999'
  },
  bookTaxiButton: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#FFDC1C',
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 8,
    margin: 35,
    elevation: 10,
    borderWidth: 1,
    borderColor: '#FFDC1C'
  },
  buttonText: {
    color: '#181818',
    fontSize: 17,
    paddingTop: 10,
    fontWeight: 'bold',
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#FFDC1C',
    marginBottom: 10,
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

export default Home;

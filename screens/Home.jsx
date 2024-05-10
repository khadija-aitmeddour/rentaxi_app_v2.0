import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Platform, Image } from 'react-native';


const HomeScreen = ({ navigation, route }) => {
  
  const { user } = route.params;
  const { username, photo } = user;


  const recentRides = [
    { id: 1, destination: 'Airport', date: 'May 1, 2024' },
    { id: 2, destination: 'Downtown', date: 'April 28, 2024' },
    { id: 3, destination: 'Shopping Mall', date: 'April 25, 2024' },
    { id: 4, destination: 'Shopping Mall', date: 'April 25, 2024' },
    { id: 5, destination: 'Shopping Mall', date: 'April 25, 2024' },
    { id: 6, destination: 'Shopping Mall', date: 'April 25, 2024' },
  ];

 
  return (
    <View contentContainerStyle={styles.container}>
       <ScrollView>
       <TouchableOpacity
        style={styles.profileButton}
        onPress={() => navigation.navigate('My Profile', {user})}
      >
        <Image 
        source={{ uri: photo}} 
        style={styles.profilePic}
        resizeMode="cover"
        />
      
      </TouchableOpacity>
      <View style={{alignItems:'center', backgroundColor: '#FFDC1C', height: 300}}>
        
        <Text style={styles.welcomeMessage}>Hey {username}! </Text>
      
      <Text style={{fontFamily: 'monospace'}}>Wanna go somewhere? Let's go!</Text>
      <TouchableOpacity
        style={styles.bookTaxiButton}
        onPress={() => navigation.navigate('Book Taxi')}
      >
        <Image source={require('../images/taxiIcon2.png')}/>
        <Text style={styles.buttonText}>RenTaxi Now !</Text>
      </TouchableOpacity>
      </View>
      <View style={{alignItems: 'flex-start', padding: 20, paddingTop: 30, backgroundColor: "#fff"}}>
      <ScrollView>
        <Text style={styles.recentRidesTitle}>Recent Rides</Text>
       {/* <View style= {styles.line}/>  */}
        {recentRides.map(ride => (
          <View key={ride.id} style={styles.recentRideCard}>
            <Text>{ride.destination}</Text>
            <Text>{ride.date}</Text>
          </View>
        ))}
      </ScrollView>
      </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
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
    right: 18,
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
    borderColor:'#121212'
  },
  bookTaxiButton: {
    justifyContent:'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#FFDC1C',
    paddingHorizontal: 25,
    paddingVertical:10,
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
    marginTop:10,
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

export default HomeScreen;

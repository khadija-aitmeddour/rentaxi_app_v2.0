import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const UserProfileScreen = () => {
  const [user, setUser] = useState(null)
 
  const getUserData = async() => {
      const endpoint = "http://192.168.43.196:3000/users";
  
      fetch(endpoint)
      .then(response => response.json())
      .then(data => {
         setUser(data);
       });

    }
  useEffect(() => {
    getUserData();
  }, []);

  return (
   
    <View style={styles.container}>
       {user && (
       <>
      <Image source={{ uri: user.photo}} 
      style={styles.profilePicture}
      resizeMode="cover"/>
      <Text style={styles.name}>{user.username}</Text>
      <Text style={styles.email}>{user.phone}</Text>
    
    </>
  )}
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  profilePicture: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  email: {
    fontSize: 18,
  },
});

export default UserProfileScreen;

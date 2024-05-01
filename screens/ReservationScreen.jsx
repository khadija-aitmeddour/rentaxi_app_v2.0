import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState} from 'react'
import MapboxGL from '@rnmapbox/maps'
import { useNavigation } from '@react-navigation/native'
//import Geolocation from '@react-native-community/geolocation'

const ReservationScreen = () => {
  
  const navigation = useNavigation();
  return (
    <View style={{flex: 1}}>
        <MapboxGL.MapView 
        style={{flex: 1}} 
        styleURL={MapboxGL.StyleURL.Street}
        >
          <MapboxGL.Camera
            zoomLevel={8}
            centerCoordinate={[4.7181, 36.0769]}
            animationMode="flyTo"
            animationDuration={2000}
          />
        
          <MapboxGL.PointAnnotation
            id="userLocation"
            coordinate={[5, 36.0769]}
            title="Your location"
          /> 
        </MapboxGL.MapView>
        
        
        <View style={styles.panel}>
        <Text style={styles.panelText}>Lost? Let's find your way!</Text>
        <Text style={{paddingLeft:10, color: "#333"}}>Click below to choose your destination 🗺️</Text>
        <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate('Location')}}>
          <Text style={styles.buttonText}>Destination</Text>
          <Image
            source={require('../arrow.png')}
          />
        </TouchableOpacity>
      </View>
      
    </View>
);
  
}

export default ReservationScreen;


const styles = StyleSheet.create({
  panel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 180,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: 'center',
   
    elevation: 5, // add shadow 
    padding: 18,
  },
  panelText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 3,
    paddingLeft: 10,
    fontWeight: 'bold',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 10,
    paddingLeft: 20,
    paddingRight: 10,
    borderRadius: 50,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#000',
    marginTop: 15,
  },
  buttonText: {
    fontSize: 18,
    color: '#333',
  },
  
});
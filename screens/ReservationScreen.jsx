import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState} from 'react'
import MapboxGL from '@rnmapbox/maps'
import { useNavigation } from '@react-navigation/native'
import Geolocation from '@react-native-community/geolocation'
import { MAPBOX_ACCESS_TOKEN } from '../mapboxConfig'

const ReservationScreen = () => {
  
  const navigation = useNavigation();
  const [userPosition, setuserPosition] = useState(null);
  const [userPositionName, setUserPositionName] = useState('');
  
  const getuserPosition = () => {
      Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setuserPosition([longitude, latitude]);
      },
      error => console.error(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };
  useEffect(() => {
     getuserPosition();
  }, [userPosition]);
  
  
  const getPlaceName = async (position) => {
    const apiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${position[0]},${position[1]}
    .json?access_token=${MAPBOX_ACCESS_TOKEN}`;
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (response.ok) {
        setUserPositionName(data.features[0].place_name);
        console.log(userPositionName)
      } else {
        return 'Place not found';
      }
    } catch (error) {
      console.error('Error fetching place name:', error.message);
      return null;
    }
  }
  useEffect(() => {
    getPlaceName(userPosition)
  },[]);

  return (
    <View style={{flex: 1}}>
        <MapboxGL.MapView 
        style={{flex: 1}} 
        styleURL={MapboxGL.StyleURL.Street}
        >
          <MapboxGL.Camera
            zoomLevel={8}
            centerCoordinate={userPosition}
            animationMode="flyTo"
            animationDuration={2000}
          />
        
          <MapboxGL.PointAnnotation
            id="userPosition"
            coordinate={userPosition}
            title="Your location"
          /> 
        </MapboxGL.MapView>
        
        
        <View style={styles.panel}>
        <Text style={styles.panelText}>Lost? Let's find your way!</Text>
        <Text style={{paddingLeft:10, color: "#333"}}>Click below to choose your destination 🗺️</Text>
        <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate('Location', {userPositionName})}}>
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
    fontSize: 17,
    color: '#333',
  },
  
});
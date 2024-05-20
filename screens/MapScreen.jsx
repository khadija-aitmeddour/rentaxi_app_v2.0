import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import MapboxGL from '@rnmapbox/maps'
import { MAPBOX_ACCESS_TOKEN } from '../mapboxConfig';
import { useNavigation } from '@react-navigation/native';
import { sendPushNotification, registerForPushNotificationsAsync } from '../hooks/usePushNotifications';
import { UserContext } from '../context/UserContext';

MapboxGL.setAccessToken(MAPBOX_ACCESS_TOKEN);

const MapScreen = ({ route }) => {
  
  const {user, setUser} = useContext(UserContext);
  const [username, setUsername] = useState(user.username);
  const [photo, setPhoto] = useState(user.photo);
  
  useEffect(() => {
    setUsername(user.username);
    setPhoto(user.photo);
  }, [user]);

  const navigation = useNavigation();
  const [priceClassic, setPriceClassic] = useState(0);
  const [priceVIP, setPriceVIP] = useState(0);
  const [selectedTaxiType, setselectedTaxiType] = useState('');
  const [price, setPrice] = useState(0);
  const { myPosition, destination, positionCoords, destinationCoords, myRoute } = route.params;

  const distance = myRoute ? parseFloat(myRoute.distance / 1000).toFixed(0) : 0; //get the distance if the route is not null, transform to km and round it 
  useEffect(() => {
    setPriceClassic(distance * 40);
    setPriceVIP(distance * 60);
  });
  useEffect(() => {
    selectedTaxiType == 'Classic' ? setPrice(priceClassic) : setPrice(priceVIP);
  }, [selectedTaxiType]);
  
  
  return (
    <View style={{ flex: 1 }}>
      <MapboxGL.MapView
        style={{ flex: 1 }}
        styleURL={MapboxGL.StyleURL.Street}
      >
        <MapboxGL.Camera
          zoomLevel={8}
          centerCoordinate={positionCoords}
          animationMode="flyTo"
          animationDuration={2000}
        />

        {positionCoords && (
          <MapboxGL.PointAnnotation
            id="userLocation"
            coordinate={positionCoords}
            title="Your location"
          />
        )}
        {destinationCoords && (
          <MapboxGL.PointAnnotation
            id="userLocation"
            coordinate={destinationCoords}
            title="Your destination"
          />
        )}
        {!positionCoords && !destinationCoords && (
          <MapboxGL.PointAnnotation
            id="default"
            coordinate={[0, 0]}
            title="you need a ship here"
          />
        )}

        {myRoute && (
          <MapboxGL.ShapeSource id="routeSource" shape={{ type: 'LineString', coordinates: myRoute.geometry.coordinates }}>
            <MapboxGL.LineLayer id="routeFill" style={{ lineColor: '#3d85c6', lineWidth: 5 }} />
          </MapboxGL.ShapeSource>
        )}
      </MapboxGL.MapView>
      <View style={styles.panel}>
        <Text style={styles.panelText}>Choose your Ride</Text>
        <TouchableOpacity style={[styles.button, selectedTaxiType == 'Classic' && styles.selectedButton]} onPress={() => {setselectedTaxiType('Classic')}}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={require('../images/classic.png')}
            />
            <Text style={styles.buttonText}>Classic</Text>
          </View>
          <Text style={{fontWeight: 'bold'}}>{priceClassic} DZD</Text>

        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, selectedTaxiType == 'Comfort' && styles.selectedButton]} onPress={() => {setselectedTaxiType('Comfort')}}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={require('../images/comfort.png')}
            />
            <Text style={styles.buttonText}>Comfort</Text>
          </View>
          <Text style={{fontWeight: 'bold'}}>{priceVIP} DZD</Text>
        </TouchableOpacity>
      </View>

      <View style={{ padding: 20 }}>

          <TouchableOpacity
            style={styles.requestBtn}
            onPress={async() => {
              
              await sendPushNotification("ExponentPushToken[AiVPGZIfxan_hVyqs3Y6xd]", 'Ride Request!', 'A new ride request has been made!', {username, photo, myPosition, destination, distance, price });
              navigation.navigate('Request', { selectedTaxiType, myPosition, destination, price, distance, username, photo});
            }
              }>
            <Text style={styles.buttonText}>Request Now</Text>
          </TouchableOpacity>
        </View>
    </View>
  );

}

export default MapScreen;

const styles = StyleSheet.create({
  panel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 250,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',

    elevation: 5, // add shadow 
    padding: 18,
  },
  panelText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
    paddingLeft: 10,
    fontWeight: 'bold',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 10,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFDF',
    borderColor: '#000',
    marginTop: 8,
    height: 50,
  },
  selectedButton: {
    backgroundColor: '#cfe2f3'
  },
  buttonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
    paddingStart: 15,
  },
  requestBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 0,
    backgroundColor: '#FFDC1C',
  


    marginTop: 15,
  },
});
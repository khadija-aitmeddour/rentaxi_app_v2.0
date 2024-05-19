import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import MapboxGL from '@rnmapbox/maps'
import { MAPBOX_ACCESS_TOKEN } from '../mapboxConfig';
import { useNavigation } from '@react-navigation/native';
import { sendPushNotification, registerForPushNotificationsAsync } from '../hooks/usePushNotifications';
import * as Notifications from 'expo-notifications';

MapboxGL.setAccessToken(MAPBOX_ACCESS_TOKEN);

const MapScreen = ({ route }) => {
  
  const navigation = useNavigation();
  const [price, setPrice] = useState(0);
  const [priceVIP, setPriceVIP] = useState(0);
  const [selectedTaxiType, setselectedTaxiType] = useState('');
  const [expoPushToken, setExpoPushToken] = useState('ExponentPushToken[VhhgZ8IrAoduMGLjc9NGxQ]');
  const [notification, setNotification] = useState(undefined);
  const notificationListener = useRef();
  const responseListener = useRef();
  const { myPosition, destination, positionCoords, destinationCoords, myRoute } = route.params;

  const distance = myRoute ? parseFloat(myRoute.distance / 1000).toFixed(0) : 0; //get the distance if the route is not null, transform to km and round it 
  useEffect(() => {
    setPrice(distance * 40);
    setPriceVIP(distance * 60);
  });

  //handle notifications
  useEffect(() => {
    registerForPushNotificationsAsync()
      .then(token => setExpoPushToken(token || ''))
      .catch(error => setExpoPushToken(error.message));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const sendNotification = async() =>{
    
    await sendPushNotification(expoPushToken, 'Ride Request!', 'A new ride request has been made!', { selectedTaxiType, myPosition, destination, price, priceVIP });
    navigation.navigate('Request', { selectedTaxiType, myPosition, destination, price, priceVIP});
  }

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
          <Text style={{fontWeight: 'bold'}}>{price} DZD</Text>

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
            onPress={sendNotification}>
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
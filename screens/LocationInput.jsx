import React, { useState, useEffect } from 'react';
import { View, Keyboard, TextInput, StyleSheet, FlatList, Image, TouchableOpacity, Text, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MAPBOX_ACCESS_TOKEN } from '../mapboxConfig';
import Geolocation from '@react-native-community/geolocation';
import { calculateDistance } from '../components/common_functions';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
const LocationInput = () => {

  const [myPosition, setMyPosition] = useState('');
  const [destination, setDestination] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(0);
  const [positionCoords, setPositionCoords] = useState(null);
  const [destinationCoords, setDestinationCoords] = useState(null);
  const [distance, setDistance] = useState(0);
  const [myRoute, setMyRoute] = useState(null);
  const navigation = useNavigation();

  //get the user location but i wont be using this for now since the position is wrong in the emulator :) 
  const getuserPosition = () => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setPositionCoords([longitude, latitude]);
      },
      error => console.error(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };
 
  //this function gets the place name from the coordinates of the place
  const getPlaceName = async (position) => {
    if(position){
    const apiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${position[0]},${position[1]}
    .json?access_token=${MAPBOX_ACCESS_TOKEN}`;
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (response.ok) {
        setMyPosition(data.features[0].place_name);

      } else {
        return 'Place not found';
      }
    } catch (error) {
      console.error('Error fetching place name:', error.message);
      return null;
    }
  }}

  const handleMyPositionChange = async (text) => {
    setMyPosition(text);
    setPositionCoords(null);
    if (text.length > 0) {
      try {
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(text)}
          .json?limit=5&access_token=${encodeURIComponent(MAPBOX_ACCESS_TOKEN)}`
        );
        const data = await response.json();
        if (data.features) {
          setSuggestions(data.features);
          setShowSuggestions(1)
        }
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    }

  }
  const handleDestinationChange = async (text) => {
    setDestination(text);
    setDestinationCoords(null);
    if (text.length > 0) {
      try {
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(text)}
          .json?limit=5&access_token=${encodeURIComponent(MAPBOX_ACCESS_TOKEN)}`
        );
        const data = await response.json();
        if (data.features) {
          setSuggestions(data.features);
          setShowSuggestions(2)
        }
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    }

  };

  //set the coordinates when the user click on a suggestion
  const handleLocation = (item) => {
    if (showSuggestions == 1) {
      setPositionCoords([item.center[0], item.center[1]]);
      setMyPosition(item.place_name)
    }
    else if (showSuggestions == 2) {
      setDestinationCoords([item.center[0], item.center[1]]);
      setDestination(item.place_name)
    }
    setShowSuggestions(0);

  };

  const handleOutsidePress = () => {
    setShowSuggestions(0);
  };

  useEffect(() => {
    console.log('My Position:', myPosition, '   ', positionCoords);
    console.log('Destination:', destination, '   ', destinationCoords);
    if (positionCoords && destinationCoords){
      calculateDistance(positionCoords, destinationCoords)
      .then((dist) =>
      {
        const {distance, route} = dist
        setMyRoute(route);
        setDistance(distance);
      })
      
    }
  }, [positionCoords, destinationCoords]);


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
       <View style={styles.container}>
        <View style={styles.inputFields}>
          <Text style={styles.label}>Set your location:</Text>
          <TextInput
            style={styles.input}
            placeholder="My location"
            value={myPosition}
            onChangeText={handleMyPositionChange}

          />
          {myPosition && suggestions.length > 0 && showSuggestions == 1 && (
            <FlatList
              data={suggestions}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => { handleLocation(item) }}>
                  <Text style={{ padding: 10, margin: 5, marginTop: 0 }}>{item.place_name}</Text>
                </TouchableOpacity>
              )
              }
              keyExtractor={(item) => item.id}
            />
          )}
          <Text style={styles.label}>Choose your destination: </Text>
          <TextInput
            style={styles.input}
            placeholder="Destination"
            value={destination}
            onChangeText={handleDestinationChange}
          />
          {destination && suggestions.length > 0 && showSuggestions == 2 && (
            <FlatList
              data={suggestions}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => { handleLocation(item) }}>
                  <Text style={{ padding: 10, margin: 5, marginTop: 0 }}>{item.place_name}</Text>
                </TouchableOpacity>
              )
              }
              keyExtractor={(item) => item.id}
            />
          )}
          <TouchableOpacity style={styles.link} onPress={
            async() => {
              await getuserPosition();
              getPlaceName(positionCoords);
              }}>
            <Image
              source={require('../images/myPosition.png')}
            />
            <Text style={styles.linkText}>Use My Current Location</Text>
          </TouchableOpacity>

        </View>

        <View style={{ padding: 20 }}>

          <TouchableOpacity
            style={styles.button}
            onPress={() => { (myPosition && destination) ? navigation.navigate('Map', { myPosition, destination, positionCoords, destinationCoords, myRoute }) : console.log('error : empty field') }}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>

      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({

  container: {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',

    backgroundColor: '#fff',
    paddingBottom: 30,

  },
  inputFields: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    padding: 20,


  },
  label: {
    padding: 5,
    fontWeight: 'bold',
    marginTop: 15,
  },
  input: {
    height: 45,
    width: '100%',
    borderColor: '#121212',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  link: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 15,
  },
  linkText: {
    color: '#121212',
    paddingStart: 10,

  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 10,
    paddingLeft: 20,
    paddingRight: 10,
    borderRadius: 10,
    borderWidth: 0,
    backgroundColor: '#FFDC1C',


    marginTop: 15,
  },
  buttonText: {
    fontSize: 17,
    color: '#121212',
    fontWeight: 'bold',
  },
});

export default LocationInput;

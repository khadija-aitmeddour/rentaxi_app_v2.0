import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, FlatList , TouchableOpacity, Text, TouchableWithoutFeedback} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const access_token = 'pk.eyJ1Ijoia2FkYWl0bSIsImEiOiJjbHZnOWo3NHowNGRjMnFueTZqeWp3bXAwIn0.ZzAnPbGro7A3mF4o6Vphqw';

const LocationInput = () => {
  const [myPosition, setMyPosition] = useState('');
  const [destination, setDestination] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(0);
  const [positionCoords, setPositionCoords] = useState(null);
  const [destinationCoords, setDestinationCoords] = useState(null);
  const [distance, setDistance] = useState(0);
  const navigation = useNavigation();
  
  const handleMyPositionChange = async (text) => {
    setMyPosition(text);
    setPositionCoords(null);
    if (text.length > 0){ 
      try {
        // Fetch location suggestions from Mapbox Geocoding API
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(text)}
          .json?limit=5&access_token=${encodeURIComponent(access_token)}`
        );
        const data = await response.json(); 
        if (data.features) {
          setSuggestions(data.features);
          setShowSuggestions(1)
        }
       } catch (error) {
         console.error('Error fetching suggestions:', error); // Log error if fetching fails
       }
  
     }
     
  } 

  const handleDestinationChange = async (text) => {
    setDestination(text);
    setDestinationCoords(null);
    if (text.length > 0){ 
      try {
        // Fetch location suggestions from Mapbox Geocoding API
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(text)}
          .json?limit=5&access_token=${encodeURIComponent(access_token)}`
        );
        const data = await response.json(); 
        if (data.features) {
          setSuggestions(data.features);
          setShowSuggestions(2)
        }
       } catch (error) {
         console.error('Error fetching suggestions:', error); // Log error if fetching fails
       }
  
     }
     
  };
  //set the coordinates when the user click on a suggestion
  const handleLocation = (item) =>{
    if(showSuggestions == 1){
      setPositionCoords([item.center[0], item.center[1]]);
      setMyPosition(item.place_name)
    }
    else if (showSuggestions == 2){
      setDestinationCoords([item.center[0], item.center[1]]);
      setDestination(item.place_name)
    }
    setShowSuggestions(0);
    
    
  };
  const handleOutsidePress = () => {
    setShowSuggestions(0);
  };


  const calculateDistance = async (origin, destination) => {
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${encodeURIComponent(origin[0])},${encodeURIComponent(origin[1])};${encodeURIComponent(destination[0])},${encodeURIComponent(destination[1])}
    ?steps=true&geometries=geojson&access_token=${encodeURIComponent(access_token)}`;
   
      try{
        const response = await fetch(url);
        const data = await response.json();
        if(response.ok){
          const distance = parseFloat( (data.routes[0].distance) / 1000 ).toFixed(2);
          
          setDistance(distance);
          console.log('this is the distance i get from inside the function',distance)
        }
        else{
          console.error('Error:', data.message);
          return null;
        }
      }catch (err){
        console.error('Exception:', err);
        return null;
      }

  
}
  const handleSearch = async () => {
    // Handle search functionality here
    setShowSuggestions(0);
    console.log('My Position:', myPosition, '   ', positionCoords);
    console.log('Destination:', destination, '   ',  destinationCoords);

    await calculateDistance(positionCoords, destinationCoords);
   
    navigation.navigate('Map', {positionCoords, destinationCoords});
  };
//useEffect multiple triggers 

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="My Position"
        value={myPosition}
        onChangeText={handleMyPositionChange}
        
      />
      {myPosition && suggestions.length >0 && showSuggestions == 1 &&  (
         <FlatList
         data={suggestions}
         renderItem={({item}) => (
             <TouchableOpacity onPress={() => {handleLocation(item)}}>
                 <Text style={{ padding: 10, margin: 5, marginTop:0 }}>{item.place_name}</Text>
             </TouchableOpacity>
         )
         }
         keyExtractor={(item) => item.id}
         style={{marginX: 5, maxHeight: 200}}
         
         
        />
       )}
      <TextInput
        style={styles.input}
        placeholder="Destination"
        value={destination}
        onChangeText={handleDestinationChange}
      />
       {destination && suggestions.length > 0 && showSuggestions == 2  && (
         <FlatList
         data={suggestions}
         renderItem={({item}) => (
             <TouchableOpacity onPress={() => {handleLocation(item)}}>
                 <Text style={{ padding: 10, margin: 5, marginTop:0 }}>{item.place_name}</Text>
             </TouchableOpacity>
         )
         }
         keyExtractor={(item) => item.id}
         style={{marginX: 5, maxHeight: 200}}
        />
       )}
      <Button title="Search" onPress={handleSearch} />

      <Text>{distance} km</Text>
    </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default LocationInput;

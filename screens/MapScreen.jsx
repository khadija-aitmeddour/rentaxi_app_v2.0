import { View, Text } from 'react-native'
import React, { useEffect, useState} from 'react'
import MapboxGL from '@rnmapbox/maps'


const MapScreen = ({route}) => {
  
  
  const {positionCoords, destinationCoords, myRoute} = route.params;
  const [destinationPointer, setDestinationPointer] = useState(destinationCoords);
  
  const handleMapPress = (event) => {
    setDestinationPointer(event.geometry.coordinates);
};
  const distance = myRoute ? parseFloat( myRoute.distance / 1000 ).toFixed(0) : 0; //get the distance if the route is not null, transform to km and round it 
  
  

  return (
    <View style={{flex: 1}}>
        <Text
        style={{height:20}}>{distance}</Text>
        <MapboxGL.MapView 
        style={{flex: 1}} 
        styleURL={MapboxGL.StyleURL.Street}
        onPress={handleMapPress} 
        >
          <MapboxGL.Camera
            zoomLevel={10}
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
          {destinationPointer && (
          <MapboxGL.PointAnnotation
            id="userLocation"
            coordinate={destinationPointer}
            title="Your destination"
          /> 
        )} 
        {!positionCoords && !destinationCoords && (
          <MapboxGL.PointAnnotation
          id="default"
          coordinate={[0,0]}
          title="you need a ship here"
        />
        )}
        {/* puts marker on map when clicked */}
        {/* {clickedCoords && (
        <MapboxGL.PointAnnotation
          id='selected'
          coordinate={clickedCoords}
        />
      )} */}
         {myRoute && (
        <MapboxGL.ShapeSource id="routeSource" shape={{ type: 'LineString', coordinates: myRoute.geometry.coordinates }}>
          <MapboxGL.LineLayer id="routeFill" style={{ lineColor: '#3d85c6', lineWidth: 5 }} />
        </MapboxGL.ShapeSource>
        )}
        </MapboxGL.MapView>
      
    </View>
);
  
}

export default MapScreen;
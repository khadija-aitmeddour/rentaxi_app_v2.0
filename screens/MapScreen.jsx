import { View, Text } from 'react-native'
import React, { useEffect, useState} from 'react'
import MapboxGL from '@rnmapbox/maps'

MapboxGL.setAccessToken('pk.eyJ1Ijoia2FkYWl0bSIsImEiOiJjbHZnOWo3NHowNGRjMnFueTZqeWp3bXAwIn0.ZzAnPbGro7A3mF4o6Vphqw');

const MapScreen = ({route}) => {
  const {positionCoords, destinationCoords} = route.params;
  
  return (
    <View style={{flex: 1}}>
      
        <MapboxGL.MapView style={{flex: 1}} styleURL={MapboxGL.StyleURL.Street}>
          <MapboxGL.Camera
            zoomLevel={5}
            centerCoordinate={positionCoords}
            animationMode="flyTo"
            animationDuration={2000}
          />

          <MapboxGL.PointAnnotation
            id="userLocation"
            coordinate={positionCoords}
            title="Your location"
          />
          <MapboxGL.PointAnnotation
            id="userLocation"
            coordinate={destinationCoords}
            title="Your location"
          />
        </MapboxGL.MapView>
      
    </View>
);
  
}

export default MapScreen;
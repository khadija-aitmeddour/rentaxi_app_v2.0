import { MAPBOX_ACCESS_TOKEN } from '../mapboxConfig';


export const calculateDistance = async (origin, destination) => {
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${encodeURIComponent(origin[0])},${encodeURIComponent(origin[1])};${encodeURIComponent(destination[0])},${encodeURIComponent(destination[1])}
    ?steps=true&geometries=geojson&access_token=${encodeURIComponent(MAPBOX_ACCESS_TOKEN)}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
          const distance =  parseFloat((data.routes[0].distance) / 1000).toFixed(2);
          const route = data.routes[0];
        return {distance, route};
      }
      else {
        console.error('Error:', data.message);
        return null;
      }
    } catch (err) {
      console.error('Exception:', err);
      return null;
    }
  }


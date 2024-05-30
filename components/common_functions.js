import { MAPBOX_ACCESS_TOKEN } from '../mapboxConfig';
import DocumentPicker from 'react-native-document-picker';

export const calculateDistance = async (origin, destination) => {
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${encodeURIComponent(origin[0])},${encodeURIComponent(origin[1])};${encodeURIComponent(destination[0])},${encodeURIComponent(destination[1])}
    ?steps=true&geometries=geojson&access_token=${encodeURIComponent(MAPBOX_ACCESS_TOKEN)}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
          const distance =  parseFloat((data.routes[0].distance) / 1000).toFixed(0);
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


  

  export const pickPdf = async () => {
    try {
        const res = await DocumentPicker.pick({
            type: [DocumentPicker.types.pdf],
        });

        const uri = res[0].uri;
        console.log('URI of the picked PDF:', res[0].uri);
        return uri;

    } catch (err) {
        if (DocumentPicker.isCancel(err)) {
            console.log('PDF picking cancelled');
        } else {
            console.error('Error picking PDF:', err);
        }
    }
};


export const pickImage = async () => {
    try {
        const res = await DocumentPicker.pick({
            type: [DocumentPicker.types.images],
        });
        console.log('URI of the picked image:', res);
        const uri = res[0].uri;
        return uri
    } catch (err) {
        if (DocumentPicker.isCancel(err)) {
            console.log('Image picking cancelled');
        } else {
            console.error('Error picking image:', err);
        }
    }
};

export async function isRegistered(uid) {
    console.log(uid)
    const endpoint = `http://192.168.0.119:3000/users/${uid}`

    const response = await fetch(endpoint)
    if (response.ok) {
      const size = response._bodyInit._data.size;
      return { size };
    } else {
      return 0;
    }
  }
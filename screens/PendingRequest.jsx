import { View, Text, TouchableOpacity, TouchableWithoutFeedback, Modal, ActivityIndicator, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';

const PendingRequest = ({route}) => {
    const {selectedTaxiType, myPosition, destination, price, priceVIP} = route.params;
    const [loadVisible, setLoadVisible] = useState(true);
    const navigation = useNavigation();
  return (
        <Modal
          visible={loadVisible}
          animationType="slide"
          transparent={true}
        >
        
          <View style={styles.container}>
            <View style={styles.panel}>
              <Text style={styles.panelText}>Contacting the nearest driver</Text>
              <Text style={styles.panelText}>Please wait...</Text>
              <ActivityIndicator size="large" color="#FFDC1C" />
              <Text  style={{paddingTop: 10}}>{myPosition}</Text>
              <Text>{destination}</Text>
              <Text  style={{fontWeight: 'bold'}}>{selectedTaxiType}</Text>
              <Text style={{fontWeight: 'bold', color: "#1bd719", padding: 10}}>{selectedTaxiType == 'Classic' ? price : priceVIP} DZD</Text>
              <TouchableOpacity style={styles.cancelButton}>
                <Text style={styles.cancelButtonText} onPress={() => {navigation.navigate('Location')}}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      );
    };
    export default PendingRequest; 

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
      },
      panel: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        width: 300,
        height: 350,
      },
      panelText: {
        paddingTop: 5,
        fontSize: 18,
      },
      cancelButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        paddingVertical: 10,
        marginTop: 50,
        paddingHorizontal: 20,
        paddingRight: 10,
        borderRadius: 10,
        borderWidth: 0,
        backgroundColor: '#FFDC1C',
    
      },
      cancelButtonText: {
        color: '#121212',
        fontSize: 16,
        fontWeight: 'bold',
      },
    });

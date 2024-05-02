import { View, Text, TouchableOpacity, TouchableWithoutFeedback, Modal, ActivityIndicator, StyleSheet } from 'react-native'
import React, { useState } from 'react'

const PendingRequest = ({route}) => {
    const {selectedTaxiType, myPosition, destination, price, priceVIP} = route.params;
    const [loadVisible, setLoadVisible] = useState(true);
  return (
        <Modal
          visible={loadVisible}
          animationType="slide"
          transparent={true}
        >
        <TouchableWithoutFeedback onPress={() => {setLoadVisible(false)}}>
          <View style={styles.container}>
            <View style={styles.panel}>
              <Text style={styles.panelText}>Searching for a driver...</Text>
              <ActivityIndicator size="large" color="#FFDC1C" />
              <Text  style={{paddingTop: 10}}>{myPosition}</Text>
              <Text>{destination}</Text>
              <Text  style={{fontWeight: 'bold'}}>{selectedTaxiType}</Text>
              <Text style={{fontWeight: 'bold', color: "#1bd719", padding: 10}}>{selectedTaxiType == 'Classic' ? price : priceVIP} DZD</Text>
              <TouchableOpacity style={styles.cancelButton}>
                <Text style={styles.cancelButtonText} onPress={() => {setLoadVisible(false)}}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
          </TouchableWithoutFeedback>
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
        height: 300,
      },
      panelText: {
        marginBottom: 20,
        paddingTop: 5,
        fontSize: 18,
      },
      cancelButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        paddingVertical: 10,
        marginTop: 20,
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

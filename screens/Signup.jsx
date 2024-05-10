import { View, Text, StyleSheet, TextInput, Image,TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'





const Signup = () => {
  
  const navigation = useNavigation();


  return (
    <View style={styles.container}>
        <Image
              source={require('../images/topCover.png')}
              style={{height: 370, width: 360}}
            />
        
        <View style={styles.inputFields}>
          
          <Text style={styles.label}>Phone Number </Text>
          <TextInput
            style={styles.input}
            placeholder=" 🇩🇿 +213"
         
          />
        

          <TouchableOpacity
            style={styles.button}
            onPress={() => {navigation.navigate('HomePage')}}
           >
            <Text style={styles.buttonText}>Log in</Text>
          </TouchableOpacity>

          
        </View>
    </View>
  )
}

export default Signup

const styles = StyleSheet.create({

    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      backgroundColor: '#fff',
      paddingBottom: 30
      
  
    },
    inputFields: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'flex-start',
      backgroundColor: '#fff',
      padding: 30,
  
  
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
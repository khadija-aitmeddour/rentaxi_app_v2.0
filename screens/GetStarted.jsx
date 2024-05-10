import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'




const GetStarted = () => {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <Image
        source={require('../images/topCover3.png')}
        style={{ height: 420, width: 360 }}
      />

      <View style={styles.inputFields}>

        <TouchableOpacity
          style={styles.button}
          onPress={() => { navigation.navigate('LoginScreen') }}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
            style={[styles.button, {backgroundColor: 'black'}]}
            onPress={() => {navigation.navigate('SignInTypeScreen')}}
           >
            <Text style={[styles.buttonText, {color: "white"}]}>Login</Text>
          </TouchableOpacity> */}


      </View>
    </View>
  )
}

export default GetStarted

const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingBottom: 5,
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
    borderRadius: 15,
    borderWidth: 0,
    backgroundColor: '#FFDC1C',
    height: 50,
    marginVertical: 5

  },
  buttonText: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
});
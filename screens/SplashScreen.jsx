import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    
    const timer = setTimeout(() => {
      navigation.replace('GetStarted'); 
    }, 4000); 

    return () => clearTimeout(timer); 
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../images/splash.png')} 
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'FFDC1C', 
  },
  logo: {
    width: '100%',
    height: '120%',
  },
});

export default SplashScreen;

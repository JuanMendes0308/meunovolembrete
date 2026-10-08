import { View, Image, StyleSheet, Text } from 'react-native';
import { router } from 'expo-router';
import { Button } from '../../components/button/button';

export default function RootLayout() {

  function navigate() {
    router.replace('/list');
  }

  return (
    <View style={styles.container}>

      <Image
        source={require('../assets/logoRemindMe.png')}
        style={styles.logo}
        resizeMode="cover"
      />

      <Text style={styles.textName}>
        RemindMe App - 2026 ©
      </Text>

      <Text style={styles.textDev}>
        by DocArley
      </Text>

      <Button
        title="Entrar"
        function={navigate}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0EBEE',
  },

  logo: {
    height: 150,
    width: 150,
    marginBottom: 20,
  },

  textName: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  textDev: {
    fontSize: 12,
    marginBottom: 25,
  },
});
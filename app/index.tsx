import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { useRouter } from "expo-router";
 
export default function Page() {
  const router = useRouter();
 
  return (
    <View style={styles.container}>
      <View style={styles.centerContent}>
        <Image
          source={require("../assets/lembrete.png")}
          style={styles.logo}
        />
       
        <View style={styles.textContainer}>
          <Text style={styles.title}>Bem Vindo</Text>
          <Text style={styles.subtitle}>APP LEMBRETES</Text>
        </View>
      </View>
 
      <Pressable
  style={styles.button}
  onPress={() => router.replace("/list")}
>
  <Text style={styles.buttonText}>ENTER</Text>
</Pressable>
 
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 60,
    backgroundColor: "#ffffff",
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 180,
    height: 180,
    resizeMode: "contain",
    marginBottom: 40,
  },
  textContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
  },
  button: {
    backgroundColor: "#ff6b21",
    paddingVertical: 14,
    paddingHorizontal: 60,
    borderRadius: 30,
    width: "80%",
    maxWidth: 300,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
 
 
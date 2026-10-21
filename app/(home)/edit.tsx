 
import { StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
 
export default function EditScreen() {
  const { id } = useLocalSearchParams();
 
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Editando o lembrete ID: {id}</Text>
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 18 },
});
 
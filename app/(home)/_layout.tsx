import { Tabs } from "expo-router";
import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
 
export default function Tablayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
     
      <Tabs.Screen
        name="add"
        options={{
          title: "Adicionar",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="plus-square" size={24} color="black" />
          ),
        }}
      />
 
     
      <Tabs.Screen
        name="list"
        options={{
          title: "Lista",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="list-ul" size={24} color="black" />
          ),
        }}
      />
 
     
      <Tabs.Screen
        name="create"
        options={{ href: null }}
      />
      <Tabs.Screen
        name="edit"
        options={{ href: null }}
      />
    </Tabs>
  );
}
 
 
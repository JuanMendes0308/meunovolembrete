import { Tabs } from "expo-router";
import { View, StyleSheet } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

// Navegação inferior do layout: início (casinha) e lista (prancheta), ambos em círculo preto
function Bolinha({ focused, children }: { focused: boolean; children: React.ReactNode }) {
    return <View style={[styles.bolinha, !focused && styles.inativa]}>{children}</View>;
}

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: styles.tabBar,
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Bolinha focused={focused}>
                            <Ionicons name="home" size={30} color="#fff" />
                        </Bolinha>
                    ),
                }}
            />
            <Tabs.Screen
                name="list"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Bolinha focused={focused}>
                            <MaterialCommunityIcons name="clipboard-list-outline" size={32} color="#fff" />
                        </Bolinha>
                    ),
                }}
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    tabBar: { height: 84, backgroundColor: "#fff", borderTopWidth: 0, elevation: 0 },
    bolinha: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: "#000",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 8,
    },
    inativa: { opacity: 0.45 },
});

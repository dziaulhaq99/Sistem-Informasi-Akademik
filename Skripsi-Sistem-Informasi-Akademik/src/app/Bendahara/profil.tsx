
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ProfilScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Profil
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#012384",
    fontSize: 22,
    fontWeight: "bold",
  },
});

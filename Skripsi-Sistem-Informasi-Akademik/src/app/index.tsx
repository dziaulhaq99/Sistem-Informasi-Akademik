
import React from "react";
import { router } from "expo-router";
import { Alert } from "react-native";

import LoginScreen from "../screens/LoginScreen";

export default function Index() {
  const handleLogin = (userId: string) => {
    const id = userId.trim();

    console.log("ID yang diterima:", id);

    if (id === "1234567890") {
      console.log("Login Bendahara berhasil");

      // Navigasi ke Dashboard Bendahara
      router.replace("/Bendahara");

      return;
    }

    Alert.alert(
      "Login Gagal",
      "NISN atau NUPTK tidak ditemukan."
    );
  };

  return <LoginScreen onLogin={handleLogin} />;
}

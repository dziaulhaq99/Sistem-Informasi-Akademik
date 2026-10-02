
import React from "react";
import { router } from "expo-router";
import { Alert } from "react-native";
import LoginScreen from "../screens/LoginScreen";

export default function Index() {
  const handleLogin = (userId: string) => {
    // Membersihkan spasi dan karakter selain angka
    const id = userId.replace(/\D/g, "");

    console.log("ID login:", JSON.stringify(id));

    // Akun simulasi Bendahara
    if (id === "1234567890") {
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


import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  useWindowDimensions,
  Alert,
  ActivityIndicator,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

// ==================================
// WARNA
// ==================================

const COLORS = {
  primary: "#012384",
  secondary: "#FFFFFF",
  yellow: "#FFDF55",
  border: "#B8B8B8",
  placeholder: "#555555",
  icon: "#515A70",
};

// ==================================
// TIPE PROPS
// ==================================

interface LoginScreenProps {
  onLogin?: (userId: string) => void;
}

// ==================================
// HALAMAN LOGIN
// ==================================

export default function LoginScreen({
  onLogin,
}: LoginScreenProps) {
  const [userId, setUserId] = useState("");

  const { width, height } = useWindowDimensions();

  // Menggunakan font Poppins
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  // ==================================
  // FUNGSI LOGIN
  // ==================================

  const handleLogin = () => {
  const id = userId.trim();

  // Validasi input kosong
  if (id.length === 0) {
    Alert.alert(
      "Peringatan",
      "Silakan masukkan NISN atau NUPTK."
    );
    return;
  }

  // Menampilkan ID pada terminal
  console.log("Tombol Masuk ditekan:", id);

  // Memeriksa apakah fungsi login tersedia
  if (typeof onLogin === "function") {
    console.log("Mengirim ID ke halaman utama:", id);
    onLogin(id);
  } else {
    console.log("ERROR: onLogin tidak tersedia");

    Alert.alert(
      "Login Gagal",
      "Fungsi login belum terhubung."
    );
  }
};

  // ==================================
  // LOADING FONT
  // ==================================

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          size="large"
          color={COLORS.primary}
        />
      </View>
    );
  }

  // ==================================
  // TAMPILAN
  // ==================================

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <KeyboardAvoidingView
        style={styles.container}
        behavior={
          Platform.OS === "ios"
            ? "padding"
            : undefined
        }
      >
        <ScrollView
          style={styles.container}
          contentContainerStyle={[
            styles.scrollContent,
            {
              minHeight: height,
            },
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={false}
        >

          {/* =========================
              BACKGROUND SEKOLAH
          ========================= */}

          <ImageBackground
            source={require("../../assets/images/Background.png")}
            resizeMode="cover"
            style={[
              styles.hero,
              {
                height: Math.max(
                  height * 0.60,
                  410
                ),
              },
            ]}
          >

            {/* OVERLAY BIRU */}

            <LinearGradient
              colors={[
                "rgba(30,100,190,0.48)",
                "rgba(3,48,145,0.78)",
                "rgba(1,35,132,0.95)",
              ]}
              locations={[0, 0.55, 1]}
              style={StyleSheet.absoluteFill}
            />

            {/* LOGO DAN NAMA SEKOLAH */}

            <View style={styles.heroContent}>

              <Image
                source={require(
                  "../../assets/images/logo sekolah.png"
                )}
                style={[
                  styles.logo,
                  {
                    width: Math.min(
                      width * 0.28,
                      125
                    ),
                    height: Math.min(
                      width * 0.28,
                      125
                    ),
                  },
                ]}
                resizeMode="contain"
              />

              <Text style={styles.schoolName}>
                SMP Muhammadiyah 12
                {"\n"}
                Paciran
              </Text>

            </View>

          </ImageBackground>

          {/* =========================
              FORM LOGIN
          ========================= */}

          <View style={styles.formContainer}>

            {/* JUDUL */}

            <Text style={styles.title}>
              Selamat Datang
            </Text>

            {/* DESKRIPSI */}

            <Text style={styles.subtitle}>
              Masuk untuk memantau pembayaran,
              {"\n"}
              aktivitas, dan informasi santri
            </Text>

            {/* INPUT */}

            <View style={styles.inputContainer}>

              <Ionicons
                name="person-outline"
                size={24}
                color={COLORS.icon}
                style={styles.inputIcon}
              />

              <TextInput
                style={styles.input}
                placeholder="NISN / NUPTK"
                placeholderTextColor={
                  COLORS.placeholder
                }
                value={userId}
                onChangeText={setUserId}
                keyboardType="number-pad"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="done"
                onSubmitEditing={handleLogin}
                accessibilityLabel="NISN atau NUPTK"
              />

            </View>

            {/* TOMBOL MASUK */}

            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleLogin}
              activeOpacity={0.8}
            >

              <Text style={styles.loginButtonText}>
                Masuk
              </Text>

            </TouchableOpacity>

          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

// ==================================
// STYLING
// ==================================

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.secondary,
  },

  scrollContent: {
    flexGrow: 1,
    backgroundColor: COLORS.secondary,
  },

  // FOTO SEKOLAH

  hero: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  heroContent: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingBottom: 25,
  },

  // LOGO

  logo: {
    marginBottom: 23,
  },

  // NAMA SEKOLAH

  schoolName: {
    fontFamily: "Poppins_700Bold",
    fontSize: 25,
    lineHeight: 38,
    color: COLORS.yellow,
    textAlign: "center",
  },

  // CONTAINER FORM

  formContainer: {
    flexGrow: 1,
    backgroundColor: COLORS.secondary,
    borderTopLeftRadius: 55,
    borderTopRightRadius: 55,
    marginTop: -48,
    paddingTop: 43,
    paddingHorizontal: 30,
    paddingBottom: 55,
  },

  // JUDUL

  title: {
    fontFamily: "Poppins_700Bold",
    fontSize: 32,
    lineHeight: 47,
    color: COLORS.primary,
    marginBottom: 8,
  },

  // DESKRIPSI

  subtitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 15,
    lineHeight: 25,
    color: COLORS.primary,
    marginBottom: 33,
  },

  // INPUT

  inputContainer: {
    width: "100%",
    height: 55,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.secondary,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 11,
    paddingHorizontal: 20,
  },

  inputIcon: {
    marginRight: 16,
  },

  input: {
    flex: 1,
    height: "100%",
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    marginTop: 12,
    color: "#222222",
    paddingTop: 3,
  },

  // TOMBOL LOGIN

  loginButton: {
    width: "100%",
    height: 55,
    backgroundColor: COLORS.primary,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 35,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  loginButtonText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 17,
    color: COLORS.secondary,
  },

});

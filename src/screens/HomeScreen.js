import React, { useEffect } from "react";
import { StyleSheet, View, Text, Image, ActivityIndicator } from "react-native";
import colors from "../utils/colors";
import Button from "../components/Button";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

export default function HomeScreen({ navigation }) {
  const { user, status } = useSelector((state) => state.auth);

  useEffect(() => {
    const checkUserLoggedIn = () => {
      if (status === "loading") {
        return;
      } else if (user) {
        navigation.navigate("Groups");
      } else {
        return;
      }
    };
    checkUserLoggedIn(); // Ejecuta la función de redirección basada en el estado de autenticación
  }, [user, status, navigation]);

  const handleLoginButton = () => {
    navigation.navigate("Login");
  };
  const handleRegisterButton = () => {
    navigation.navigate("Register");
  };

  if (status === "loading") {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={colors.black} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.title_container}>
        <Image
          source={require("../assets/logo-momento.png")}
          style={{ width: 150, height: 150 }}
        />
        <Text style={styles.title}>Momento</Text>
      </View>

      <Link href="/login">
        <Button label="Log in" onPress={handleLoginButton} />
      </Link>

      <Link href="/register">
        <Button label="Register" onPress={handleRegisterButton} />
      </Link>
    </SafeAreaView>
  );
}
//Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background_color,
  },
  title_container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderWidth: 5,
    borderColor: colors.silver,
    borderRadius: 10,
    marginBottom: 40,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: colors.text_color,
  },
  button: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

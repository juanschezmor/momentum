import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import colors from "../utils/colors";
import { loginUser } from "../redux/authSlice";

const LoginScreen = ({ navigation }) => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false); // Estado local para controlar el loading

  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);

  const onPressLogin = () => {
    setLoading(true); // Activar loading al iniciar el login

    dispatch(loginUser(loginData))
      .unwrap()
      .then(() => {
        setLoading(false); // Desactivar loading al completar el login exitosamente
        navigation.navigate("Groups");
      })
      .catch((error) => {
        setLoading(false); // Desactivar loading si hay un error en el login
        alert("Error logging in, please try again.", error);
      });
  };

  const onPressForgotPassword = () => {
    // Implementar función para olvidar contraseña si es necesario
  };

  const onPressSignUp = () => {
    navigation.navigate("Register");
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      enableOnAndroid={true}
    >
      {loading || status === "loading" ? (
        <ActivityIndicator size="large" color={colors.black} />
      ) : (
        <>
          <Image
            source={require("../assets/logo-momento.png")}
            style={{ width: 150, height: 150 }}
          />
          <View style={styles.title_box}>
            <Text style={styles.title}>Log in to your account</Text>
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Email"
              placeholderTextColor="#003f5c"
              onChangeText={(text) =>
                setLoginData((prevState) => ({ ...prevState, email: text }))
              }
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              secureTextEntry
              placeholder="Password"
              placeholderTextColor="#003f5c"
              onChangeText={(text) =>
                setLoginData((prevState) => ({ ...prevState, password: text }))
              }
            />
          </View>
          <TouchableOpacity onPress={onPressForgotPassword}>
            <Text style={styles.forgotAndSignUpText}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressLogin} style={styles.loginBtn}>
            <Text style={styles.loginText}>LOGIN</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressSignUp}>
            <Text style={styles.forgotAndSignUpText}>Signup</Text>
          </TouchableOpacity>
          {error && <Text style={styles.errorText}>{error}</Text>}
          {status === "error" && (
            <Text style={styles.errorText}>
              Error logging in. Please try again.
            </Text>
          )}
        </>
      )}
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background_color,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    textAlign: "left",
    fontSize: 14,
    color: colors.black,
    textShadowRadius: 5,
  },
  title_box: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "100%",
    marginVertical: 20,
    marginLeft: 75,
  },
  inputView: {
    width: "80%",
    backgroundColor: colors.ghost_white,
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "black",
  },
  forgotAndSignUpText: {
    color: "black",
    fontSize: 11,
  },
  loginBtn: {
    width: "80%",
    backgroundColor: colors.primary_color,
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: colors.background_color,
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
});

export default LoginScreen;

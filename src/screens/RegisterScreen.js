import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import colors from "../utils/colors";
import { registerUser } from "../redux/authSlice";

const RegisterScreen = ({ navigation }) => {
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);

  const validateName = (name) => {
    if (!name || name.length < 1) return "Name is required";
    if (name.length > 50) return "Name is too long";
    if (/[^a-zA-Z\s]/.test(name))
      return "Name can only contain letters and spaces";
    return "";
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Invalid email format";
    return "";
  };

  const validatePassword = (password) => {
    if (password.length < 8) return "Password must be at least 8 characters";
    if (password.length > 16) return "Password must be less than 16 characters";
    if (!/[A-Z]/.test(password))
      return "Password must contain at least one uppercase letter";
    return "";
  };

  const onPressRegister = () => {
    const nameError = validateName(registerData.name);
    const emailError = validateEmail(registerData.email);
    const passwordError = validatePassword(registerData.password);

    if (nameError || emailError || passwordError) {
      setErrors({
        name: nameError,
        email: emailError,
        password: passwordError,
      });
      return;
    }

    // Dispara la acción asíncrona de registro
    dispatch(registerUser(registerData))
      .unwrap()
      .then(() => {
        Alert.alert("Registration Successful", `Welcome ${registerData.email}`);
        navigation.navigate("Groups");
      })
      .catch((error) => {
        Alert.alert(
          "Registration Failed",
          error.message || "Registration failed",
        );
      });
  };

  const onPressForgotPassword = () => {
    // Implementa la función de recuperación de contraseña si es necesario
  };

  const onPressLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/logo-momento.png")}
        style={{ width: 150, height: 150 }}
      />
      <View style={styles.title_box}>
        <Text style={styles.title}>Sign Up</Text>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Name"
            placeholderTextColor={colors.charcoal}
            onChangeText={(text) =>
              setRegisterData((prevState) => ({ ...prevState, name: text }))
            }
            onBlur={() =>
              setErrors((prevState) => ({
                ...prevState,
                name: validateName(registerData.name),
              }))
            }
          />
        </View>
        {errors.name ? (
          <Text style={styles.errorText}>{errors.name}</Text>
        ) : null}
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Email"
            placeholderTextColor={colors.charcoal}
            onChangeText={(text) =>
              setRegisterData((prevState) => ({ ...prevState, email: text }))
            }
            onBlur={() =>
              setErrors((prevState) => ({
                ...prevState,
                email: validateEmail(registerData.email),
              }))
            }
          />
        </View>
        {errors.email ? (
          <Text style={styles.errorText}>{errors.email}</Text>
        ) : null}
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            secureTextEntry
            placeholder="Password"
            placeholderTextColor={colors.charcoal}
            onChangeText={(text) =>
              setRegisterData((prevState) => ({ ...prevState, password: text }))
            }
            onBlur={() =>
              setErrors((prevState) => ({
                ...prevState,
                password: validatePassword(registerData.password),
              }))
            }
          />
        </View>
        {errors.password ? (
          <Text style={styles.errorText}>{errors.password}</Text>
        ) : null}
      </View>

      <TouchableOpacity onPress={onPressForgotPassword}>
        <Text style={styles.forgotAndSignUpText}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressRegister} style={styles.registerBtn}>
        <Text style={styles.registerBtnText}>REGISTER</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressLogin}>
        <Text style={styles.forgotAndSignUpText}>
          You already have an account? Log in.
        </Text>
      </TouchableOpacity>

      {status === "loading" && (
        <ActivityIndicator size="large" color={colors.black} />
      )}
      {status === "failed" && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background_color,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    textAlign: "left",
    fontSize: 14,
    color: colors.black,
    textShadowRadius: 5,
  },
  title_box: {
    alignItems: "left",
    justifyContent: "left",
    width: "100%",
    marginVertical: 20,
    marginLeft: 75,
  },
  inputContainer: {
    width: "100%",
    alignItems: "center",
    height: "auto",
    marginVertical: 15,
  },
  inputView: {
    width: "80%",
    backgroundColor: colors.ghost_white,
    borderRadius: 25,
    height: 50,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: colors.black,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
  forgotAndSignUpText: {
    color: "black",
    fontSize: 11,
  },
  registerBtn: {
    width: "80%",
    backgroundColor: colors.primary_color,
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  registerBtnText: {
    color: colors.background_color,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default RegisterScreen;

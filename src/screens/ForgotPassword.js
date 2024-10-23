import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import image from "../images/login-img.png";
import ErrorMessage from "../components/ErrorMessage";
import { styles } from "../styles/Auth";

const ForgotPassword = ({ navigation }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ password: "", confirmPassword: "" });


  const validateFields = () => {
    let isValid = true;
    const newErrors = { password: "", confirmPassword: "" };

   
    if (!password) {
      newErrors.password = "Bu alanın girilmesi zorunludur.";
      isValid = false;
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Şifreler eşleşmiyor.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleResetPassword =  () => {
    if (!validateFields()) return;


  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const openModal = async () => {
    handleResetPassword()
    try {
        navigation.navigate("Login")
    } catch (error) {
        
    }
  };

  return (
    <View style={styles.root}>
      <ImageBackground
        source={image}
        style={styles.background}
        resizeMode="cover"
      >
      </ImageBackground>

      <View style={styles.container}>
        <Text style={styles.infoText}>
          Alışverişe başlamak için yeni parola oluşturun.
        </Text>

        <View style={styles.input}>
          <TextInput
            placeholder="Şifre*"
            secureTextEntry={!showPassword}
            style={styles.passwordInput}
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Icon
              name={showPassword ? "eye-off" : "eye"}
              size={20}
              color="gray"
            />
          </TouchableOpacity>
        </View>
        <ErrorMessage message={errors.password} />

        <View style={styles.input}>
          <TextInput
            placeholder="Şifre Tekrar*"
            secureTextEntry={!showPassword}
            style={styles.passwordInput}
            onChangeText={(text) => setConfirmPassword(text)}
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Icon
              name={showPassword ? "eye-off" : "eye"}
              size={20}
              color="gray"
            />
          </TouchableOpacity>
        </View>
        <ErrorMessage message={errors.confirmPassword} />

        <TouchableOpacity style={styles.button} onPress={openModal}>
          <Text style={styles.buttonText}>Kaydet ve Giriş Yap</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ForgotPassword;

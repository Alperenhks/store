import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import image from "../images/login-img.png";
import ErrorMessage from "../components/ErrorMessage";
import { styles } from "../styles/Auth";
import AuthModal from "../components/AuthModal";
import successImage from "../images/success.png";

const RegisterScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const openModal = () => {
    setIsModalVisible(true);
  };
  const closeModal = () => setIsModalVisible(false);

  const validateFields = () => {
    let isValid = true;
    const newErrors = {};

    if (!fullName) {
      newErrors.fullName = "Bu alanın girilmesi zorunludur.";
      isValid = false;
    }
    if (!phone) {
      newErrors.phone = "Bu alanın girilmesi zorunludur.";
      isValid = false;
    }
    if (!username) {
      newErrors.username = "Bu alanın girilmesi zorunludur.";
      isValid = false;
    }
    if (!password) {
      newErrors.password = "Bu alanın girilmesi zorunludur.";
      isValid = false;
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Şifreler uyuşmuyor.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleRegister = async () => {
    if (!validateFields()) return;

    try {
      openModal();
    } catch (error) {
      Alert.alert("Kayıt Hatası", error.message);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const loginNavigate = () => navigation.replace("Login");

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ImageBackground
        source={image}
        style={styles.background}
        resizeMode="cover"
      />
      <View style={styles.container}>
        <Text style={styles.infoText}>
          Alışverişe başlamak için kayıt olun.
        </Text>

        <TextInput
          placeholder="Ad Soyad*"
          style={styles.input}
          onChangeText={setFullName}
        />
        <ErrorMessage message={errors.fullName} />

        <TextInput
          placeholder="Telefon*"
          style={styles.input}
          keyboardType="phone-pad"
          onChangeText={setPhone}
        />
        <ErrorMessage message={errors.phone} />

        <TextInput
          placeholder="E-posta*"
          style={styles.input}
          onChangeText={setUsername}
        />
        <ErrorMessage message={errors.username} />

        <View style={styles.input}>
          <TextInput
            placeholder="Şifre*"
            secureTextEntry={!showPassword}
            style={styles.passwordInput}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Icon
              name={showPassword ? "eye-off" : "eye"}
              size={20}
              color="gray"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.input}>
          <TextInput
            placeholder="Şifre Tekrar*"
            secureTextEntry={!showPassword}
            style={styles.passwordInput}
            onChangeText={setConfirmPassword}
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

        <TouchableOpacity
          style={[styles.button, { marginTop: 30 }]}
          onPress={handleRegister}
        >
          <Text style={styles.buttonText}>Kayıt Ol</Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <Text style={{ color: "#939393" }}>Zaten bir hesabın mı var? </Text>
          <TouchableOpacity onPress={loginNavigate}>
            <Text style={{ color: "#FF3D00", fontSize: 17 }}>Giriş Yap</Text>
          </TouchableOpacity>
        </View>
      </View>
      <AuthModal
        visible={isModalVisible}
        onClose={closeModal}
        title={"Kayıt Ol"}
      >
        <Image
          source={successImage}
          style={styles.modalImage}
          resizeMode="contain"
        />
        <Text style={styles.modalDescription}>
          E-posta başarıyla gönderildi!
        </Text>
        <TouchableOpacity style={styles.modalButton} onPress={()=> navigation.navigate("Login")}>
          <Text style={styles.modalButtonText}>Lütfen, e-posta adresinizi onaylayın.</Text>
        </TouchableOpacity>
      </AuthModal>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

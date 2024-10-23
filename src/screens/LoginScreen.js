import React, { useState, useEffect } from "react";
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
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import { loginUser } from "../api";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import image from "../images/login-img.png";
import ErrorMessage from "../components/ErrorMessage";
import { styles } from "../styles/Auth";
import AuthModal from "../components/AuthModal";
import passwordImage from "../images/Password.png";
import successImage from "../images/success.png";
import { saveUserToStorage, loadUserFromStorage } from "../redux/authSlice"; // Save and load functions import

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(false); 
  const [errors, setErrors] = useState({ username: "", password: "" });

  const dispatch = useDispatch();

  useEffect(() => {
    const checkUser = async () => {
      await loadUserFromStorage(dispatch); // Check for stored user on component mount
    };
    checkUser();
  }, []);

  const validateFields = () => {
    let isValid = true;
    const newErrors = { username: "", password: "" };
    if (!username) {
      newErrors.username = "Bu alanın girilmesi zorunludur.";
      isValid = false;
    }
    if (!password) {
      newErrors.password = "Bu alanın girilmesi zorunludur.";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async () => {
    if (!validateFields()) return;

    try {
      const userData = await loginUser(username, password);
      console.log(userData);
      
      dispatch(login(userData));
      await saveUserToStorage(userData); // Save user data to AsyncStorage
      navigation.replace("Home");
    } catch (error) {
      Alert.alert("Giriş Hatası", error.message);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const openModal = () => {
    setIsModalVisible(true);
    setModalContent(false);
  };
  const closeModal = () => setIsModalVisible(false);

  const handleSendEmail = () => {
    setModalContent(true);
  };

  const successClik = () => {
    setIsModalVisible(false);
    navigation.navigate("ForgotPass"); 
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ImageBackground
        source={image}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <Text style={styles.headerText}>Giriş</Text>
            <AntDesign name="user" size={30} color="#fff" />
          </View>
          <Text style={styles.subHeaderText}>Hoşgeldiniz</Text>
        </View>
      </ImageBackground>

      <View style={styles.container}>
        <Text style={styles.infoText}>
          Alışverişe başlamak için giriş yapınız.
        </Text>

        <TextInput
          placeholder="E-posta*"
          style={styles.input}
          onChangeText={(text) => setUsername(text)}
        />
        <ErrorMessage message={errors.username} />

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

        <TouchableOpacity onPress={openModal}>
          <Text style={styles.forgotPassword}>Şifremi Unuttum</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Giriş Yap</Text>
        </TouchableOpacity>

        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>veya</Text>
          <View style={styles.divider} />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.buttonText}>Kayıt Ol</Text>
        </TouchableOpacity>

        {/* Modal component */}
        <AuthModal
          visible={isModalVisible}
          onClose={closeModal}
          title={"Şifremi Unuttum"}
        >
          {modalContent ? (
            <>
              <Image
                source={successImage}
                style={styles.modalImage}
                resizeMode="contain"
              />
              <Text style={styles.modalDescription}>
                E-posta başarıyla gönderildi!
              </Text>
              <TouchableOpacity style={styles.modalButton} onPress={successClik}>
                <Text style={styles.modalButtonText}>Lütfen, e-posta adresinizi onaylayın.</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Image
                source={passwordImage}
                style={styles.modalImage}
                resizeMode="contain"
              />
              <Text style={styles.modalDescription}>
                Kayıt olurken kullandığınız e-posta adresini giriniz.
              </Text>
              <TextInput placeholder="E-posta*" style={styles.modalInput} />
              <TouchableOpacity style={styles.modalButton} onPress={handleSendEmail}>
                <Text style={styles.modalButtonText}>Gönder</Text>
              </TouchableOpacity>
            </>
          )}
        </AuthModal>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

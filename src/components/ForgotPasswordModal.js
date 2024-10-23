import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  StyleSheet,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import passwordImage from "../images/Password.png";
import { width, height } from "../utils/Dimensions";

const ForgotPasswordModal = ({ visible, onClose }) => (
  <Modal
    transparent
    visible={visible}
    animationType="slide"
    onRequestClose={onClose}
  >
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={onClose}>
            <AntDesign name="arrowleft" size={width * 0.06} color="#4F4F4F" />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Şifremi Unuttum</Text>
        </View>

        <View style={styles.modalBody}>
          <Image source={passwordImage} style={styles.modalImage} resizeMode="contain" />
          <Text style={styles.modalDescription}>
            Kayıt olurken kullandığınız e-posta adresini giriniz.
          </Text>

          <TextInput placeholder="E-posta*" style={styles.modalInput} />
          <TouchableOpacity style={styles.modalButton}>
            <Text style={styles.modalButtonText}>Gönder</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(126, 126, 126, 0.5)",
  },
  modalContent: {
    height: height * 0.5,
    backgroundColor: "#fff",
    padding: width * 0.05,
    alignItems: "center",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
  },
  modalTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    color: "#4F4F4F",
  },
  modalBody: {
    alignItems: "center",
    width: "100%",
  },
  modalImage: {
    width: width * 0.5,
    height: height * 0.12,
    marginBottom: 10,
  },
  modalDescription: {
    color: "#939393",
    fontSize: width * 0.035,
    textAlign: "center",
    marginVertical: width * 0.1,
  },
  modalInput: {
    height: width * 0.11,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "#f5f5f5",
    width: "90%",
  },
  modalButton: {
    backgroundColor: "#333",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: height * 0.02,
    width: "90%",
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ForgotPasswordModal;

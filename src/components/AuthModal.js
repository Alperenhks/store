import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { width, height } from "../utils/Dimensions";

const AuthModal = ({ visible, onClose, title, children }) => (
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
          <Text style={styles.modalTitle}>{title}</Text>
        </View>

        <View style={styles.modalBody}>
          {children}
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
  });

export default AuthModal;

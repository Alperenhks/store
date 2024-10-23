import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get('window');

const ConfirmModal = ({ visible, onConfirm, onCancel, message }) => {
  if (!visible) return null;

  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text>{message}</Text>
        <TouchableOpacity style={styles.modalButton} onPress={onConfirm}>
          <Text style={styles.modalButtonText}>Evet</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.modalButton, { backgroundColor: "#4A4A4A" }]} onPress={onCancel}>
          <Text style={styles.modalButtonText}>Hayır</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    alignItems: "center",
    width: width * 0.8,
  },
  modalButton: {
    backgroundColor: "#FF5714",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: "#fff",
  },
});

export default ConfirmModal;

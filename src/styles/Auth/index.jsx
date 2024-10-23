import { StyleSheet } from "react-native";
import { width,height } from "../../utils/Dimensions";

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
  },
  background: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    width: "80%",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  headerText: {
    fontSize: 30,
    color: "#fff",
    fontWeight: "bold",
    marginRight: 5,
  },
  subHeaderText: {
    fontSize: 18,
    color: "#fff",
  },
  container: {
    flex: 0.7,
    padding: "8%",
  },
  infoText: {
    color: "#939393",
    fontSize: width * 0.04,
  },
  input: {
    height: width * 0.12,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: width * 0.06,
    backgroundColor: "#f5f5f5",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  passwordInput: {
    flex: 1,
    height: 50,
  },
  forgotPassword: {
    marginVertical: width * 0.06,
    color: "#333",
    fontSize: width * 0.04,
  },
  button: {
    backgroundColor: "#333",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#ddd",
  },
  dividerText: {
    marginHorizontal: 10,
    color: "#7a7a7a",
  },
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

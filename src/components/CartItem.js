import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get('window');

const CartItem = ({ item, onIncrease, onDecrease, onRemove }) => {
  return (
    <View style={styles.cartItem}>
      <View style={styles.header}>
        <Text style={styles.brand}>{item.brand}</Text>
        <Text style={styles.title}>{item.title}</Text>
      </View>
      <View style={styles.row}>
        <Image source={{ uri: item.thumbnail }} style={styles.image} />
        <View style={styles.details}>
          <Text style={styles.price}>{item.price} $</Text>
          <Text style={styles.availability}>
            Stok Durumu: {item.availabilityStatus}
          </Text>
          <Text style={styles.colorSize}>
            Beden: {item.size} | Renk: {item.color}
          </Text>
          <Text style={styles.shippingInfo}>
            Tahmini Teslimat: {item.shippingInformation}
          </Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={onDecrease}>
              <Text style={styles.quantityButton}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{item.quantity}</Text>
            <TouchableOpacity onPress={onIncrease}>
              <Text style={styles.quantityButton}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 3,
  },
  header: {
    marginBottom: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  image: {
    width: width * 0.2,
    height: width * 0.2,
    borderRadius: 5,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#EBEBEB",
  },
  details: {
    flex: 1,
  },
  brand: { fontSize: width * 0.035, color: "#353535", fontWeight: "500" },
  title: { fontSize: width * 0.035, color: "#353535" },
  price: { fontSize: width * 0.035, color: "#333", marginBottom: 5 },
  availability: { fontSize: width * 0.03, color: "green", marginBottom: 5 },
  colorSize: { fontSize: width * 0.03, color: "#555", marginBottom: 5 },
  shippingInfo: { fontSize: width * 0.03, color: "#555", marginBottom: 5 },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    justifyContent: "flex-end",
  },
  quantityButton: {
    fontSize: width * 0.04,
    padding: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginHorizontal: 5,
  },
  quantityText: {
    fontSize: width * 0.035,
  },
});

export default CartItem;

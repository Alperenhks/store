import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { height } from "../utils/Dimensions";
import { renderStars } from "../utils/starUtils"; 
import { Ionicons } from '@expo/vector-icons';

const ProductCard = ({ item, onPress, addCard }) => {
  return (
    <View style={styles.product}>
      <TouchableOpacity style={styles.cardBody} onPress={onPress}>
        <View style={styles.shippingInfo}>
          <Text style={styles.shippingText} numberOfLines={1}>
            {item.shippingInformation}
          </Text>
          <TouchableOpacity>
            <Ionicons name="heart-outline" size={24} color="gray" />
          </TouchableOpacity>
        </View>
        <Image
          source={{ uri: item.images[0] }}
          style={styles.image}
        />
        <View style={styles.ratingContainer}>{renderStars(item.rating)}</View>
        <Text style={styles.brand}>{item.brand}</Text>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>{item.price} $</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={addCard}>
        <Text style={styles.buttonText}>Sepete Ekle</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  product: {
    flex: 1,
    padding: 5,
    alignItems: "center",
    height: height * 0.4,
  },
  cardBody: {
    padding: 7,
    height: height * 0.33,
    backgroundColor: "#ffffff",
    width: "100%",
  },
  shippingText: {
    fontSize: 12,
    width: "80%",
    color: "#34C231",
  },
  image: {
    width: "100%",
    height: height * 0.15,
    resizeMode: "contain",
  },
  title: {
    marginVertical: 5,
    fontWeight: "300",
  },
  ratingContainer: {
    flexDirection: "row",
    marginVertical: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
  },
  shippingInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 5,
  },
  button: {
    backgroundColor: "#ffffff",
    alignItems: "center",
    width: "100%",
    marginVertical: 10,
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
  },
  buttonText: {
    fontWeight: "600",
  },
});

export default ProductCard;

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  Dimensions,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../redux/cartSlice";
import { Ionicons } from '@expo/vector-icons';

import { width } from "../utils/Dimensions"

const CartScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [isRemoveModalVisible, setRemoveModalVisible] = useState(false);
  const [isClearModalVisible, setClearModalVisible] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: `Sepetim (${cartItems?.length || 0} ürün)`,
      headerLeft: () => (
        <Ionicons
          name="arrow-back"
          size={24}
          color="black"
          onPress={() => navigation.goBack()}
          style={{ marginLeft: 15 }}
        />
      ),
      headerRight: () => (
        <View style={{ flexDirection: 'row', marginRight: 15 }}>
          <Ionicons
            name="checkmark-circle-outline"
            size={24}
            color="green"
            onPress={() => console.log('Onaylandı')}
            style={{ marginRight: 15 }}
          />
          <Ionicons
            name="trash-outline"
            size={24}
            color="green"
            onPress={() => setClearModalVisible(true)} 
          />
        </View>
      ),
    });
  }, [cartItems, navigation]);

  const handleRemove = () => {
    if (itemToRemove) {
      dispatch(removeFromCart(itemToRemove.id));
      setRemoveModalVisible(false);
    }
  };

  const handleIncrease = (item) => {
    dispatch(updateQuantity({ itemId: item.id, quantity: item.quantity + 1 }));
  };

  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({ itemId: item.id, quantity: item.quantity - 1 })
      );
    } else {
      setItemToRemove(item);
      setRemoveModalVisible(true); 
    }
  };

  const confirmClearCart = () => {
    cartItems.forEach(item => dispatch(removeFromCart(item.id)));
    setClearModalVisible(false);
  };

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const renderCartItem = ({ item }) => {
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
              <TouchableOpacity onPress={() => handleDecrease(item)}>
                <Text style={styles.quantityButton}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{item.quantity}</Text>
              <TouchableOpacity onPress={() => handleIncrease(item)}>
                <Text style={styles.quantityButton}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCartItem}
      />
      <View style={styles.totalContainer}>
        <View>
          <Text style={styles.total}>Toplam:</Text>
          <Text style={styles.total}>{totalAmount.toFixed(2)} $</Text>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Devam Et</Text>
        </TouchableOpacity>
      </View>

      <Modal
        transparent={true}
        visible={isRemoveModalVisible}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Bu ürünü silmek istediğinizden emin misiniz?</Text>
            <TouchableOpacity style={styles.modalButton} onPress={handleRemove}>
              <Text style={styles.modalButtonText}>Evet</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalButton,{backgroundColor:"#4A4A4A"}]} onPress={() => setRemoveModalVisible(false)}>
              <Text style={styles.modalButtonText}>Hayır</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        transparent={true}
        visible={isClearModalVisible}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Tüm ürünleri silmek istediğinizden emin misiniz?</Text>
            <TouchableOpacity style={styles.modalButton} onPress={confirmClearCart}>
              <Text style={styles.modalButtonText}>Evet</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalButton,{backgroundColor:"#4A4A4A"}]} onPress={() => setClearModalVisible(false)}>
              <Text style={[styles.modalButtonText]}>Hayır</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#f4f4f4" },
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
  totalContainer: {
    backgroundColor: "#ffffff",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  total: {
    fontSize: width * 0.04,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#4A4A4A",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "bold",
  },
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
    width: width,
  },
  modalButton: {
    backgroundColor: "#4CAF50",
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

export default CartScreen;

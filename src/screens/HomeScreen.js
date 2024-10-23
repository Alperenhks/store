import React, { useEffect, useState } from "react";
import { StyleSheet, Alert, FlatList, TextInput } from "react-native";
import { useDispatch } from 'react-redux';
import { getProducts } from "../api";
import ProductCard from "../components/ProductCard";
import { addToCart } from '../redux/cartSlice';
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        console.log(data); 
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          Alert.alert("Hata", "Ürün verileri düzgün bir şekilde alınamadı.");
        }
      } catch (error) {
        Alert.alert("Hata", error.message);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = searchQuery
    ? products.filter((product) =>
        product?.title?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products; 

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  const renderProductItem = ({ item }) => {
    return (
      <ProductCard
        item={item}
        onPress={() =>
          navigation.navigate("ProductDetail", { productId: item.id })
        }
        addCard={() => handleAddToCart(item)} 
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Ürün ismine göre ara"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProductItem}
        numColumns={2}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  searchInput: {
    height: 40,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "white"
  },
});

export default HomeScreen;

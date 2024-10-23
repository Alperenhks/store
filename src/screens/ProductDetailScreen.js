import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, ScrollView, Share } from 'react-native';
import { getProductDetails } from '../api';
import { width, height } from "../utils/Dimensions";
import { renderStars } from '../utils/starUtils';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice'; 
import { Ionicons } from '@expo/vector-icons';

const ProductDetailScreen = ({ route, navigation }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const data = await getProductDetails(productId);
        setProduct(data);
      } catch (error) {
        Alert.alert('Hata', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Bu ürünü incele: ${product.title} - ${product.price}$. Daha fazla bilgi için tıklayın.`,
      });
    } catch (error) {
      Alert.alert('Paylaşım Hatası', error.message);
    }
  };

  useEffect(() => {
    navigation.setOptions({
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
            name="heart-outline"
            size={24}
            onPress={() => console.log('Beğenildi')}
            style={{ marginRight: 15 }}
          />
          <Ionicons
            name="share-social-outline"
            size={24}
            onPress={handleShare} 
          />
        </View>
      ),
    });
  }, [navigation, product]);

  const handleAddToCart = () => {
    if (product) {
      const cartItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        quantity: quantity,
        image: product.images[0],
      };
      dispatch(addToCart(cartItem));
      Alert.alert('Başarılı', 'Ürün sepete eklendi.');
      navigation.navigate('Sepetim');
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Yükleniyor...</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Ürün bulunamadı.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageScroll}>
        {product.images.map((imageUri, index) => (
          <Image key={index} source={{ uri: imageUri }} style={styles.image} />
        ))}
      </ScrollView>

      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>{product.price} $</Text>
      <Text style={styles.stock}>Stok Durumu: {product.availabilityStatus}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <Text style={styles.rating}>{renderStars(product.rating)} {product.rating} / 5</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.dimensions}>
          Boyutlar: {product.dimensions.width} x {product.dimensions.height} x {product.dimensions.depth} cm
        </Text>
        <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
          <Text style={styles.addToCartButtonText}>Sepete Ekle</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.returnPolicy}>İade Politikası: {product.returnPolicy}</Text>
      <Text style={styles.shippingInfo}>Gönderim Bilgisi: {product.shippingInformation}</Text>
      <Text style={styles.warranty}>Garanti Bilgisi: {product.warrantyInformation}</Text>

      <Text style={styles.reviewsTitle}>Yorumlar:</Text>
      {product.reviews.map((review, index) => (
        <View key={index} style={styles.review}>
          <Text style={styles.reviewRating}>{renderStars(review.rating)} {review.rating} / 5</Text>
          <Text>{review.comment}</Text>
          <Text style={styles.reviewerName}>{review.reviewerName}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20, backgroundColor: '#fff' },
  imageScroll: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  image: { width: width * 0.8, height: height * 0.4, resizeMode: 'contain', marginRight: 10, borderRadius: 8 },
  title: { fontSize: 26, fontWeight: 'bold', marginVertical: 10, color: '#333' },
  price: { fontSize: 24, color: '#FF5714', marginBottom: 10 },
  stock: { fontSize: 18, marginBottom: 10, color: '#777' },
  description: { fontSize: 18, marginVertical: 10, color: '#555' },
  rating: { fontSize: 18, marginBottom: 10 },
  dimensions: { fontSize: 16, marginBottom: 10 },
  returnPolicy: { fontSize: 16, marginVertical: 10, color: '#555' },
  shippingInfo: { fontSize: 16, marginVertical: 10, color: '#555' },
  warranty: { fontSize: 16, marginVertical: 10, color: '#555' },
  reviewsTitle: { fontSize: 20, fontWeight: 'bold', marginVertical: 10, color: '#333' },
  review: { marginBottom: 10, padding: 10, borderColor: '#ddd', borderWidth: 1, borderRadius: 5 },
  reviewRating: { fontWeight: 'bold' },
  reviewerName: { fontStyle: 'italic', marginTop: 5, color: '#777' },
  infoContainer: { marginTop: 10, marginBottom: 20 },
  addToCartButton: {
    backgroundColor: '#FF5714',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  addToCartButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProductDetailScreen;

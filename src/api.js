import axios from 'axios';

const BASE_URL = 'https://dummyjson.com';

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Kullanıcı girişi
export const loginUser = async (username, password) => {
  try {
    const response = await api.post('/auth/login', { username, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Giriş yapılamadı.');
  }
};

// Ürün detaylarını al
export const getProductDetails = async (productId) => {
  try {
    const response = await api.get(`/products/${productId}`);
    return response.data;
  } catch (error) {
    throw new Error('Ürün detayları getirilemedi.');
  }
};

// Tüm ürünleri al
export const getProducts = async () => {
  try {
    const response = await api.get('/products');
    return response.data.products;
  } catch (error) {
    throw new Error('Ürünler getirilemedi.');
  }
};

// Kullanıcıya ait sepeti al
export const getCart = async (cartId) => {
  try {
    const response = await api.get(`/carts/${cartId}`);
    return response.data;
  } catch (error) {
    throw new Error('Sepet getirilemedi.');
  }
};

// Ürünü sepete ekle
export const addToCart = async (userId, productId, quantity) => {
  try {
    const response = await api.post(`/carts/add`, {
      userId, 
      products: [{ id: productId, quantity }],
    });
    return response.data;
  } catch (error) {
    throw new Error('Ürün sepete eklenemedi.');
  }
};

// Sepeti güncelle
export const updateCart = async (cartId, products) => {
  try {
    const response = await api.put(`/carts/${cartId}`, {
      merge: true,
      products,
    });
    console.log(response);
    return response.data; 
  } catch (error) {
    console.error('Güncelleme hatası:', error.response ? error.response.data : error.message);
    throw new Error('Sepet güncellenemedi.');
  }
};

// Sepetten ürün sil
export const removeFromCart = async (cartId) => {
  try {
    const response = await api.delete(`/carts/${cartId}`);
    return response.data; 
  } catch (error) {
    console.error('Silme hatası:', error.response ? error.response.data : error.message);
    throw new Error('Sepet silinemedi.');
  }
};


// useEffect(() => {
//   navigation.setOptions({
//     headerTitle: `Sepetim (${cartItems?.length} ürün)`,
//     headerLeft: () => (
//       <Ionicons
//         name="arrow-back"
//         size={24}
//         color="black"
//         onPress={() => navigation.goBack()}
//         style={{ marginLeft: 15 }}
//       />
//     ),
//     headerRight: () => (
//       <View style={{ flexDirection: 'row', marginRight: 15 }}>
//         <Ionicons
//           name="checkmark-circle-outline"
//           size={24}
//           color="green"
//           onPress={() => console.log('Onaylandı')}
//           style={{ marginRight: 15 }}
//         />
//         <Ionicons
//           name="trash-outline"
//           size={24}
//           color="green"
//         />
//       </View>
//     ),
//   });
// }, [totalQuantity, navigation, cartItems.length]);

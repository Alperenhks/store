import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const authSlice = createSlice({
  name: 'auth',
  initialState: { isAuthenticated: false, user: null },
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

// Kullanıcıyı depolamak için async fonksiyon
export const saveUserToStorage = async (userData) => {
  await AsyncStorage.setItem('user', JSON.stringify(userData));
};

// Depolamadan kullanıcıyı yüklemek için async fonksiyon
export const loadUserFromStorage = () => async (dispatch) => {
  const storedUser = await AsyncStorage.getItem('user');
  if (storedUser) {
    dispatch(login(JSON.parse(storedUser)));
  }
};

// Kullanıcı verisini depolamadan silmek için async fonksiyon
export const clearUserFromStorage = async () => {
  await AsyncStorage.removeItem('user');
};

// Çıkış yaparken hem Redux state'ini temizle hem de depolama alanından sil
export const logoutAndClearStorage = () => async (dispatch) => {
  dispatch(logout()); 
  await clearUserFromStorage(); 
};

// Kullanıcı giriş yaptığında bu reducer'ı çağır ve veriyi sakla
export const loginAndSaveToStorage = (userData) => async (dispatch) => {
  await saveUserToStorage(userData); // Kullanıcı verisini depola
  dispatch(login(userData)); // Redux state'ine ekle
};

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

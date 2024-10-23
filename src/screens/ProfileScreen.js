import React from 'react';
import { View, Text, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice';

const ProfileScreen = ({ navigation }) => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigation.replace('Login');
  };

  return (
    <View>
          <Button title="Çıkış Yap" onPress={handleLogout} />
    </View>
  );
};

export default ProfileScreen;

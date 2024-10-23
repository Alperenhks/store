import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <View style={{ flexDirection: 'row' }}>
      {[...Array(5)].map((_, start) => {
        if (start < fullStars) {
          return <Ionicons key={start} name="star" size={17} color="gold" />;
        }
        return (
          <Ionicons
            key={start}
            name={
              start === fullStars && hasHalfStar
                ? "star-half"
                : "star-outline"
            }
            size={20}
            color="gold"
          />
        );
      })}
    </View>
  );
};

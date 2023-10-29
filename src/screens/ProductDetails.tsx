import React from "react";
import { View, Image, Text, ScrollView } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { styles as productsStyles } from "./Products";
import { NavigationStackParamList } from "../navigation";

type Props = NativeStackScreenProps<NavigationStackParamList, "ProductDetails">;

export const ProductDetails: React.FC<Props> = ({ route }) => {
  const { product } = route.params;
  return (
    <ScrollView>
      <Image
        source={{ uri: product.firstPreviewImage.watermarked }}
        style={productsStyles.image}
        resizeMode="contain"
      />
      <View style={productsStyles.descriptionContainer}>
        <Text style={productsStyles.title}>{product.title}</Text>
        <Text style={productsStyles.authorName}>
          {product.author.details.publicName}
        </Text>
        <Text style={productsStyles.price}>{product.price} €</Text>
      </View>
    </ScrollView>
  );
};

import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Products } from "./screens/Products";
import { ProductDetails } from "./screens/ProductDetails";

import { Product } from "./data/types/product";

export type NavigationStackParamList = {
  Products: undefined;
  ProductDetails: { product: Product };
};

const Stack = createNativeStackNavigator<NavigationStackParamList>();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Products" component={Products} />
        <Stack.Screen name="ProductDetails" component={ProductDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

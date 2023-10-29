import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  View,
  FlatList,
  ListRenderItemInfo,
  TextInput,
  StyleSheet,
  RefreshControl,
  SafeAreaView,
  Image,
  Text,
  Dimensions,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { Product } from "../data/types/product";
import { ProductsResponse, getProductsAPI } from "../data/getProductAPI";
import { NavigationStackParamList } from "../navigation";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

type Props = NativeStackScreenProps<NavigationStackParamList, "Products">;

export const Products: React.FC<Props> = ({ navigation }) => {
  const flatListRef = useRef<FlatList<Product>>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<ProductsResponse | undefined>(undefined);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  const fetchProducts = useCallback(
    async (searchText?: string) => {
      setIsLoading(true);
      const result = await getProductsAPI(searchText || searchQuery);
      setData(result);
      setIsLoading(false);
    },
    [searchQuery]
  );

  useEffect(() => {
    fetchProducts();
  }, []);

  const loadMore = useCallback(async () => {
    if (!data) return;

    setIsLoadingMore(true);
    const result = await getProductsAPI(searchQuery, page + 1);
    if (result) {
      setData({
        ...result,
        data: {
          ...result.data,
          items: {
            ...result.data.items,
            materials: [
              ...data?.data.items.materials,
              ...result.data.items.materials,
            ],
          },
        },
      });
    }
    setPage(page + 1);
    setIsLoadingMore(false);
  }, [searchQuery, page, data]);

  useEffect(() => {
    fetchProducts(searchQuery);
    flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
  }, [searchQuery]);

  const onNavigateToProductDetails = (product: Product) => {
    navigation.navigate("ProductDetails", { product });
  };

  const renderProductItem = ({ item }: ListRenderItemInfo<Product>) => (
    <Pressable onPress={() => onNavigateToProductDetails(item)}>
      <Image
        source={{ uri: item.firstPreviewImage.watermarked }}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.descriptionContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.authorName}>{item.author.details.publicName}</Text>
        <Text style={styles.price}>{item.price} €</Text>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        onEndEditing={(e) => setSearchQuery(e.nativeEvent.text)}
        placeholder="Enter a search text"
      />
      <FlatList
        ref={flatListRef}
        keyExtractor={(item) => `${item.id}`}
        data={data?.data.items.materials}
        renderItem={renderProductItem}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={fetchProducts} />
        }
        onEndReached={() => {
          loadMore();
        }}
        onEndReachedThreshold={0.01}
        ListFooterComponent={() =>
          isLoadingMore ? <ActivityIndicator size="large" /> : null
        }
      />
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    width: "90%",
    height: 50,
    margin: 16,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  image: {
    height: windowHeight / 2,
    width: windowWidth,
  },
  descriptionContainer: {
    padding: 16,
  },
  title: {
    fontSize: 16,
    paddingBottom: 16,
    fontWeight: "800",
  },
  authorName: {
    paddingBottom: 8,
  },
  price: {
    fontWeight: "800",
  },
});

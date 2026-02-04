import AppHeader from '@/components/AppHeader';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Platform,
  Image,
  TextInput,
  RefreshControl,
  Pressable,
} from 'react-native';

export default function ProductsScreen() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        'https://fake.jsonmockapi.com/products?length=20'
      );
      const data = response.data;
      setProducts(data);
    } catch (err) {
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchProducts();
    setRefreshing(false);
  };

  const renderItem = ({ item }: any) => {
    const title = item.productName ?? item.name ?? 'Untitled';
    const img = item.image ?? item.thumbnail;
    return (
      <Pressable style={styles.card} onPress={() => {}}>
        <Image
          source={{ uri: img }}
          style={styles.image}
          resizeMode="cover"
        />

        <View style={styles.cardContent}>
          <Text style={styles.name} numberOfLines={1}>{title}</Text>
          <Text style={styles.desc} numberOfLines={2}>{item.description}</Text>
          {item.manufacturer ? <Text style={styles.manufacturer} numberOfLines={1}>{item.manufacturer}</Text> : null}
        </View>

        <View style={styles.cardFooter}>
          <Text style={styles.price}>₹ {item.price}</Text>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.stock}>Stock: {typeof item.stock !== 'undefined' ? item.stock : '—'}</Text>
            <Text style={styles.sku}>SKU: {item.sku ?? item.id ?? '—'}</Text>
          </View>
        </View>
      </Pressable>
    );
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading products...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={{flex:1}}>
        <AppHeader title="Products" />
         <View style={styles.container}>
            <TextInput
              placeholder="Search products..."
              value={query}
              onChangeText={setQuery}
              style={styles.search}
            />

            <FlatList
                data={products.filter(p => p.productName?.toLowerCase().includes(query.toLowerCase()) || p.description?.toLowerCase().includes(query.toLowerCase()))}
                keyExtractor={(_,index) => index.toString()}
                renderItem={renderItem}
                contentContainerStyle={{ paddingBottom: 20 }}
                numColumns={Platform.OS === 'web' ? 3 : 2}
                columnWrapperStyle={Platform.OS === 'web' ? { justifyContent: 'space-between' } : {}}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            />
        </View>
    </View>
   
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8fafc',
    width: Platform.OS === 'web' ? '60%' : '100%',
    alignSelf: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    flex: 1,
    marginHorizontal: 6,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 3,
  },
  image: { width: '100%', height: 140, borderRadius: 8, backgroundColor: '#e2e8f0' },
  cardContent: { paddingVertical: 8 },
  cardFooter: { marginTop: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  search: { backgroundColor: '#fff', padding: 10, borderRadius: 10, marginBottom: 12, borderWidth: 1, borderColor: '#e6edf3' },
  manufacturer: { color: '#475569', fontSize: 12, marginTop: 6 },
  stock: { color: '#475569', fontSize: 12 },
  sku: { color: '#94a3b8', fontSize: 12 },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  price: {
    fontSize: 14,
    fontWeight: '500',
    marginVertical: 4,
    color: '#16a34a',
  },
  desc: {
    fontSize: 13,
    color: '#475569',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

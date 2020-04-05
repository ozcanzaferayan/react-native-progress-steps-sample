/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';

const ShoppingCart = () => {
  const [data, setData] = useState([
    {
      uri: 'https://cdn.ikea.com.tr/urunler/190_190/PE770241.jpg',
      title: 'MILLBERGET',
      description: 'dönen sandalye, beyaz',
      price: 269,
      count: 1,
    },
    {
      uri: 'https://cdn.ikea.com.tr/urunler/190_190/PE606741.jpg',
      title: 'LANGFJALL',
      description: 'kolçaklı dönen sandalye, gunnared mavi-siyah',
      price: 1029,
      count: 1,
    },
    {
      uri: 'https://cdn.ikea.com.tr/urunler/190_190/PE343599.jpg',
      title: 'LINNMON/ADILS',
      description: 'çalışma masası, venge-siyah',
      price: 1029,
      count: 1,
    },
    {
      uri: 'https://cdn.ikea.com.tr/urunler/190_190/PE673072.jpg',
      title: 'NYMANE',
      description: 'masa/duvar lambası, beyaz',
      price: 1029,
      count: 1,
    },
  ]);

  const plusItem = (item: any) => {
    setData(
      data.map((x) =>
        x.title === item.title ? {...x, count: item.count + 1} : x,
      ),
    );
  };

  const minusItem = (item: any) => {
    if (item.count === 1) {
      return;
    }
    setData(
      data.map((x) =>
        x.title === item.title ? {...x, count: item.count - 1} : x,
      ),
    );
  };

  const showRemoveItemDialog = (item) => {
    Alert.alert(
      'Uyarı',
      'Ürünü sepetinizden çıkarmak istediğinize emin misiniz?',
      [
        {
          text: 'Hayır',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Evet', onPress: () => removeItem(item), style: 'destructive'},
      ],
      {cancelable: true},
    );
  };

  const removeItem = (item) => {
    setData(data.filter((x) => x.title !== item.title));
  };

  return (
    <FlatList
      style={styles.list}
      data={data}
      keyExtractor={(item) => item.title}
      ItemSeparatorComponent={() => <View style={styles.seperator} />}
      renderItem={({item}) => (
        <View style={{flexDirection: 'row'}}>
          <Image
            source={{
              uri: item.uri,
            }}
            style={styles.image}
          />
          <View style={styles.itemTitleContainer}>
            <View>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
            <View style={styles.itemBottomContainer}>
              <Text style={styles.price}>
                {(item.price * item.count).toLocaleString('tr')}₺
              </Text>
              <View style={styles.countContainer}>
                <TouchableOpacity
                  style={styles.binButton}
                  onPress={() => showRemoveItemDialog(item)}>
                  <Image
                    source={require('../img/bin.png')}
                    style={styles.bin}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.countButton}
                  onPress={() => minusItem(item)}>
                  <Text>-</Text>
                </TouchableOpacity>
                <Text style={styles.countText}>{item.count}</Text>
                <TouchableOpacity
                  style={styles.countButton}
                  onPress={() => plusItem(item)}>
                  <Text>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  list: {flex: 1},
  image: {
    width: 100,
    height: 100,
  },
  itemTitleContainer: {
    justifyContent: 'space-between',
    marginStart: 8,
    flex: 1,
  },
  bin: {
    width: 24,
    height: 24,
  },
  binButton: {
    marginEnd: 8,
  },
  itemBottomContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  title: {
    fontWeight: 'bold',
  },
  description: {
    color: '#666',
    maxWidth: 200,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  countContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countButton: {
    padding: 10,
    backgroundColor: '#e5e5e5',
    borderRadius: 3,
  },
  countText: {
    marginHorizontal: 8,
  },
  seperator: {
    marginVertical: 12,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#ddd',
  },
});

export default ShoppingCart;

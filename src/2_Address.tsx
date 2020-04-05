/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';

const Address = () => {
  const [data] = useState([
    {
      addressType: 'sending',
      name: 'Zafer AYAN',
      address: 'Mustafa Kemal Mh. Çiğdem Sk. No:3/45 34077, Esenler - İstanbul',
      phoneNumber: '5327652345',
    },
    {
      addressType: 'invoice',
      name: 'Zafer AYAN',
      address: 'Mustafa Kemal Mh. Çiğdem Sk. No:3/45 34077, Esenler - İstanbul',
      phoneNumber: '5327652345',
      invoice: 'individual',
      tc: '11922384122',
    },
  ]);
  return (
    <View style={styles.container}>
      {data.map((item) => (
        <View style={styles.card} key={item.addressType}>
          <View style={styles.header}>
            <Text style={styles.title}>
              {item.addressType === 'sending' ? 'Gönderim' : 'Fatura'} Adresi
            </Text>
            <TouchableOpacity>
              <Image
                source={require('../img/edit.png')}
                style={styles.editImage}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.seperator} />
          <View style={styles.cardImageAndContent}>
            <Image
              source={
                item.addressType === 'sending'
                  ? require('../img/delivery.png')
                  : require('../img/bill.png')
              }
              style={styles.image}
            />
            <View style={styles.addressColumn}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.phoneNumber}>{item.phoneNumber}</Text>
              <Text style={styles.address}>{item.address}</Text>
              {item.addressType === 'invoice' && (
                <View>
                  <Text style={styles.invoice}>
                    Fatura:{' '}
                    {item.invoice === 'individual' ? 'Bireysel' : 'Kurumsal'}
                  </Text>
                  <Text style={styles.tc}>
                    {item.invoice === 'individual' ? 'TC Kimlik No' : 'VKN No'}:{' '}
                    {item.tc}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
  },
  card: {
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editImage: {
    width: 22,
    height: 22,
  },
  cardImageAndContent: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  image: {
    width: 64,
    height: 64,
  },
  addressColumn: {
    flex: 1,
    marginStart: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  seperator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#ddd',
    marginTop: 3,
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    color: '#666',
    marginBottom: 3,
  },
  address: {
    fontSize: 18,
    marginBottom: 3,
  },
  phoneNumber: {
    fontSize: 18,
    color: '#666',
    marginBottom: 3,
  },
  invoice: {
    fontSize: 18,
    color: '#666',
    marginBottom: 3,
  },
  tc: {
    fontSize: 18,
    color: '#666',
    marginBottom: 3,
  },
});

export default Address;

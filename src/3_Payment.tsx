/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Keyboard,
} from 'react-native';

interface Props {
  handleSuccessScreen: () => void;
}

const Payment = (props: Props) => {
  const [card, setCard] = useState({
    name: 'Özcan Zafer AYAN',
    number: '',
    expire: '',
    cvv: '',
  });

  const [bill] = useState({
    delivery: 109,
    cargo: 0,
    discount: 0,
    expirationDifference: 0,
    totalAmount: 109,
  });

  const [isLoading, setIsLoading] = useState(false);

  const refName = useRef<TextInput>(null);
  const refNumber = useRef<TextInput>(null);
  const refExpire = useRef<TextInput>(null);
  const refCvv = useRef<TextInput>(null);
  const refButton = useRef<TouchableOpacity>(null);

  var priceFormatter = new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
  });

  const formatCardNumber = (value: string) => {
    const regex = /^(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})$/g;
    const onlyNumbers = value.replace(/[^\d]/g, '');

    return onlyNumbers.replace(regex, (regex, $1, $2, $3, $4) =>
      [$1, $2, $3, $4].filter((group) => !!group).join(' '),
    );
  };

  const formatExpire = (value: string) => {
    const regex = /^(\d{0,2})(\d{0,2})$/g;
    const onlyNumbers = value.replace(/[^\d]/g, '');

    return onlyNumbers.replace(regex, (regex, $1, $2) =>
      [$1, $2].filter((group) => !!group).join('/'),
    );
  };

  const handleNumberChange = (text: string) => {
    setCard({...card, number: text});
    if (text.length === 19) {
      refExpire.current!.focus();
    } else if (text.length === 0) {
      refName.current!.focus();
    }
  };
  const handleExpireChange = (text: string) => {
    setCard({...card, expire: text});
    if (text.length === 5) {
      refCvv.current!.focus();
    } else if (text.length === 0) {
      refNumber.current!.focus();
    }
  };
  const handleCvvChange = (text: string) => {
    setCard({...card, cvv: text});
    if (text.length === 3) {
      console.log('dismissed');
      Keyboard.dismiss();
    } else if (text.length === 0) {
      refExpire.current!.focus();
    }
  };
  const makePayment = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      props.handleSuccessScreen();
    }, 2000);
  };
  return (
    <View style={styles.container}>
      <View style={styles.line}>
        <Image source={require('../img/user.png')} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Kart üzerindeki isim"
          keyboardType="name-phone-pad"
          value={card.name}
          ref={refName}
        />
      </View>
      <View style={styles.line}>
        <Image source={require('../img/nfc.png')} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Kart numarası"
          keyboardType="decimal-pad"
          value={formatCardNumber(card.number)}
          onChangeText={handleNumberChange}
          maxLength={19}
          ref={refNumber}
        />
      </View>
      <View style={styles.line}>
        <Image source={require('../img/calendar.png')} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="MM/YY"
          keyboardType="decimal-pad"
          value={formatExpire(card.expire)}
          onChangeText={handleExpireChange}
          ref={refExpire}
        />
        <Image
          source={require('../img/password.png')}
          style={{...styles.icon, marginStart: 12, width: 46}}
        />
        <TextInput
          style={styles.input}
          placeholder="CVV"
          keyboardType="decimal-pad"
          maxLength={3}
          value={card.cvv}
          onChangeText={handleCvvChange}
          ref={refCvv}
          onSubmit={() => Keyboard.dismiss()}
        />
      </View>

      <View style={styles.seperator} />
      <View
        style={{...styles.line, justifyContent: 'flex-end', marginBottom: 0}}>
        <View style={{alignItems: 'flex-end'}}>
          <Text style={styles.bill}>Sipariş Tutarı:</Text>
          <Text style={styles.bill}>Kargo Tutarı:</Text>
          <Text style={styles.bill}>İndirim Tutarı:</Text>
          <Text style={styles.bill}>Vade Farkı:</Text>
        </View>
        <View style={{marginStart: 18, alignItems: 'flex-end'}}>
          <Text style={styles.bill}>
            {priceFormatter.format(bill.delivery)}
          </Text>
          <Text style={styles.bill}>{priceFormatter.format(bill.cargo)}</Text>
          <Text style={styles.bill}>
            {priceFormatter.format(bill.discount)}
          </Text>
          <Text style={styles.bill}>
            {priceFormatter.format(bill.expirationDifference)}
          </Text>
        </View>
      </View>
      <View style={styles.seperator} />
      <View style={{...styles.line, justifyContent: 'flex-end'}}>
        <View style={{alignItems: 'flex-end'}}>
          <Text style={styles.totalAmount}>Toplam:</Text>
        </View>
        <View style={{marginStart: 18, alignItems: 'flex-end'}}>
          <Text style={styles.totalAmount}>
            {priceFormatter.format(bill.totalAmount)}
          </Text>
        </View>
      </View>
      <View style={styles.line}>
        <TouchableOpacity
          style={styles.makePaymentButton}
          onPress={makePayment}
          disabled={isLoading}
          ref={refButton}>
          <ActivityIndicator
            style={{
              ...styles.makePaymentLoading,
              display: isLoading ? 'flex' : 'none',
            }}
          />
          <Text style={styles.makePaymentText}>
            Ödeme {isLoading ? 'Yapılıyor' : 'Yap'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    flex: 1,
  },
  line: {
    flexDirection: 'row',
    flex: 1,
    marginBottom: 24,
  },
  icon: {
    width: 32,
    height: 32,
    marginEnd: 12,
  },
  input: {
    borderColor: '#000',
    borderBottomWidth: 2,
    fontSize: 18,
    flex: 1,
  },
  mmYyCvv: {
    flexDirection: 'row',
  },
  bill: {
    fontSize: 18,
    marginBottom: 3,
  },
  totalAmount: {
    fontSize: 24,
  },
  makePaymentButton: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    padding: 18,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  makePaymentText: {
    color: '#e5e5e5',
    textTransform: 'uppercase',
  },
  makePaymentLoading: {
    marginEnd: 12,
  },
  seperator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#ddd',
    marginTop: 3,
    marginBottom: 8,
    width: '60%',
    alignSelf: 'flex-end',
  },
});

export default Payment;

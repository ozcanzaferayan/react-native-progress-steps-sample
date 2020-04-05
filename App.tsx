/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  View,
  Text,
  YellowBox,
  Image,
} from 'react-native';
import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';
import ShoppingCart from './src/1_ShoppingCart';
import Address from './src/2_Address';
import Payment from './src/3_Payment';

ShoppingCart;

const App = () => {
  YellowBox.ignoreWarnings(['VirtualizedLists should never be nested']);

  const [isFinished, setIsFinished] = useState(false);

  const progressStep = {
    nextBtnText: 'Sonraki  >',
    previousBtnText: '<  Önceki',
    nextBtnStyle: styles.button,
    nextBtnTextStyle: styles.buttonText,
    previousBtnStyle: styles.button,
    previousBtnTextStyle: styles.buttonText,
  };
  const lastProgressStep = {
    ...progressStep,
    nextBtnStyle: {
      display: 'none',
    },
  };
  const firstProgressStep = {
    ...progressStep,
    previousBtnStyle: {
      display: 'none',
    },
  };
  const themeColor = '#1e1e1e';
  const progressSteps = {
    borderWidth: 3,
    activeStepIconBorderColor: themeColor,
    completedProgressBarColor: themeColor,
    activeStepIconColor: themeColor,
    activeLabelColor: themeColor,
    completedStepNumColor: themeColor,
    completedStepIconColor: themeColor,
    activeStepNumColor: '#e5e5e5',
  };

  const handleSuccessScreen = () => {
    setIsFinished(true);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.container}>
          {!isFinished && (
            <ProgressSteps {...progressSteps}>
              <ProgressStep label="Sepetim" {...firstProgressStep}>
                <Text style={styles.textHeader}>Alışveriş Sepetiniz</Text>
                <ShoppingCart />
              </ProgressStep>
              <ProgressStep label="Adres" {...progressStep}>
                <Text style={styles.textHeader}>Adres bilgileri</Text>
                <Address />
              </ProgressStep>
              <ProgressStep label="Ödeme" {...lastProgressStep}>
                <Text style={styles.textHeader}>Ödeme bilgileri</Text>
                <Payment handleSuccessScreen={handleSuccessScreen} />
              </ProgressStep>
            </ProgressSteps>
          )}
          {isFinished && (
            <View style={styles.success}>
              <Text style={styles.successText}>
                Ödeme başarıyla gerçekleşti
              </Text>
              <Image style={styles.successImg} source={require('./img/tick.png')} />
            </View>
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 10,
  },
  textHeader: {
    fontSize: 36,
    marginBottom: 24,
    marginStart: 12,
    marginTop: 0,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#1e1e1e',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  buttonText: {
    color: '#e5e5e5',
    fontSize: 16,
  },
  successText: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  success: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successImg: {
    width: 72,
    height: 72,
    marginTop: 24,
  },
});

export default App;

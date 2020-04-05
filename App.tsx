/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  StatusBar,
  View,
  Text,
} from 'react-native';

import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';
import ShoppingChart from './1_ShoppingChart';
ShoppingChart;

const App = () => {
  const [currentPosition, setCurrentPosition] = useState(0);

  const progressStep = {
    nextBtnText: 'Sonraki',
    previousBtnText: 'Önceki',
  };
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1, padding: 10}}>
          <ProgressSteps>
            <ProgressStep label="Sepetim" {...progressStep}>
              <ShoppingChart />
            </ProgressStep>
            <ProgressStep label="Adres" {...progressStep}>
              <View style={{alignItems: 'center'}}>
                <Text>This is the content within step 2!</Text>
              </View>
            </ProgressStep>
            <ProgressStep label="Sipariş" {...progressStep}>
              <View style={{alignItems: 'center'}}>
                <Text>This is the content within step 3!</Text>
              </View>
            </ProgressStep>
            <ProgressStep label="Ödeme" {...progressStep}>
              <View style={{alignItems: 'center'}}>
                <Text>This is the content within step 3!</Text>
              </View>
            </ProgressStep>
            <ProgressStep label="Gönderim" {...progressStep}>
              <View style={{alignItems: 'center'}}>
                <Text>This is the content within step 3!</Text>
              </View>
            </ProgressStep>
          </ProgressSteps>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {},
});

export default App;

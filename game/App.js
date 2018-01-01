import React from 'react';
import { StyleSheet, View, Platform, StatusBar } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import store from './store';

import HomeScreen from './screens/HomeScreen';
import QuizScreen from './screens/QuizScreen';
import ReviewScreen from './screens/ReviewScreen';

export default class App extends React.Component {
  render() {
    const MainNavigator = StackNavigator({
      home: { screen: HomeScreen },
      quiz: { screen: QuizScreen },
      review: { screen: ReviewScreen }
    },
      {
        navigationOptions: {
          headerLeft: null,
          style: {
            marginTop: Platform.OS === 'android' ? 24 : 0,
          },
          headerStyle: {
            backgroundColor: 'peru',
          },
          headerTintColor: 'white',
        }
      }
    );


    return (
      <Provider store={store}>
        <View style={styles.container}>
        <StatusBar barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

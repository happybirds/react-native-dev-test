import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default class Content extends Component {
  static navigationOptions = ({navigation}) => ({
    title: `${navigation.getParam('title')}`,
    headerTitleStyle: {textAlign: 'center', alignSelf: 'center'},
    headerStyle: {
        backgroundColor: 'white',
    },
});

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.body}>
            {this.props.navigation.getParam('body')}
          </Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  body: {
    padding: 10,
    margin: 5,
    fontSize: 15,
    fontStyle: 'normal',
  },
});

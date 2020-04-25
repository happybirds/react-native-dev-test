import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Markdown from 'react-native-markdown-display';
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
            <Markdown>{this.props.navigation.getParam('body')}</Markdown>
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
    padding: 10,
  },
  body: {
    padding: 10,
    margin: 5,
    fontSize: 15,
    fontStyle: 'normal',
  },
});

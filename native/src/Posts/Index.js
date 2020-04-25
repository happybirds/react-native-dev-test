import * as React from 'react';
import Api from '../Api';
import Loader from '../Loader';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import SafeAreaView from 'react-native-safe-area-view';

export default class Posts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      data: [],
      loading: false,
      refreshing: false,
      search: '',
    };

    this.getPosts();
  }

  componentDidMount() {
    this.setState({
      loading: true,
    });
  }

  updateSearch = (search) => {
    this.setState({ search });
    const newData = this.state.data.filter((item) => {
      const itemData = `${item.author.name.toUpperCase()}`;
      const textData = search.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    this.setState({ posts: newData });
  };

  _renderItem = ({ item }) => {
    return (
      <ListItem
        onPress={() =>
          this.props.navigation.navigate('Content', {
            body: item.body,
            title: item.title,
          })
        }
        title={<Text style={styles.title}>{item.title}</Text>}
        subtitle={
          <View style={{ flexDirection: 'column' }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.subtitle}> Summary: </Text>
              <Text numberOfLines={2} style={styles.listValue}>
                {item.body
                  ? item.body.length > 30
                    ? item.body.substr(0, 30) + '...'
                    : item.body
                  : ' '}
              </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.subtitle}> Author: </Text>
              <Text style={styles.listValue}>{item.author.name}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.subtitle}> Publish Date: </Text>
              <Text style={styles.listValue}>{item.publishedAt}</Text>
            </View>
          </View>
        }
      />
    );
  };

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: '#CED0CE',
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Type Author"
        lightTheme
        onChangeText={this.updateSearch}
        value={this.state.search}
      />
    );
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          backgroundColor: '#CED0CE',
        }}
      />
    );
  };

  getPosts = () => {
    Api.instance
      .get('posts')
      .then((resp) => {
          //TODO, need return state code
          resp.data.sort(function (first, next) {
            return first.publishedAt < next.publishedAt ? 1 : -1;
          });
          this.setState({
            posts: resp.data,
            loading: false,
            refreshing: false,
            data: resp.data,
          });
      })
      .catch((error) => {
        // TODO network error 
        console.log(error);
        this.setState({loading: false})
      });
  };

  handleRefresh = () => {
    this.setState(
      {
        refreshing: true,
      },
      () => {
        this.getPosts();
      }
    );
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Loader loading={this.state.loading} />
          <View style={this.isloading ? { visible: false } : { visible: true }}>
            <FlatList
              data={this.state.posts}
              showsVerticalScrollIndicator={true}
              renderItem={this._renderItem}
              keyExtractor={(item, index) => index.toString()}
              ListFooterComponent={this.renderFooter}
              ItemSeparatorComponent={this.renderSeparator}
              ListHeaderComponent={this.renderHeader}
              onRefresh={this.handleRefresh}
              refreshing={this.state.refreshing}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
  },

  title: {
    fontSize: 16,
    color: '#0984e3',
    marginLeft: 4,
    paddingBottom: 1,
  },

  subtitle: {
    marginLeft: 4,
    paddingBottom: 2,
    fontSize: 11,
    fontStyle: 'normal',
    fontWeight: 'bold',
    width: 85,
  },
  listValue: {
    paddingBottom: 1,
    fontSize: 11,
    fontStyle: 'normal',
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

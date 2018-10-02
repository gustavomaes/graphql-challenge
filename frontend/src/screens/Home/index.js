import React, { Component } from "react"
import { Text, View, FlatList, TextInput, TouchableOpacity } from "react-native"

import styles from "./style"
import header from "../../styles/header"
import FloatButton from "../../components/FloatButton"
import CustomBar from "../../components/CustomBar"

//Redux
import { connect } from "react-redux"
import ActionCreators from "../../redux/actionCreators"

class Home extends Component {
  static navigationOptions = {
    title: "Books",
    headerStyle: header.headerStyle,
    headerTintColor: header.headerTintColor,
    headerTitleStyle: header.headerTitleStyle
  }

  state = {
    data: [],
    searchData: [],
    size: 15,
    page: 0,
    term: ""
  }

  componentDidMount() {
    this.props.allBooks(this.state.size, this.state.page)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.books.data) {
      this.setState({
        data: nextProps.books.data,
        searchData: nextProps.books.data
      })
    }
  }

  loadMore = () => {
    this.setState({ page: this.state.page + 1 })
    this.props.allBooks(this.state.size, this.state.page)
  }

  searchFilter = text => {
    const newData = this.state.data.filter(function(item) {
      const itemData = item.name.toUpperCase()
      const textData = text.toUpperCase()
      return itemData.indexOf(textData) > -1
    })

    this.setState({ searchData: newData, term: text })
  }

  render() {
    const { navigate } = this.props.navigation
    const { books } = this.props
    return (
      <View style={styles.container}>
        <CustomBar />
        <TextInput
          style={styles.search}
          onChangeText={text => this.searchFilter(text)}
          value={this.state.term}
          placeholder="Search Here"
        />

        {!books.isLoading && (
          <FlatList
            data={this.state.searchData}
            refreshing={false}
            onRefresh={false}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                kye={index}
                onPress={() => navigate("BookDetail", { id: item.id })}
              >
                <Text style={styles.item}>{item.name}</Text>
              </TouchableOpacity>
            )}
            ListFooterComponent={() => {
              return (
                <TouchableOpacity onPress={() => this.loadMore()}>
                  <Text style={styles.load}>Load more</Text>
                </TouchableOpacity>
              )
            }}
          />
        )}

        <FloatButton navigate={navigate} />
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    books: state.books
  }
}

const mapDispatchToProps = dispatch => {
  return {
    allBooks: (size, page) =>
      dispatch(ActionCreators.allBooksRequest(size, page))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

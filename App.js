import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableHighlight,
} from "react-native";
import Constants from "expo-constants";

import Search from "./components/Search";
import Filter from "./components/Filter";
import Stock from "./components/Stock";
import { getStocks, getSortedStocks, getFilteredStocks } from "./utils/api";

import { _FILTERS_ } from "./utils/constants";

export default class App extends Component {
  state = {
    stocks: [],
    filter: undefined,
    searchTerm: "",
  };

  componentDidMount() {
    const { filter: sortCriteria, searchTerm } = this.state;
    this.setState({
      stocks: getStocks({ sortCriteria, searchTerm }),
    });
  }

  handleApplyFilter = (filter) => {
    if (this.state.filter === filter) {
      // Handle canceling the filter
      this.setState({
        filter: "undefined",
        stocks: getStocks({
          sortCriteria: undefined,
          searchTerm: this.state.searchTerm,
        }),
      });
    } else {
      // Handle changing the filter
      this.setState({
        filter,
        stocks: getSortedStocks({
          sortCriteria: filter,
          searchTerm: this.state.searchTerm,
        }),
      });
    }
  };

  handleSearch = (term) => {
    this.setState({
      searchTerm: term,
      stocks: getFilteredStocks({
        searchTerm: term,
        sortCriteria: this.state.filter,
      }),
    });
  };

  showFilters = () => {
    const filters = [];
    for (let filter in _FILTERS_) {
      filters.push(
        <Filter
          key={filter}
          type={filter}
          name={_FILTERS_[filter]}
          activeFilter={this.state.filter}
          handleApplyFilter={this.handleApplyFilter}
        />
      );
    }

    return <View style={styles.filterContainer}>{filters}</View>;
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Available Players</Text>
          {this.showFilters()}
          <Search handleSearch={this.handleSearch} />
        </View>
        <View style={styles.bodyContainer}>
          <FlatList
            extraData={this.state}
            data={this.state.stocks}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              const { image_url, name } = item.stock;
              const {
                fantasy_points_projected: projectedFantasyPoints,
                fantasy_points_scored: actualFantasyPoints,
                last_price: lastTradePrice,
              } = item;

              return (
                <Stock
                  key={item.id}
                  name={name}
                  image_url={image_url}
                  projectedFantasyPoints={projectedFantasyPoints}
                  actualFantasyPoints={actualFantasyPoints}
                  lastTradePrice={lastTradePrice}
                  activeFilter={this.state.filter}
                />
              );
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  titleContainer: {
    paddingTop: Constants.statusBarHeight,
    width: "100%",
    backgroundColor: "black",
    borderBottomColor: "#e6e6e6",
    borderWidth: 1,
    position: "absolute",
    height: 120,
    zIndex: 20,
    justifyContent: "space-evenly",
  },
  bodyContainer: {
    marginTop: 125,
    width: "100%",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});

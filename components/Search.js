import React, { Component } from "react";
import { TextInput, StyleSheet } from "react-native";

export default class Search extends Component {
  state = {
    text: "",
  };

  handleOnChangeText = (text) => {
    this.setState({ text });
    this.props.handleSearch(text);
  };

  render() {
    return (
      <TextInput
        style={styles.input}
        placeholder={"Search by name"}
        value={this.state.text}
        onChangeText={this.handleOnChangeText}
        placeholderTextColor="gray"
      ></TextInput>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 25,
    textAlign: "center",
    color: "white",
    borderBottomColor: "gray",
    borderWidth: 1,
  },
});
